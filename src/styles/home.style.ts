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
    marginVertical: normalize(10),
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
  addNew: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(15),
    backgroundColor: '#EB5758',
    marginHorizontal: normalize(16),
    marginBottom: Platform.OS === 'android' ? normalize(15) : 0,
    marginTop: normalize(16),
    height: normalize(45),
  },
  txtAdd: {
    fontSize: 20,
    alignSelf: 'center',
    color: color.WHITE,
    fontFamily: themeStyle.FONT_BOLD,
  },
  txtTitleMember: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_BOLD,
  },
  avatarFrame: {
    height: normalize(50),
    width: normalize(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999999999,
    marginVertical: normalize(10),
    backgroundColor: '#6763FD',
  },
  txtNameMember: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  viewMembers: {
    marginRight: normalize(10),
    width: normalize(70),
    alignItems: 'center',
    height: normalize(110),
  },
  txtAvatar: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: themeStyle.FONT_BOLD,
  },
  deleteMember: {
    position: 'absolute',
    height: normalize(20),
    width: normalize(20),
    borderRadius: 999999999,
    backgroundColor: 'white',
    right: normalize(10),
    top: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
};
