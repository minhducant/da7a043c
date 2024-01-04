import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const SvgComponent = () => (
  <Svg
    width={normalize(27)}
    height={normalize(27)}
    viewBox="0 0 472.396 472.396">
    <Path d="M466.105 221.012 346.041 100.946c-6.168-6.136-15.389-7.959-23.394-4.648-8.021 3.341-13.247 11.135-13.247 19.823v52.452H153.713c-15.783.016-28.604 12.822-28.604 28.589v78.049c0 15.769 12.82 28.56 28.619 28.56H309.4v52.483a21.49 21.49 0 0 0 13.247 19.853 21.512 21.512 0 0 0 23.394-4.677l120.065-120.067c8.386-8.384 8.386-21.966-.001-30.351zM79.872 168.605h-8.021c-13.292 0-24.061 10.77-24.061 24.063v87.071c0 13.291 10.769 24.063 24.061 24.063h8.021c13.292 0 24.062-10.771 24.062-24.063v-87.071c0-13.292-10.77-24.063-24.062-24.063zM15.555 167.496C6.958 167.496 0 174.454 0 183.052v106.319c0 8.597 6.958 15.555 15.555 15.555 8.598 0 15.556-6.958 15.556-15.555V183.052c-.001-8.598-6.959-15.556-15.556-15.556z" />
  </Svg>
);
export default SvgComponent;