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
        <Path d="M12 9.75v1.75a1 1 0 0 1-1 1H1.5a1 1 0 0 1-1-1v-7a3 3 0 0 1 3-3H10V4" />
        <Path d="M13 6.75H9.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5ZM12 6.75V5a1 1 0 0 0-1-1H3.5" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
