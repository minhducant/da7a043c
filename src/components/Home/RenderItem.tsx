/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import CountryFlag from 'react-native-country-flag';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {navigate} from '@navigation/RootNavigation';
import {IconLibrary} from '@components/BaseComponent';
import {homeStyle as styles} from '@styles/home.style';
import {currencies, Currency, colors} from '@configs/AppData';

interface NavigationProps {
  navigate: (route: string, params: {screen: string; params: any}) => void;
}

const {width, height: wHeight} = Dimensions.get('window');
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;
export const MARGIN = 16;
export const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const height = wHeight - 64;

interface WalletCardProps {
  y: Animated.Value;
  index: number;
  item: any;
}

const WalletCard = ({item, y, index}: WalletCardProps) => {
  const {t} = useTranslation();
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;

  const onPress = (note: any) => {
    navigate('NoteScreen');
  };

  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: 'clamp',
      }),
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp',
    }),
  );

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });

  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <Animated.View
      style={[styles.itemNote, {opacity, transform: [{translateY}, {scale}]}]}
      key={index}>
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

export {WalletCard, RenderCurrency, RenderColor};
