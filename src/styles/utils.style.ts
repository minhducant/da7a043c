import normalize from 'react-native-normalize';
import {Platform, Dimensions} from 'react-native';

import color from './color';
import themeStyle from './theme.style';

const {width, height} = Dimensions.get('window');

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
  txtResultNumber: {
    fontSize: 75,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: normalize(5),
    fontFamily: 'Menlo',
  },
  coin: {
    width: normalize(150),
    height: normalize(150),
    borderRadius: normalize(75),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EB5758',
  },
  coinText: {
    fontSize: 30,
    fontFamily: themeStyle.FONT_BOLD,
  },
  ScrollViewCoin: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderCoin: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(135),
    height: normalize(135),
    borderWidth: Platform.OS === 'android' ? normalize(3.8) : normalize(2),
    borderRadius: normalize(75),
    borderColor: 'white',
    borderStyle: 'dashed',
  },
  dice: {
    width: normalize(150),
    height: normalize(150),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Platform.OS === 'android' ? normalize(5) : normalize(3.5),
    borderRadius: normalize(15),
    borderColor: color.SILVER,
  },
  diceValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: themeStyle.FONT_BOLD,
  },
  dot: {
    width: normalize(25),
    height: normalize(25),
    backgroundColor: 'black',
    borderRadius: normalize(200),
    position: 'absolute',
  },
  dotTopLeft: {
    top: normalize(15),
    left: normalize(15),
  },
  dotTopCenter: {
    top: normalize(15),
    alignItems: 'center',
  },
  dotTopRight: {
    top: normalize(15),
    right: normalize(15),
  },
  dotCenter: {
    alignItems: 'center',
  },
  dotBottomLeft: {
    bottom: normalize(15),
    left: normalize(15),
  },
  dotBottomCenter: {
    bottom: normalize(15),
    alignItems: 'center',
  },
  dotBottomRight: {
    bottom: normalize(15),
    right: normalize(15),
  },
  rowTicTacToe: {
    flexDirection: 'row',
  },
  squareTicTacToe: {
    width: normalize(100),
    height: normalize(100),
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DFDFDF',
  },
  squareTextTicTacToe: {
    fontSize: 40,
    fontFamily: themeStyle.FONT_BOLD,
  },
  titleTicTacToe: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  ScrollViewTicTacToe: {
    flexGrow: 1,
    alignItems: 'center',
  },
  modalTicTacToe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewTicTacToe: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '70%',
    height: '24%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTicTacToeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(15),
    backgroundColor: '#EB5758',
    marginTop: normalize(16),
    height: normalize(45),
    marginHorizontal: normalize(10),
    flex: 1,
  },
  modalButton: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalTicTacToeTxt: {
    fontSize: 30,
    marginTop: normalize(16),
    fontFamily: themeStyle.FONT_BOLD,
  },
  modalTicTacToeIcon: {
    alignItems: 'center',
    flexDirection: 'row',
  },
};
