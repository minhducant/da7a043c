import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const SvgComponent = () => (
  <Svg width={normalize(26)} height={normalize(26)}>
    <Path d="M8.69 14.84a.25.25 0 0 0 .15.05h6.33a.27.27 0 0 0 .15-.05L23 9.08a.26.26 0 0 0 .1-.2.23.23 0 0 0-.11-.2l-10.13-7a1.5 1.5 0 0 0-1.72 0L1 8.67a.26.26 0 0 0-.1.2.22.22 0 0 0 .1.21Z" />
    <Path d="M17.08 15.39a.28.28 0 0 0-.1.21.29.29 0 0 0 .11.2l3.33 2.2a.75.75 0 1 1-.83 1.24l-4.25-2.83a.25.25 0 0 0-.14 0H8.8a.25.25 0 0 0-.14 0l-4.24 2.85A.75.75 0 1 1 3.59 18l3.32-2.2a.24.24 0 0 0 .09-.2.25.25 0 0 0-.1-.21L.4 10.5a.23.23 0 0 0-.26 0 .24.24 0 0 0-.14.2v9.94a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-9.93a.24.24 0 0 0-.14-.23.25.25 0 0 0-.26 0Z" />
  </Svg>
);
export default SvgComponent;
