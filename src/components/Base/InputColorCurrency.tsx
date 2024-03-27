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
import {IconLibrary} from '@components/Base/IconLibrary';

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
        colorSheetRef?.current?.scrollTo(-(themeStyle.height * 45) / 100);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onShowCurrencySheet = useCallback(() => {
      const isActive = currencySheetRef?.current?.isActive();
      if (isActive) {
        currencySheetRef?.current?.scrollTo(0);
      } else {
        currencySheetRef?.current?.scrollTo(-(themeStyle.height * 40) / 100);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <Text style={styles.title}>{t('color')}:</Text>
          <TouchableOpacity
            style={[
              styles.input,
              {
                backgroundColor: colors,
                justifyContent: 'center',
                borderWidth: 0,
              },
            ]}
            activeOpacity={0.5}
            onPress={onShowColorSheet}>
            <IconLibrary size={30} name="color-wand" color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerInput}>
          <Text style={[styles.title, {marginLeft: normalize(25)}]}>
            {t('currency')}:
          </Text>
          <TouchableOpacity
            style={[styles.input, {marginLeft: normalize(15)}]}
            activeOpacity={0.5}
            onPress={onShowCurrencySheet}>
            <Text style={styles.txtInput}>
              <Text style={styles.txtCurrency}>
                {findCurrencyNameById(currencies, currency)}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default InputColorCurrency;

const findCurrencyNameById = (item: any[], id: number | null) => {
  const currency = item.find((it: {id: any}) => it.id === id);
  return currency ? `${currency.currency} (${currency.symbol})` : '';
};

const styles: any = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: normalize(16),
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9398AA',
    justifyContent: 'center',
    minHeight: normalize(50),
    borderRadius: normalize(15),
    padding: normalize(10),
    paddingLeft: normalize(16),
    borderWidth: Platform.OS === 'ios' ? normalize(1.4) : normalize(3.5),
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
  title: {
    fontSize: 18,
    marginLeft: normalize(16),
    marginVertical: normalize(16),
    // marginBottom: normalize(10),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  containerInput: {
    flex: 1,
  },
});
