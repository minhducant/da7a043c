import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import normalize from 'react-native-normalize';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';

import {t} from '@i18n/index';
import color from '@styles/color';
import themeStyle from '@styles/theme.style';
import {currencies} from '@configs/AppData';

interface InputRef {
  getValue: () => any;
}

export interface InputProps {
  colorSheetRef: any;
  currencySheetRef: any;
}

const InputColorCurrency = forwardRef<InputRef, InputProps>(
  ({colorSheetRef, currencySheetRef}, ref) => {
    const [colors, setColors] = useState('#2E84FC');
    const [currency, setCurrency] = useState<number | null>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => ({
        colors,
        currency,
      }),
      setColors: (vl: string) => {
        setColors(vl);
      },
      setCurrency: (vl: number) => {
        setCurrency(vl);
      },
      colors,
      currency,
    }));

    const onShowColorSheet = useCallback(() => {
      const isActive = colorSheetRef?.current?.isActive();
      if (isActive) {
        colorSheetRef?.current?.scrollTo(0);
      } else {
        colorSheetRef?.current?.scrollTo(
          Platform.OS === 'android' ? -350 : -400,
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onShowCurrencySheet = useCallback(() => {
      const isActive = currencySheetRef?.current?.isActive();
      if (isActive) {
        currencySheetRef?.current?.scrollTo(0);
      } else {
        currencySheetRef?.current?.scrollTo(
          Platform.OS === 'android' ? -300 : -340,
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.input}
          activeOpacity={0.5}
          onPress={onShowColorSheet}>
          <Text style={styles.txtInput}>
            {t('color')}:{'  '}
          </Text>
          <View style={[styles.colorView, {backgroundColor: colors}]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.input, {marginLeft: normalize(15)}]}
          activeOpacity={0.5}
          onPress={onShowCurrencySheet}>
          <Text style={styles.txtInput}>
            {t('currency')}:{'  '}
            <Text style={styles.txtCurrency}>
              {findCurrencyNameById(currencies, currency)}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

export default InputColorCurrency;

const findCurrencyNameById = (item: any[], id: number | null) => {
  const currency = item.find((it: {id: any}) => it.id === id);
  return currency ? `${currency.code}` : '';
};

const styles: any = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: normalize(16),
  },
  input: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9398AA',
    marginTop: normalize(16),
    minHeight: normalize(50),
    borderRadius: normalize(15),
    borderWidth: normalize(1.5),
    padding: normalize(10),
    paddingLeft: normalize(16),
  },
  txtInput: {
    fontSize: 18,
    color: '#999999',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  colorView: {
    height: normalize(20),
    width: normalize(50),
    borderRadius: normalize(5),
  },
  txtCurrency: {
    fontSize: 18,
    color: color.BLACK,
    fontFamily: themeStyle.FONT_FAMILY,
  },
});
