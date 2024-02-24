import React from 'react';
import {View, Text} from 'react-native';

import {t} from '@i18n/index';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

const PolicyScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('privacy_policy')} />
    </View>
  );
};

export default PolicyScreen;
