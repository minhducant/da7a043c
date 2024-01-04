import normalize from 'react-native-normalize';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';

export const authenticationStyle: any = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B0040',
  },
  txtLogin: {
    fontSize: 16,
    color: color.BLACK,
    marginLeft: normalize(15),
    fontFamily: themeStyle.FONT_SEMIBOLD,
  },
  btnLogin: {
    borderRadius: normalize(13),
    alignItems: 'center',
    padding: normalize(11),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(16),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewBtn: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '80%',
  },
  txtAppName: {
    fontSize: 30,
    color: color.WHITE,
    fontFamily: themeStyle.FONT_SEMIBOLD,
  },
  txtSlogan: {
    fontSize: 18,
    textAlign: 'center',
    color: color.WHITE,
    marginHorizontal: normalize(10),
    marginVertical: normalize(20),
    fontFamily: themeStyle.FONT_FAMILY,
  },
};
