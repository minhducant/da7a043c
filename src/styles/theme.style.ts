import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  FONT_FAMILY: 'PlusJakartaSans-Regular',
  FONT_BOLD: 'PlusJakartaSans-Bold',
  FONT_SEMIBOLD: 'PlusJakartaSans-SemiBold',
  width,
  height,
};

const palette = {
  palette01: '#000000',
  palette02: 'rgba(255,255,255,1)',
};
export const colors = {
  paragraphText: palette.palette01,
  buttonPrimaryBg: palette.palette02,
  headingText: palette.palette01,
};
