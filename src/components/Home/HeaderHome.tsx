import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';

import {IconQrcode, IconCrown} from '@assets/icons';
import {homeStyle as styles} from '@styles/home.style';

export default function HeaderHome() {
  const userInfo = useSelector((state: any) => state.Config.userInfo);

  return (
    <View style={styles.viewHeaderHome}>
      {/* <Text style={styles.txtTitle}>Good day, {userInfo?.name}</Text> */}
      <Text style={styles.txtTitle}>SpendSync</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{marginRight: 20}}>
          <IconCrown />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconQrcode />
        </TouchableOpacity>
      </View>
    </View>
  );
}
