import * as React from 'react';
import Svg, {
  Rect,
  Mask,
  G,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');
const widthSvg = width - 34;
const heightSvg = (width - 32) * 0.515;

const SvgComponent = () => (
  <Svg
    width={widthSvg}
    height={heightSvg}
    fill="none"
    style={{alignSelf: 'center'}}>
    <Rect width={widthSvg} height={heightSvg} fill="url(#a)" rx={30} />
    <Mask
      id="b"
      width={widthSvg}
      height={184}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse">
      <Rect width={widthSvg} height={heightSvg} fill="#ED713C" rx={30} />
    </Mask>
    <G fill="#000" mask="url(#b)">
      <Ellipse cx={24.5} cy={213} opacity={0.1} rx={160.5} ry={113} />
      <Ellipse cx={290.5} cy={-29} opacity={0.08} rx={160.5} ry={113} />
    </G>
    <Defs>
      <LinearGradient
        id="a"
        x1={55.397}
        x2={88.511}
        y1={-29.053}
        y2={228.882}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#E42C66" />
        <Stop offset={1} stopColor="#F55B46" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgComponent;
