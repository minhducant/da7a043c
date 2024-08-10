import React from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import normalize from 'react-native-normalize';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import color from '@styles/color';
import {showMessage} from '@utils/Toast';
import themeStyle from '@styles/theme.style';
import {IconLibrary} from '@components/Base/index';
import DefaultAvatar from '@assets/icons/SvgIconAvatar';

export default function UserInfo() {
  const {t} = useTranslation();
  const userInfo = useSelector((state: any) => state.Config.userInfo);

  const copyToClipboard = async (user_id: any) => {
    if (user_id) {
      Clipboard.setString(user_id);
      showMessage.success(t('copied_spendsync_id'));
    }
  };

  return (
    <View style={styles.viewName}>
      <View style={styles.avatar}>
        {userInfo?.image_url ? (
          <FastImage
            style={styles.fastImage}
            source={{
              uri: userInfo?.image_url,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <DefaultAvatar />
        )}
      </View>
      <Text style={styles.txtName}>
        {userInfo?.name || t('anonymous_user')}
      </Text>
      <TouchableOpacity
        style={styles.viewId}
        activeOpacity={0.5}
        onPress={() => copyToClipboard(userInfo?.user_id)}>
        <Text style={styles.txtInfo} numberOfLines={1}>
          {userInfo?.user_id || 'XXXXXXX'}
        </Text>
        <IconLibrary
          size={18}
          library="Ionicons"
          name="copy"
          color={color.DUSTY_GRAY}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fastImage: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(30),
  },
  avatar: {
    marginBottom: normalize(16),
  },
  viewName: {
    // paddingVertical: normalize(16),
    // backgroundColor: '#F6F9FF',
    alignItems: 'center',
    marginTop: normalize(55),
    marginBottom: normalize(0),
    // borderBottomWidth: 0.5,
    borderColor: color.DUSTY_GRAY,
    marginHorizontal: normalize(28),
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
    marginRight: normalize(5),
  },
  viewId: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(5),
  },
});
