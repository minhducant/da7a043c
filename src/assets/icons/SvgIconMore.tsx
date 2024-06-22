import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const SvgComponent = ({fill = '#323232'}) => (
  <Svg
    width={normalize(26)}
    height={normalize(26)}
    fill="none"
    viewBox="0 0 24 24">
    <Path
      fill={fill}
      d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2ZM8 13c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.44 1-1 1Zm4 0c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.44 1-1 1Zm4 0c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.44 1-1 1Z"
    />
  </Svg>

  // <Svg
  //   width={normalize(26)}
  //   height={normalize(26)}
  //   fill="none"
  //   viewBox="0 0 24 24">
  //   <Path
  //     fill="#1C274C"
  //     d="M9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM17 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
  //   />
  //   <Path
  //     stroke="#1C274C"
  //     strokeWidth={1.5}
  //     d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
  //     opacity={0.5}
  //   />
  // </Svg>
);
export default SvgComponent;
