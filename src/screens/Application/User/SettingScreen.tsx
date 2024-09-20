import React from 'react';
import {
  View,
  Text,
  Linking,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

import {onLogout} from '@utils/Logout';
import {showMessage} from '@utils/index';
import {IconLibrary} from '@components/Base';
import {navigate} from '@navigation/RootNavigation';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function SettingScreen() {
  const {t} = useTranslation();
  const appVersion = DeviceInfo.getVersion();

  const listSetting = [
    {
      title: t('update_information'),
      screen: '',
      icon: 'user',
      library: 'FontAwesome',
    },
    {
      title: t('language'),
      screen: 'ChangeLanguageScreen',
      icon: 'language',
      library: 'FontAwesome',
    },
    {
      title: t('notifications'),
      screen: '',
      icon: 'notifications',
      library: 'Ionicons',
    },
    {
      title: t('e_wallet'),
      screen: '',
      icon: 'wallet',
      library: 'Entypo',
    },
    {
      title: t('feedback'),
      screen: '',
      icon: 'feedback',
      library: 'MaterialIcons',
    },
    {
      title: t('privacy_policy'),
      screen: 'PolicyScreen',
      icon: 'verified-user',
      library: 'MaterialIcons',
    },
    {
      title: t('about_spendsync'),
      screen: '',
      icon: 'policy',
      library: 'MaterialIcons',
    },
  ];

  const renderItem = ({item, index}: any) => {
    const onPress = async () => {
      if (item.icon === 'notifications') {
        Linking.openSettings();
        return;
      }
      if (item.screen) {
        item.screen === 'PolicyScreen'
          ? navigate(item.screen, 'ModalSlide')
          : navigate(item.screen);
      } else {
        showMessage.help(t('function_under_development'));
      }
    };

    return (
      <TouchableOpacity
        key={index}
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.settingItem}>
        <IconLibrary
          library={item.library}
          name={item.icon}
          size={25}
          color={'#253255'}
        />
        <Text style={styles.txtSettingItem}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('account_settings')} />
      <FlatList
        data={listSetting}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `${index}`}
      />
      <SafeAreaView>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.txtAppVersion}>
            {t('app_version')} {appVersion}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOut} onPress={onLogout}>
          <Text style={styles.txtSignOut}>{t('sign_out')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
