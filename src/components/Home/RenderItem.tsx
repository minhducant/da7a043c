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
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerProps,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {IconClose} from '@assets/icons';
import {IconLibrary} from '@components/Base';
import {currencies, colors} from '@configs/AppData';
import {navigate} from '@navigation/RootNavigation';
import {homeStyle as styles} from '@styles/home.style';
import SearchMember from '@components/Home/SearchMember';

const LIST_ITEM_HEIGHT = normalize(180);
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const WalletCard = ({item, index, scrollRef}: any) => {
  const {t} = useTranslation();

  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const marginVertical = useSharedValue(10);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: event => {
      if (event.translationX < TRANSLATE_X_THRESHOLD) {
        opacity.value = withTiming(0);
        marginVertical.value = withTiming(0);
        itemHeight.value = withTiming(0);
        // runOnJS(onSwipeEnd)();
      } else {
        translateX.value = withTiming(0);
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
    );
    return {opacity};
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      height: itemHeight.value,
      marginVertical: marginVertical.value,
    };
  });

  const onPress = (note: any) => {};

  return (
    <Animated.View style={[styles.note, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <Text>Đức</Text>
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={scrollRef}>
        <Animated.View style={[styles.task, rStyle]}>
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => onPress(item)}
            style={[styles.itemNote, {backgroundColor: item.color}]}>
            <View style={styles.headerItemNote}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      item.status === 0
                        ? '#999999'
                        : item.status === 1
                        ? '#FF0000'
                        : item.status === 2
                        ? '#008000'
                        : item.status === 3
                        ? '#0000FF'
                        : item.status === 4
                        ? '#FFA500'
                        : item.status === 5
                        ? '#A9A9A9'
                        : '#333333 ',
                  },
                ]}
              />
              <Text numberOfLines={1} style={styles.txtTitleNote}>
                {item.name}
              </Text>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
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
        <FlatList
          data={[]}
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

export {WalletCard, RenderCurrency, RenderColor, RenderMember};
