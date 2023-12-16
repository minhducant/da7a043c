import normalize from 'react-native-normalize';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';

export const authenticationStyle: any = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.WHITE,
  },
  txtLogin: {
    fontSize: 16,
    color: color.BLACK,
    marginLeft: normalize(15),
    fontFamily: themeStyle.FONT_SEMIBOLD,
  },
  btnLogin: {
    width: '80%',
    borderRadius: normalize(12000),
    alignItems: 'center',
    padding: normalize(8),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(16),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
  },
};
