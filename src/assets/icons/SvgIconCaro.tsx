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
      d="M2.293 2.293a1 1 0 0 1 1.414 0L6.5 5.086l2.793-2.793a1 1 0 0 1 1.414 1.414L7.914 6.5l2.793 2.793a1 1 0 0 1-1.414 1.414L6.5 7.914l-2.793 2.793a1 1 0 0 1-1.414-1.414L5.086 6.5 2.293 3.707a1 1 0 0 1 0-1.414ZM17.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM13 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM6.5 15a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2 17.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm11.293-4.207a1 1 0 0 1 1.414 0l2.793 2.793 2.793-2.793a1 1 0 0 1 1.414 1.414L18.914 17.5l2.793 2.793a1 1 0 0 1-1.414 1.414L17.5 18.914l-2.793 2.793a1 1 0 0 1-1.414-1.414l2.793-2.793-2.793-2.793a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
