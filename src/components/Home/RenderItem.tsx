/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useRef, useState} from 'react';
import moment from 'moment';
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
  ActivityIndicator,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  withDecay,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {
  EmptyCart,
  EmptyNotify,
  IconMore,
  IconSplit,
  IconMember,
  IconPresentation,
} from '@assets/icons/index';
import {HomeApi} from '@api/HomeApi';
import {IconClose} from '@assets/icons';
import {formatMoney} from '@utils/index';
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
  const slidingOut = useSharedValue(false);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = Math.max(0, event.translationX);
      const adjustedVelocity = event.velocityX / 2;
      if (Math.abs(adjustedVelocity) > 100) {
        translateX.value = withDecay({
          velocity: adjustedVelocity,
          clamp: [0, STOPPED_TRANSLATE_X],
        });
      }
    },
    onEnd: event => {
      if (event.translationX < TRANSLATE_X_THRESHOLD) {
        slidingOut.value = true;
        translateX.value = withTiming(STOPPED_TRANSLATE_X, {duration: 300});
        opacity.value = withTiming(0, {duration: 500});
      } else {
        slidingOut.value = false;
        translateX.value = withSpring(0, {damping: 10, stiffness: 100});
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
    const opacityValue = translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0;
    const translateXValue = translateX.value < TRANSLATE_X_THRESHOLD ? 0 : -50;
    return {
      opacity: withSpring(opacityValue, {damping: 10, stiffness: 100}),
      transform: [
        {
          translateX: withSpring(translateXValue, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  const onPress = (note: any) => {
    if (slidingOut.value) {
      slidingOut.value = false;
      translateX.value = withSpring(0, {damping: 10, stiffness: 100});
    } else {
      navigate('DetailNoteScreen', 'NoFooter', note);
    }
  };

  return (
    <View style={[styles.note]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <TouchableOpacity>{/* <Text>Đức</Text> */}</TouchableOpacity>
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
            style={[styles.itemNote, {backgroundColor: 'white'}]}>
            <View style={styles.headerItemNote}>
              <View style={{flex: 7}}>
                <Text numberOfLines={1} style={styles.txtTitleNote}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.txtTime}>
                  {moment(item.createdAt).format('DD/MM/YYYY    HH:mm')}
                </Text>
              </View>
              <View style={{flex: 3, right: 10, flexDirection: 'row-reverse'}}>
                {/* {RenderNumberMember(item?.members)} */}
              </View>
            </View>
            <View style={styles.dashLineNote} />
            <View style={styles.footerItemNote}>
              <Text numberOfLines={1} style={styles.txtTitleNote}>
                {formatMoney(item.total_money, item?.currency)}
              </Text>
              <TouchableOpacity>
                <IconMore />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

function RenderNumberMember(members: any[]) {
  const renderMemberItem = (member: any, index: number) => {
    return (
      <View
        key={index}
        style={{
          zIndex: members.length - index,
        }}>
        {member.image_url !== '' ? (
          <FastImage
            source={{
              uri: member.image_url,
              priority: FastImage.priority.normal,
            }}
            style={{width: 30, height: 30, borderRadius: 25}}
          />
        ) : (
          <View style={styles.viewTextName}>
            <Text style={styles.textName}>{member.name.charAt(0)}</Text>
          </View>
        )}
      </View>
    );
  };

  if (members.length === 0) {
    return <></>;
  } else if (members.length === 1) {
    return renderMemberItem(members[0], 0);
  } else if (members.length === 2) {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{}}>{renderMemberItem(members[0], 0)}</View>
        <View style={{}}> {renderMemberItem(members[1], 1)}</View>
      </View>
    );
  } else if (members.length === 3) {
    return (
      <View style={{position: 'absolute'}}>
        <View style={{left: 10}}>{renderMemberItem(members[0], 0)}</View>
        <View style={{bottom: 30, right: 10}}>
          {renderMemberItem(members[1], 1)}
        </View>
        <View style={{bottom: 45}}>{renderMemberItem(members[2], 2)}</View>
      </View>
    );
  } else {
    return (
      <View style={{position: 'absolute'}}>
        <View style={{left: 10}}>{renderMemberItem(members[0], 0)}</View>
        <View style={{bottom: 30, right: 10}}>
          {renderMemberItem(members[1], 1)}
        </View>
        {members.length > 3 && (
          <View style={{bottom: 45}}>
            <View style={styles.viewTextName}>
              <Text style={styles.textName}>+{members.length - 2}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default RenderNumberMember;

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

const EmptyNotification = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.viewEmpty}>
      <EmptyNotify />
      <Text style={styles.txtEmptyTransactions}>{t('no_notifications')}</Text>
    </View>
  );
};

const renderFooter = (loadingMore: any) => {
  return (
    (loadingMore.current && (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="red" />
      </View>
    )) || <View />
  );
};

const renderNotification = ({item, index}: any) => {
  const onPressItem = async (item: any) => {};
  return (
    <TouchableOpacity
      key={index}
      onPress={onPressItem}
      style={[
        styles.notificationItemContainer,
        {backgroundColor: item.is_read ? 'white' : '#F9FCFF'},
      ]}>
      <View style={styles.notificationIcon}>
        {/* <IconLibrary name="notifications" color="white" size={30} /> */}
      </View>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.body}
        </Text>
        <Text style={styles.notificationTime}>
          {moment(item.updatedAt).format('DD/MM/YYYY HH:MM')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export {
  renderFooter,
  EmptyData,
  WalletCard,
  RenderColor,
  NoteAction,
  RenderCurrency,
  EmptyNotification,
  renderNotification,
};
