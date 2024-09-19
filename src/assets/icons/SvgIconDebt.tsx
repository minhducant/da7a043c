import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
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
        <Path d="M12.5 2h-11c-.552 0-1 .471-1 1.053v7.894C.5 11.53.948 12 1.5 12h11c.552 0 1-.471 1-1.053V3.053c0-.582-.448-1.053-1-1.053ZM.5 5.5h13M9.5 9H11" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
