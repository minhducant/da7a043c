import React from 'react';
import {useSelector} from 'react-redux';
import normalize from 'react-native-normalize';
import FastImage from 'react-native-fast-image';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';

export default function UserInfo() {
  const userInfo = useSelector((state: any) => state.Config.userInfo);

  return (
    <View style={styles.viewName}>
      <TouchableOpacity>
        <FastImage
          style={styles.fastImage}
          source={{
            uri: userInfo?.image_url,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
      <Text style={styles.txtName}>{userInfo?.name}</Text>
      {/* <Text style={styles.txtInfo} numberOfLines={1}>
        {userInfo?._id}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  fastImage: {
    height: normalize(120),
    width: normalize(120),
    borderRadius: normalize(30),
    marginBottom: normalize(16),
    bottom: normalize(7),
  },
  viewName: {
    paddingVertical: normalize(20),
    width: '100%',
    backgroundColor: color.WHITE,
    alignItems: 'center',
    paddingBottom: normalize(16),
    marginTop: normalize(50),
  },
  txtName: {
    fontFamily: themeStyle.FONT_BOLD,
    color: color.BLACK,
    fontSize: 20,
    marginVertical: normalize(5),
  },
  txtInfo: {
    fontFamily: themeStyle.FONT_FAMILY,
    color: color.DUSTY_GRAY,
    fontSize: 14,
    marginVertical: normalize(5),
  },
  frame: {
    position: 'absolute',
    top: 7,
  },
});
