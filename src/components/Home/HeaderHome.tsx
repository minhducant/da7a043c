import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';

import {homeStyle as styles} from '@styles/home.style';

export default function HeaderHome() {
  const userInfo = useSelector((state: any) => state.Config.userInfo);

  return (
    <View>
      <Text style={styles.txtTitle}>Good day, {userInfo?.name || "Đỗ Minh Đức"}</Text>
    </View>
  );
}
