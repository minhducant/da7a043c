import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  TestIds,
  GAMBannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

import {
  IconAI,
  IconDebt,
  IconCongcu,
  IconFriend,
  IconWallet,
  IconSupport,
  IconSettings,
} from '@assets/icons';
import {IconLibrary} from '@components/Base';
import UserInfo from '@components/Home/UserInfo';
import {navigate} from '@navigation/RootNavigation';
import {userScreenStyle as styles} from '@styles/user.style';

const ProfileItem = ({title, navigation}: any) => {
  const {t} = useTranslation();

  const onPress = () => {
    navigation && navigate(navigation);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={styles.profileItem}>
      <View style={styles.iconProfileItem}>
        {title === 'settings' && <IconSettings />}
        {title === 'support_center' && <IconSupport />}
        {title === 'friends_list' && <IconFriend />}
        {title === 'ai_chat' && <IconAI />}
        {title === 'tools' && <IconCongcu />}
        {title === 'manage_wallet' && <IconWallet />}
        {title === 'debt_book' && <IconDebt />}
      </View>
      <Text style={styles.txtProfileItem}>{t(title)}</Text>
      <IconLibrary
        name={'chevron-right'}
        size={18}
        color={'#9BA2B3'}
        library={'Entypo'}
      />
    </TouchableOpacity>
  );
};

export default function UserScreen() {
  const {t} = useTranslation();
  const appVersion = DeviceInfo.getVersion();
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      ref={scrollViewRef}
      // style={styles.containerUser}
      showsVerticalScrollIndicator={false}>
      <UserInfo />
      <TouchableOpacity style={styles.viewPremium}></TouchableOpacity>
      <Text style={styles.txtToolTitle}>{t('utilities')}</Text>
      <View style={styles.viewTool}>
        <ProfileItem title={'friends_list'} navigation="" />
        <ProfileItem title={'manage_wallet'} navigation="WalletScreen" />
        <ProfileItem title={'debt_book'} navigation="" />
        <ProfileItem title={'ai_chat'} navigation="ChatGPTScreen" />
        <ProfileItem title={'tools'} navigation="UtilitiesScreen" />
      </View>
      <Text style={styles.txtToolTitle}>{t('support_and_settings')}</Text>
      <View style={[styles.viewTool]}>
        <ProfileItem title={'support_center'} navigation="" />
        <ProfileItem title={'settings'} navigation="SettingScreen" />
      </View>
      {/* <GAMBannerAd
        unitId={TestIds.ADAPTIVE_BANNER}
        sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
      <View style={styles.viewRating}></View>
      <Text style={[styles.txtAppVersion, {marginBottom: 32}]}>
        {t('app_version')} {appVersion}
      </Text>
    </ScrollView>
  );
}
