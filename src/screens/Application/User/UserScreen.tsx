import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import UserInfo from '@components/Home/UserInfo';
import {navigate} from '@navigation/RootNavigation';
import {userScreenStyle as styles} from '@styles/user.style';

export default function UserScreen() {
  // const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <UserInfo />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ProfileItem title={'friends'} navigation="TimerCountdownScreen" />
        <ProfileItem title={'chat_gpt'} navigation="ChatGPTScreen" />
        <ProfileItem title={'utilities'} navigation="UtilitiesScreen" />
        <ProfileItem title={'settings'} navigation="SettingScreen" />
      </ScrollView>
    </View>
  );
}

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
        {/* {title === 'order_history' && <IconCart fill="red" />}
        {title === 'renewal_history' && <IconChart fill="red" />}
        {title === 'personal_information' && <IconPerson fill="red" />} */}
      </View>
      <Text style={styles.txtProfileItem}>{t(title)}</Text>
    </TouchableOpacity>
  );
};
