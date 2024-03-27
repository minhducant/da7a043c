import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import UserInfo from '@components/Home/UserInfo';
import {navigate} from '@navigation/RootNavigation';
import {userScreenStyle as styles} from '@styles/user.style';
import UpgradePremium from '@assets/icons/SvgUpgradePremium';

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
      <View style={styles.iconProfileItem}></View>
      <View style={styles.viewProfileName}>
        <Text style={styles.txtProfileItem}>{t(title)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <UserInfo />
      <TouchableOpacity style={styles.viewPremium}>
        <UpgradePremium />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <ProfileItem title={'friends'} navigation="TimerCountdownScreen" />
          <ProfileItem title={'chat_gpt'} navigation="ChatGPTScreen" />
          <ProfileItem title={'utilities'} navigation="UtilitiesScreen" />
          <ProfileItem title={'settings'} navigation="SettingScreen" />
        </View>
      </ScrollView>
    </View>
  );
}
