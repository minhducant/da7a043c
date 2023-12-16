import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {onLogout} from '@utils/Logout';
import UserInfo from '@components/Home/UserInfo';
import {userScreenStyle as styles} from '@styles/user.style';

export default function UserScreen() {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <UserInfo />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ProfileItem title={'friends'} />
        <ProfileItem title={'settings'} />
        <ProfileItem title={'chat_gpt'} />
        <ProfileItem title={'utilities'} />
        <TouchableOpacity style={styles.signOut} onPress={onLogout}>
          <Text style={styles.txtSignOut}>{t('sign_out')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const ProfileItem = ({title, onPress}: any) => {
  const {t} = useTranslation();
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
