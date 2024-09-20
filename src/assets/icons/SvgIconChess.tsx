import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const SvgComponent = () => (
  <Svg
    width={normalize(26)}
    height={normalize(26)}
    fill="none"
    viewBox="0 0 24 24">
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Zm2 14v-7h8v8H5a1 1 0 0 1-1-1Zm16-7h-8V4h7a1 1 0 0 1 1 1v7Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
