import React from 'react';
import {View} from 'react-native';

import {homeStyle as styles} from '@styles/home.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function DetailNoteScreen() {
  return (
    <View style={styles.containerNote}>
      <HeaderWithTitle title={''} />
    </View>
  );
}
