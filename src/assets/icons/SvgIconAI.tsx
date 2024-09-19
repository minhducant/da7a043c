import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import normalize from 'react-native-normalize';

function SvgComponent({
  fill,
  width = normalize(22),
  height = normalize(22),
}: any) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      style={{}}>
      <G stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} >
        <Path d="M8.166 1.667a1.167 1.167 0 1 1-2.333 0 1.167 1.167 0 0 1 2.333 0ZM7 2.833v2.25M8.75 10.354s-.55.584-1.75.584-1.75-.584-1.75-.584M5.042 8.146a.25.25 0 0 1 0-.5M5.042 8.146a.25.25 0 0 0 0-.5M8.958 8.146a.25.25 0 0 1 0-.5M8.958 8.146a.25.25 0 0 0 0-.5" />
        <Path d="M1.5 11.5V7.083a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2V11.5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2Z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
