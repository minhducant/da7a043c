import * as React from 'react';
import normalize from 'react-native-normalize';
import Svg, {Path, Circle} from 'react-native-svg';

function SvgComponent({fill}: any) {
  return (
    <Svg
      width={normalize(25)}
      height={normalize(25)}
      viewBox="0 0 24 24"
      // style={{marginTop: normalize(0)}}
      >
      <Circle
        cx={12}
        cy={6}
        r={4}
        stroke={fill}
        strokeWidth={1.5}
        fill="none"
      />
      <Path
        fill="none"
        stroke={fill}
        strokeWidth={1.5}
        d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"
      />
    </Svg>
  );
}

export default SvgComponent;
