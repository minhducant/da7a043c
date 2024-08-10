import React, {useCallback, useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import normalize from 'react-native-normalize';
import FastImage from 'react-native-fast-image';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import {HomeApi} from '@api/HomeApi';
import {IconClose} from '@assets/icons';
import {IconLibrary} from '@components/Base';
import {InputCheckbox} from '../Base/InputCheckbox';
import {homeStyle as styles} from '@styles/home.style';
import SearchMember from '@components/Home/SearchMember';

export function RenderMember(
  memberSheetRef: React.MutableRefObject<any>,
  userInfo: any,
  formRef: any,
) {
  const {t} = useTranslation();
  const searchRef = useRef<any>(null);
  const [selected, setSelected] = useState<any>(
    Object.keys(userInfo).length !== 0
      ? [
          {
            _id: userInfo._id,
            name: userInfo.name,
            image_url: userInfo?.image_url,
            user_id: userInfo.user_id,
            permission: 0,
          },
        ]
      : [],
  );
  const [searchResults, setSearchResults] = useState<any>([]);

  const onDone = useCallback((selected: any) => {
    formRef.current.members.setData(selected);
    searchRef.current.clearValue();
    setSearchResults([]);
    const isActive = memberSheetRef?.current?.isActive();
    if (isActive) {
      memberSheetRef?.current?.scrollTo(0);
    } else {
      memberSheetRef?.current?.scrollTo(-200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    const members = formRef.current.members.members;
    searchRef.current.clearValue();
    setSelected(members);
    setSearchResults([]);
    formRef.current.members.setData(members);
    const isActive = memberSheetRef?.current?.isActive();
    if (isActive) {
      memberSheetRef?.current?.scrollTo(0);
    } else {
      memberSheetRef?.current?.scrollTo(-200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createMongoId = () => {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const randomPart = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
      ((Math.random() * 16) | 0).toString(16),
    );
    return timestamp + randomPart;
  };

  const onAddNew = (value: string) => {
    if (value && searchResults.length < 1) {
      setSelected([
        ...selected,
        {
          _id: createMongoId(),
          name: value,
          image_url: '',
          user_id: '',
          permission: 0,
        },
      ]);
    }
  };

  const handleCheckboxPress = useCallback(
    (item: {selected: any; _id: any}) => {
      setSelected((prevSelected: any[]) =>
        item.selected
          ? prevSelected.filter(
              (selectedItem: {_id: any}) => selectedItem._id !== item._id,
            )
          : [...prevSelected, {...item, selected: true}],
      );
      setSearchResults((prevResults: any[]) =>
        prevResults.map((resultItem: {_id: any}) =>
          resultItem._id === item._id
            ? {...resultItem, selected: !item.selected}
            : resultItem,
        ),
      );
    },
    [setSelected, setSearchResults],
  );

  const removeItemByIndex = useCallback(
    (indexToRemove: number) => {
      setSelected((prevSelected: any) => {
        const newSelected = [...prevSelected];
        const removedItem = newSelected.splice(indexToRemove, 1)[0];
        if (removedItem) {
          setSearchResults((prevResults: any[]) =>
            prevResults.map((resultItem: {_id: any}) =>
              resultItem._id === removedItem._id
                ? {...resultItem, selected: false}
                : resultItem,
            ),
          );
        }
        return newSelected;
      });
    },
    [setSelected, setSearchResults],
  );

  const onCancel = useCallback(() => {
    setSearchResults([]);
  }, []);

  const onSearch = useCallback(
    async (value: any) => {
      if (!value) {
        setSearchResults([]);
        return;
      }
      const res: any = await HomeApi.getUsers({name: value});
      if (res.code !== 200) {
        setSearchResults([]);
        return;
      }
      const result = res?.data?.result || [];
      const selectedIds = new Set(selected.map((item: {_id: any}) => item._id));
      const updatedResults = result.map((item: {_id: unknown}) => ({
        ...item,
        selected: selectedIds.has(item._id),
      }));
      setSearchResults(updatedResults);
    },
    [selected],
  );

  const renderMembers = useCallback(
    ({item, index}: any) => (
      <View key={index} style={styles.viewMembers}>
        {item.image_url ? (
          <FastImage
            style={styles.avatarFrame}
            source={{
              uri: item.image_url,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <View style={styles.avatarFrame}>
            <Text style={styles.txtAvatar}>{item.name.charAt(0)}</Text>
          </View>
        )}
        <Text style={styles.txtNameMember} numberOfLines={2}>
          {item.name}
        </Text>
        {userInfo._id !== item._id && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => removeItemByIndex(index)} 
            style={styles.deleteMember}>
            <IconLibrary size={12} library="AntDesign" name="close" />
          </TouchableOpacity>
        )}
      </View>
    ),
    [removeItemByIndex, userInfo._id],
  );

  const renderUsers = useCallback(
    ({item, index}: any) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.6}
        style={styles.itemResultUser}
        onPress={() => handleCheckboxPress(item)}>
        <FastImage
          style={styles.imageResultUser}
          source={{
            uri: item.image_url,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.txtResultUser}>{item.name}</Text>
        <InputCheckbox
          width={22}
          height={22}
          checked={item.selected}
          checkMarkColor={'white'}
          checkedBorderColor={'#FFAB91'}
          unCheckedBorderColor={'#D9D9D9'}
          checkedBackgroundColor={'#FFAB91'}
          unCheckedBackgroundColor={'white'}
        />
      </TouchableOpacity>
    ),
    [handleCheckboxPress],
  );

  return (
    <View style={{aspectRatio: 1}}>
      <View style={styles.headerInputMember}>
        <TouchableOpacity onPress={onClose}>
          <IconClose fill="#000000" />
        </TouchableOpacity>
        <Text style={styles.txtTitleSheet}>{t('who_sharing_the_bill')}</Text>
        <TouchableOpacity onPress={() => onDone(selected)}>
          <Text style={styles.txtDone}>{t('done')}</Text>
        </TouchableOpacity>
      </View>
      <SearchMember
        ref={searchRef}
        onAddNew={onAddNew}
        onChange={onSearch}
        onCancel={onCancel}
      />
      <View>
        {selected.length > 0 && (
          <View style={{marginHorizontal: normalize(16)}}>
            <Text style={styles.txtTitleMember}>
              {t('selected')}:{' '}
              <Text style={{color: 'red'}}>{selected.length}</Text>
            </Text>
            <FlatList
              horizontal
              data={selected}
              stickyHeaderIndices={[0]}
              renderItem={renderMembers}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => `${index}`}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        )}
        <FlatList
          data={searchResults}
          renderItem={renderUsers}
          stickyHeaderIndices={[0]}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </View>
  );
}
