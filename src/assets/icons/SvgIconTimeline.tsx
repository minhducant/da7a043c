import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

function SvgComponent({fill}: any) {
  return (
    <Svg
      width={normalize(26)}
      height={normalize(26)}
      fill="none"
      viewBox="0 0 24 24">
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M7 18V9M12 18V6M17 18v-5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464.974.974 1.3 2.343 1.41 4.536"
      />
    </Svg>
  );
}
export default SvgComponent;
