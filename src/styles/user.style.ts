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
    borderRadius: normalize(8),
    backgroundColor: color.GRAY,
    marginHorizontal: normalize(16),
    marginBottom: normalize(50),
    marginTop: normalize(16),
  },
  txtSignOut: {
    fontSize: 16,
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
};
