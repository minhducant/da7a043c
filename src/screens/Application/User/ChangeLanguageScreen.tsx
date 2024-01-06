/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import normalize from 'react-native-normalize';
import CountryFlag from 'react-native-country-flag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import i18n from '@i18n/index';
import color from '@styles/color';
import {USER_LANG} from '@utils/DeviceLang';
import themeStyle from '@styles/theme.style';
import {DataLanguage} from '@configs/DataLanguage';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

const ChangeLanguageScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const currentLanguage = i18n.language;

  const onChangeLanguage = async (item: any) => {
    await i18n.changeLanguage(item);
    await AsyncStorage.setItem(USER_LANG, item);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('language')} />
      <View style={{marginTop: normalize(10)}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {DataLanguage.map(lang => {
            return (
              <TouchableOpacity
                onPress={() => onChangeLanguage(lang.value)}
                key={lang.value}
                style={[
                  styles.itemLang,
                  {
                    borderColor:
                      lang.value === currentLanguage ? '#ED2127' : '#e4e7f5',
                  },
                ]}>
                <CountryFlag
                  size={20}
                  style={styles.flag}
                  isoCode={lang.country}
                />
                <Text style={styles.title}>{lang.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    color: 'blue',
    fontSize: 20,
  },
  title: {
    fontFamily: themeStyle.FONT_FAMILY,
    color: color.BLACK,
    fontSize: 18,
    marginLeft: normalize(16),
  },
  itemLang: {
    borderWidth: 1,
    padding: normalize(14),
    borderColor: '#e4e7f5',
    margin: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(10),
  },
  flag: {
    borderRadius: normalize(3),
  },
});

export default ChangeLanguageScreen;
