/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import normalize from 'react-native-normalize';
import FastImage from 'react-native-fast-image';
import CountryFlag from 'react-native-country-flag';
import {View, Text, FlatList, Animated, TouchableOpacity} from 'react-native';

import {IconLibrary} from '@components/Base';
import {navigate} from '@navigation/RootNavigation';
import {homeStyle as styles} from '@styles/home.style';
import SearchMember from '@components/Home/SearchMember';
import {currencies, Currency, colors} from '@configs/AppData';

interface NavigationProps {
  navigate: (route: string, params: {screen: string; params: any}) => void;
}

interface WalletCardProps {
  y: Animated.Value;
  index: number;
  item: any;
}

const WalletCard = ({item, y, index}: WalletCardProps) => {
  const {t} = useTranslation();

  const onPress = (note: any) => {
    navigate('NoteScreen');
  };

  return (
    <Animated.View style={[styles.itemNote]} key={index}>
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPress={() => onPress(item)}
        style={[styles.itemNote, {backgroundColor: item.color}]}>
        <></>
      </TouchableOpacity>
    </Animated.View>
  );
};

function RenderCurrency(
  currencySheetRef: React.MutableRefObject<any>,
  onSelectCurrency: (selectedCurrency: number) => Promise<void>,
) {
  const {t} = useTranslation();

  const onPress = useCallback((item: Currency) => {
    onSelectCurrency(item.id);
    const isActive = currencySheetRef?.current?.isActive();
    if (isActive) {
      currencySheetRef?.current?.scrollTo(0);
    } else {
      currencySheetRef?.current?.scrollTo(-200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text style={styles.txtTitleSheet}>{t('currency')}</Text>
      {currencies.map((item: Currency, index: number) => (
        <TouchableOpacity
          key={index}
          style={[styles.itemCurrency]}
          onPress={() => onPress(item)}>
          <CountryFlag isoCode={item.country} size={20} style={styles.flag} />
          <View style={styles.flex1}>
            <Text style={styles.txtCurrency}>{item.name}</Text>
          </View>
          <Text style={styles.txtSymbol}>{item.symbol}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function RenderColor(
  colorSheetRef: React.MutableRefObject<any>,
  onSelectColor: (selectedCurrency: string) => Promise<void>,
) {
  const {t} = useTranslation();

  const onPress = useCallback((item: string) => {
    onSelectColor(item);
    const isActive = colorSheetRef?.current?.isActive();
    if (isActive) {
      colorSheetRef?.current?.scrollTo(0);
    } else {
      colorSheetRef?.current?.scrollTo(-200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderColor: React.FC<{item: string; index: number}> = ({
    item,
    index,
  }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPress(item)}
        style={[styles.itemColor, {backgroundColor: item}]}>
        <></>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={styles.txtTitleSheet}>{t('color')}</Text>
      <FlatList
        data={colors}
        numColumns={5}
        scrollEnabled={false}
        renderItem={renderColor}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `${index}`}
        contentContainerStyle={styles.listColor}
      />
    </View>
  );
}

function RenderMember(
  memberSheetRef: React.MutableRefObject<any>,
  onSelectMember: (selectedCurrency: number) => Promise<void>,
) {
  const {t} = useTranslation();
  const searchRef = useRef<any>(null);
  const [selected, setSelected] = useState<any>([]);
  const friends = useSelector((state: any) => state.Config.friends);

  const onPress = useCallback(() => {
    onSelectMember(selected);
    const isActive = memberSheetRef?.current?.isActive();
    if (isActive) {
      memberSheetRef?.current?.scrollTo(0);
    } else {
      memberSheetRef?.current?.scrollTo(-200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {};

  const onAddNew = (value: string) => {
    if (value) {
      setSelected((prevSelected: any) => [
        ...prevSelected,
        {
          _id: '',
          name: value,
          image_url: '',
        },
      ]);
    }
  };

  const removeItemByIndex = (indexToRemove: number) => {
    setSelected((prevSelected: any) => {
      const newSelected = [...prevSelected];
      newSelected.splice(indexToRemove, 1);
      return newSelected;
    });
  };

  const onSearch = async (e: any) => {
    console.log(selected);
  };

  const renderMembers = ({item, index}: any) => {
    return (
      <View key={index} style={styles.viewMembers}>
        <View style={styles.avatarFrame}>
          <Text style={styles.txtAvatar}>{item.name.charAt(0)}</Text>
        </View>
        <Text style={styles.txtNameMember} numberOfLines={2}>
          {item.name}
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => removeItemByIndex(index)}
          style={styles.deleteMember}>
          <IconLibrary size={12} library="AntDesign" name="close" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.txtTitleSheet}>{t('members')}</Text>
      <SearchMember
        ref={searchRef}
        onAddNew={onAddNew}
        onRefresh={onRefresh}
        onSubmitEditing={(e: any) => onSearch({title: e})}
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
      </View>
      <TouchableOpacity style={styles.addNew} onPress={onPress}>
        <Text style={styles.txtAdd}>{t('add')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export {WalletCard, RenderCurrency, RenderColor, RenderMember};
