import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const SvgComponent = ({tiny = false}) => (
  <Svg
    width={tiny ? normalize(16) : normalize(50)}
    height={tiny ? normalize(16) : normalize(50)}
    fill="none"
    viewBox="0 0 32 39">
    <Path
      fill="#257"
      fillRule="evenodd"
      d="M16.247 38.68c8.047 0 15.264-7.285 15.264-19.08C31.511 9.254 24.294.867 16.247.867S.983 9.254.983 19.6s5.55 19.08 15.264 19.08Zm0-10.06c3.449 0 6.245-4.038 6.245-9.02 0-4.981-2.796-9.02-6.245-9.02-3.448 0-6.244 4.039-6.244 9.02 0 4.982 2.796 9.02 6.244 9.02Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
