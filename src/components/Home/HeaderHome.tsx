import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';

import {IconQrcode, IconCrown} from '@assets/icons';
import {navigate} from '@navigation/RootNavigation';
import {homeStyle as styles} from '@styles/home.style';

export default function HeaderHome() {
  const userInfo = useSelector((state: any) => state.Config.userInfo);

  return (
    <View style={styles.viewHeaderHome}>
      {/* <Text style={styles.txtTitle}>Good day, {userInfo?.name}</Text> */}
      <Text style={styles.txtTitle}>
        Spend<Text style={{color: 'red'}}>Sync</Text>
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{marginRight: 20}}>
          <IconCrown />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('QrCodeScreen')}>
          <IconQrcode />
        </TouchableOpacity>
      </View>
    </View>
  );
}
