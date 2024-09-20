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
        <Path d="M4.15 7.5v2.31M5.305 8.656h-2.31M5.262 5.524H3.988c-1.592 0-2.932 1.142-3.115 2.655l-.358 2.963C.363 12.398 1.389 13.5 2.71 13.5c.844 0 1.614-.46 1.985-1.184l.358-.7h2.894l.358.7c.371.725 1.141 1.184 1.984 1.184 1.322 0 2.348-1.102 2.196-2.358l-.332-2.745" />
        <Path d="M7.733 9.233a.248.248 0 0 1 .495 0M7.733 9.233a.248.248 0 0 0 .495 0M7.5 2.25l3-1.75 3 1.75v3L10.5 7l-3-1.75v-3Z" />
        <Path d="M10 3.75a.5.5 0 1 0 1 0 .5.5 0 1 0-1 0" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
