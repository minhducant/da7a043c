import normalize from 'react-native-normalize';
import {Platform, Dimensions} from 'react-native';

import color from './color';
import themeStyle from './theme.style';

const width = Dimensions.get('screen').width;
const TAB_BAR_WIDTH = width / 5;
const ANIMATED_PART_HEIGHT =
  Platform.OS === 'android' ? normalize(3.4) : normalize(2);

export const navigationStyle: any = {
  containerTab: {
    flexDirection: 'column',
    backgroundColor: 'white',
    display: 'flex',
    alignSelf: 'center',
    width: width,
    height: Platform.OS === 'android' ? normalize(55) : normalize(80),
    justifyContent: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
  },
  tabButton: {
    flex: 1,
  },
  innerView: {
    paddingVertical: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  iconText: {
    textAlign: 'center',
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 13,
  },
  animatedView: {
    width: TAB_BAR_WIDTH,
    height: ANIMATED_PART_HEIGHT,
    backgroundColor: color.BLACK,
  },
  animatedWrapper: {
    width: TAB_BAR_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: themeStyle.FONT_FAMILY,
    paddingTop: normalize(5),
    fontSize: 13,
    color: color.BLACK,
  },
  unFocusTitle: {
    fontFamily: themeStyle.FONT_FAMILY,
    paddingTop: normalize(5),
    color: color.DUSTY_GRAY,
    fontSize: 13,
    opacity: 0.8,
  },
  badgeStyle: {
    position: 'absolute',
    width: normalize(8, 'width'),
    height: normalize(8, 'width'),
    borderRadius: normalize(6, 'width'),
    right: normalize(26, 'width'),
    top: normalize(15, 'width'),
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    width: normalize(5, 'width'),
    height: normalize(5, 'width'),
    borderRadius: normalize(6, 'width'),
    top: normalize(5, 'width'),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
