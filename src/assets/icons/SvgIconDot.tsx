import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg width={10} height={10} fill="none" viewBox="0 0 24 24">
    <Path fill="#fc0303" d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
  </Svg>
);
export default SvgComponent;
