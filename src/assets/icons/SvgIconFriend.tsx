import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import normalize from 'react-native-normalize';

function SvgComponent({
  fill,
  width = normalize(20),
  height = normalize(20),
}: any) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      style={{}}>
      <G stroke="#000" strokeLinecap="round" strokeLinejoin="round">
        <Path d="m6 9.75-.5 3.75h-2L3 9.75H1.5V7a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v2.75H11l-.5 3.75h-2L8 9.75M4.5 4a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM9.5 4a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
