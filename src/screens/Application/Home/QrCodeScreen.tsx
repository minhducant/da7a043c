import React from 'react';
import {
  View,
  Text,
  Linking,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {homeStyle as styles} from '@styles/home.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function QrCodeScreen() {
  return (
    <View style={styles.containerNote}>
      <HeaderWithTitle title={'Scan QR Code'} />
    </View>
  );
}
