import {Platform} from 'react-native';
import normalize from 'react-native-normalize';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';

export const userScreenStyle: any = {
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  signOut: {
    paddingVertical: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(15),
    backgroundColor: '#EB5758',
    marginHorizontal: normalize(16),
    marginBottom: Platform.OS === 'android' ? normalize(15) : 0,
    marginTop: normalize(16),
    height: normalize(45),
  },
  txtSignOut: {
    fontSize: 20,
    alignSelf: 'center',
    color: color.WHITE,
    fontFamily: themeStyle.FONT_BOLD,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
    marginHorizontal: normalize(16),
    backgroundColor: 'white',
    padding: normalize(16),
    borderRadius: normalize(12),
    shadowColor: '#777777',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  txtProfileItem: {
    flex: 1,
    color: color.BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  iconProfileItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(45),
    width: normalize(45),
    backgroundColor: '#FFEFEF',
    marginRight: normalize(16),
    borderRadius: normalize(8),
  },
  txtAppVersion: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'gray',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  txtSettingItem: {
    fontSize: 18,
    color: '#253255',
    marginLeft: normalize(16),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
    backgroundColor: '#FBFBFC',
    margin: normalize(16),
    borderRadius: normalize(16),
    marginTop: normalize(10),
    marginBottom: normalize(10),
  },
  containerChatbot: {},
  txtTitleChatbot: {
    fontSize: 18,
    color: '#253255',
    marginLeft: normalize(16),
    fontFamily: themeStyle.FONT_BOLD,
  },
  viewChatbot: {
    height: '60%',
    margin: normalize(16),
    borderRadius: normalize(16),
    backgroundColor: '#F5F5F5',
  },
  viewChatbotButton: {
    marginTop: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(10),
    backgroundColor: '#CAF9E1',
    borderRadius: normalize(99999),
  },
  mic: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(5),
    backgroundColor: 'green',
    borderRadius: normalize(99999),
  },
};
