import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import HeaderWithTitle from '@components/Header/HeaderWithTitle';
import {notificationStyle as styles} from '@styles/notification.style';

export default function NotificationScreen() {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        hasLeft={false}
        hasRight={false}
        title={t('notifications')}
      />
    </View>
  );
}
