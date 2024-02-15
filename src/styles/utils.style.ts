import normalize from 'react-native-normalize';
import {Platform, Dimensions} from 'react-native';

import color from './color';
import themeStyle from './theme.style';

export const utilitiesStyle: any = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewGenerate: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(15),
    backgroundColor: '#EB5758',
    marginHorizontal: normalize(16),
    marginBottom: Platform.OS === 'android' ? normalize(15) : 0,
    marginTop: normalize(16),
    height: normalize(45),
  },
  txtGenerate: {
    fontSize: 20,
    alignSelf: 'center',
    color: color.WHITE,
    fontFamily: themeStyle.FONT_BOLD,
  },
  ScrollView: {
    flexGrow: 1,
  },
  txtHeaderRadom: {
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: normalize(16),
    fontFamily: themeStyle.FONT_BOLD,
  },
  activityIndicator: {
    marginTop: normalize(16),
  },
  txtResultRadom: {
    fontSize: 18,
    marginLeft: normalize(30),
    marginVertical: normalize(16),
    fontFamily: themeStyle.FONT_FAMILY,
  },
};
