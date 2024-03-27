/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import normalize from 'react-native-normalize';
import FastImage from 'react-native-fast-image';
import CountryFlag from 'react-native-country-flag';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {
  EmptyCart,
  IconMore,
  IconSplit,
  IconMember,
  IconPresentation,
} from '@assets/icons/index';
import {HomeApi} from '@api/HomeApi';
import {IconClose} from '@assets/icons';
import {IconLibrary} from '@components/Base';
import {currencies, colors} from '@configs/AppData';
import {navigate} from '@navigation/RootNavigation';
import {homeStyle as styles} from '@styles/home.style';
import SearchMember from '@components/Home/SearchMember';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const STOPPED_TRANSLATE_X = -SCREEN_WIDTH * 0.25;
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;

const WalletCard = ({item, index, scrollRef, resetTranslateX}: any) => {
  const {t} = useTranslation();

  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: event => {
      if (event.translationX < TRANSLATE_X_THRESHOLD) {
        translateX.value = withTiming(STOPPED_TRANSLATE_X);
        opacity.value = withTiming(0, {duration: 500});
      } else {
        translateX.value = withTiming(0, {duration: 500});
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
      {duration: 500},
    );
    const translateXIcon = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 0 : -50,
      {duration: 500},
    );
    return {
      opacity,
      transform: [{translateX: translateXIcon}],
    };
  });

  const onPress = (note: any) => {
    navigate('DetailNoteScreen', 'NoFooter', note);
  };

  return (
    <View style={[styles.note]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <TouchableOpacity>
          <Text>Đức</Text>
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={panGesture}
        simultaneousHandlers={scrollRef}>
        <Animated.View style={[styles.task, rStyle]}>
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => onPress(item)}
            style={[styles.itemNote, {backgroundColor: item.color}]}>
            <View style={styles.headerItemNote}>
              <Text numberOfLines={1} style={styles.txtTitleNote}>
                {item.title}
              </Text>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

function RenderCurrency(
  currencySheetRef: React.MutableRefObject<any>,
  onSelectCurrency: (selectedCurrency: number) => Promise<void>,
) {
  const {t} = useTranslation();

  const onPress = useCallback((item: any) => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {currencies.map((item: any, index: number) => (
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
      </ScrollView>
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
  onSelectMember: any,
) {
  const {t} = useTranslation();
  const searchRef = useRef<any>(null);
  const [selected, setSelected] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const friends = useSelector((state: any) => state.Config.friends);

  const onDone = useCallback((selected: any) => {
    onSelectMember(selected);
    const isActive = memberSheetRef?.current?.isActive();
    if (isActive) {
      memberSheetRef?.current?.scrollTo(0);
    } else {
      memberSheetRef?.current?.scrollTo(-200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    onSelectMember([]);
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
          user_id: '',
          permission: 0,
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

  const onSearch = async (value: string) => {
    if (value && value.length > 7) {
      const res: any = await HomeApi.getUsers({user_id: value});
      if (res.code === 200) {
        setSearchResults(res?.data);
      } else {
      }
    }
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

  const renderUsers = ({item, index}: any) => {
    return (
      <View key={index} style={{}}>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <View style={{aspectRatio: 1}}>
      <View style={styles.headerInputMember}>
        <TouchableOpacity onPress={onClose}>
          <IconClose fill="#000000" />
        </TouchableOpacity>
        <Text style={styles.txtTitleSheet}>{t('members')}</Text>
        <TouchableOpacity onPress={() => onDone(selected)}>
          <Text style={styles.txtDone}>{t('done')}</Text>
        </TouchableOpacity>
      </View>
      <SearchMember
        ref={searchRef}
        onAddNew={onAddNew}
        onChange={onSearch}
        onRefresh={onRefresh}
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
          renderItem={renderUsers}
          stickyHeaderIndices={[0]}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.contentContainer}
          data={searchResults.length === 0 ? friends : searchResults}
        />
      </View>
    </View>
  );
}

const NoteAction = ({title, action = () => {}}: any) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.5}
      style={styles.noteAction}>
      <View
        style={[
          styles.iconNoteAction,
          {
            backgroundColor:
              title === 'split_bill'
                ? '#E8F7FF'
                : title === 'member'
                ? '#EFF9F4'
                : title === 'statistics'
                ? '#F8EDF9'
                : '#FEF6EB',
          },
        ]}>
        {title === 'split_bill' && <IconSplit fill="#2566ED" />}
        {title === 'member' && <IconMember fill="#379C39" />}
        {title === 'statistics' && <IconPresentation fill="#B445C5" />}
        {title === 'more' && <IconMore fill="#F58706" />}
      </View>
      <View style={styles.viewTitleAction}>
        <Text style={styles.txtNoteAction}>{t(title)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const EmptyData = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.viewEmpty}>
      <EmptyCart />
      <Text style={styles.txtEmptyTransactions}>
        {t('no_transactions_yet')}
      </Text>
    </View>
  );
};

export {
  EmptyData,
  WalletCard,
  RenderColor,
  NoteAction,
  RenderMember,
  RenderCurrency,
};
