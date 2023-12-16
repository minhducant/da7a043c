import normalize from 'react-native-normalize';
import {StatusBar, Platform, Dimensions} from 'react-native';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';

const {width} = Dimensions.get('screen');
const statusBarHeight = StatusBar.currentHeight;

export const homeStyle: any = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.WHITE,
    marginTop: Platform.OS === 'android' ? statusBarHeight : 0,
  },
  txtTitle: {
    fontSize: 24,
    marginLeft: normalize(16),
    color: color.BLACK,
    marginVertical: normalize(16),
    marginBottom: normalize(10),
    fontFamily: themeStyle.FONT_BOLD,
  },
  itemNote: {
    alignSelf: 'center',
    height: normalize(180),
    width: width - normalize(16 * 2),
    borderRadius: normalize(16),
    marginBottom: normalize(16),
  },
  containerNote: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  itemCurrency: {
    flexDirection: 'row',
    padding: normalize(16),
    paddingBottom: normalize(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtCurrency: {
    fontSize: 18,
    color: color.BLACK,
    marginLeft: normalize(16),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  flag: {
    borderRadius: normalize(3),
  },
  txtTitleSheet: {
    fontSize: 18,
    fontFamily: themeStyle.FONT_BOLD,
    alignSelf: 'center',
  },
  txtSymbol: {
    color: 'gray',
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 18,
  },
  flex1: {
    flex: 1,
  },
  ScrollView: {
    flexGrow: 1,
  },
  itemColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(50),
    marginBottom: normalize(16),
    borderRadius: normalize(10),
    marginHorizontal: normalize(5),
  },
  listColor: {
    margin: normalize(16),
  },
};
