import React from 'react';
import {View} from 'react-native';

import {t} from '@i18n/index';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function UtilitiesScreen() {
  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('utilities')} />
    </View>
  );
}
