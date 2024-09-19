import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import normalize from 'react-native-normalize';

function SvgComponent({
  fill,
  width = normalize(20),
  height = normalize(20),
}: any) {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <G stroke="#000" strokeLinecap="round" strokeLinejoin="round">
        <Path d="m5.66 1.14-.43 1.11-1.48.84-1.18-.18a1 1 0 0 0-1 .49l-.4.7a1 1 0 0 0 .08 1.13l.75.93v1.68l-.73.93a1 1 0 0 0-.08 1.13l.4.7a1 1 0 0 0 1 .49l1.18-.18 1.46.84.43 1.11a1 1 0 0 0 .93.64h.84a1 1 0 0 0 .93-.64l.43-1.11 1.46-.84 1.18.18a1 1 0 0 0 1-.49l.4-.7a1 1 0 0 0-.08-1.13L12 7.84V6.16l.73-.93a1 1 0 0 0 .08-1.13l-.4-.7a1 1 0 0 0-1-.49l-1.18.18-1.46-.84-.43-1.11A1 1 0 0 0 7.41.5h-.82a1 1 0 0 0-.93.64Z" />
        <Path d="M5.337 8.111A2 2 0 1 1 8.663 5.89 2 2 0 0 1 5.337 8.11Z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
