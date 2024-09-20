import * as React from 'react';
import normalize from 'react-native-normalize';
import Svg, {G, Path, Circle} from 'react-native-svg';

const SvgComponent = () => (
  <Svg
    width={normalize(37)}
    height={normalize(37)}
    fill="white"
    viewBox="0 0 14 14">
    <Path
      fill="#eb5758"
      d="M7 .25c-2.092 0-3.797.59-4.979 1.771C.84 3.203.25 4.908.25 7s.59 3.797 1.771 4.979C3.203 13.16 4.908 13.75 7 13.75s3.797-.59 4.979-1.771C13.16 10.797 13.75 9.092 13.75 7s-.59-3.797-1.771-4.979C10.797.84 9.092.25 7 .25Z"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M7.623 3.973a.625.625 0 0 0-1.25 0v2.404h-2.49a.625.625 0 1 0 0 1.25h2.49v2.49a.625.625 0 0 0 1.25 0v-2.49h2.404a.625.625 0 1 0 0-1.25H7.623V3.973Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
