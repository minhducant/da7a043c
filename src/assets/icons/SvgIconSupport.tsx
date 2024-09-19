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
        <Path d="M7 8.75a.25.25 0 0 1 0-.5M7 8.75a.25.25 0 0 0 0-.5M5.5 4.5A1.5 1.5 0 1 1 7 6v.5" />
        <Path d="M12.5.5h-11a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1h2v2.5L6.62 11h5.88a1 1 0 0 0 1-1V1.5a1 1 0 0 0-1-1Z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
