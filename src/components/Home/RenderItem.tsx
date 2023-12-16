/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import CountryFlag from 'react-native-country-flag';
import {useNavigation} from '@react-navigation/native';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import {IconLibrary} from '@components/BaseComponent';
import {homeStyle as styles} from '@styles/home.style';
import {currencies, Currency, colors} from '@configs/AppData';

interface NavigationProps {
  navigate: (route: string, params: {screen: string; params: any}) => void;
}

function RenderNote({item, index}: any) {
  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();

  const onPress = (note: any) => {
    navigation.navigate('NoFooter', {
      screen: 'NoteScreen',
      params: note,
    });
  };

  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.7}
      onPress={() => onPress(item)}
      style={[styles.itemNote, {backgroundColor: item.color}]}>
      <></>
    </TouchableOpacity>
  );
}

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

export {RenderNote, RenderCurrency, RenderColor};
