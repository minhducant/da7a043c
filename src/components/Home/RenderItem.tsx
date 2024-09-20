import React, {useCallback, useRef} from 'react';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import normalize from 'react-native-normalize';
import FastImage from 'react-native-fast-image';
import CountryFlag from 'react-native-country-flag';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Swipeable} from 'react-native-gesture-handler';

import {
  EmptyCart,
  EmptyNotify,
  IconMore,
  IconSplit,
  IconMember,
  IconPresentation,
} from '@assets/icons/index';
import {formatMoney} from '@utils/index';
import {currencies, colors} from '@configs/AppData';
import {navigate} from '@navigation/RootNavigation';
import {homeStyle as styles} from '@styles/home.style';

const WalletCard = ({item, index, scrollRef, swipeableRef}: any) => {
  let swipeableItemRef: Swipeable | null;

  const onPress = async (note: any) => {
    navigate('DetailNoteScreen', note);
    closePreviousSwipeable();
  };

  const closePreviousSwipeable = () => {
    if (swipeableRef.current && swipeableRef.current !== swipeableItemRef) {
      swipeableRef.current.close();
    }
    swipeableRef.current = swipeableItemRef;
  };
  const renderRightActions = () => {
    return (
      <Animated.View style={[styles.iconContainer]}>
        <TouchableOpacity>{/* <Text>Đức</Text> */}</TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      onSwipeableWillOpen={() => {
        closePreviousSwipeable();
      }}
      onSwipeableClose={() => {
        if (swipeableRef.current === swipeableItemRef) {
          swipeableRef.current = null;
        }
      }}
      renderRightActions={renderRightActions}
      ref={ref => (swipeableItemRef = ref)}>
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={() => onPress(item)}
        style={[styles.itemNote, {backgroundColor: 'white'}]}>
        <View style={styles.headerItemNote}>
          <View style={{flex: 8, paddingRight: normalize(16)}}>
            <Text numberOfLines={1} style={styles.txtTitleNote}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.txtTime}>
              {moment(item.createdAt).format('DD/MM/YYYY    HH:mm')}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            {RenderNumberMember(item?.members)}
          </View>
        </View>
        <View style={styles.dashLineNote} />
        <View style={styles.footerItemNote}>
          <Text numberOfLines={1} style={styles.txtTitleNote}>
            {formatMoney(item.total_money, item?.currency)}
          </Text>
          <TouchableOpacity>
            {/* <IconMore /> */}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const RenderNumberMember = (members: any[]) => {
  const renderMemberItem = (
    member: any,
    index: number,
    zIndex: number,
    right: number = 0,
  ) => (
    <View
      key={index}
      style={{position: right ? 'absolute' : 'relative', zIndex, right}}>
      {member.image_url ? (
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

  if (members.length === 0) {
    return null;
  }

  const renderMultipleMembers = () => {
    const items = [
      renderMemberItem(
        members[0],
        0,
        members.length >= 3 ? 3 : 2,
        members.length >= 3 ? 44 : 22,
      ),
    ];

    if (members.length === 2) {
      items.push(renderMemberItem(members[1], 1, 1, 0));
    } else if (members.length === 3) {
      items.push(renderMemberItem(members[1], 1, 2, 22));
      items.push(renderMemberItem(members[2], 2, 1, 0));
    } else if (members.length > 3) {
      items.push(renderMemberItem(members[1], 1, 2, 22));
      items.push(
        <View key="more" style={{zIndex: 1}}>
          <View style={styles.viewTextName}>
            <Text style={styles.textName}>+{members.length - 2}</Text>
          </View>
        </View>,
      );
    }

    return items;
  };

  return (
    <View>
      {members.length === 1
        ? renderMemberItem(members[0], 0, 1)
        : renderMultipleMembers()}
    </View>
  );
};

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

  const renderColor = ({item, index}: any) => {
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
