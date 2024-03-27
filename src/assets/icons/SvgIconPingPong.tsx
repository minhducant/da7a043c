import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const SvgComponent = () => (
  <Svg width={normalize(22)} height={normalize(22)} viewBox="0 0 24 24">
    <Path d="M17.75 9.21A3.25 3.25 0 1 0 21 12.46a3.26 3.26 0 0 0-3.25-3.25Zm0 5a1.75 1.75 0 1 1 1.75-1.75 1.76 1.76 0 0 1-1.75 1.75ZM1 2h2.5a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2ZM7.5 2H10a1 1 0 0 0 0-2H7.5a1 1 0 0 0 0 2ZM14 2h2.5a1 1 0 0 0 0-2H14a1 1 0 0 0 0 2ZM20.5 2H23a1 1 0 0 0 0-2h-2.5a1 1 0 0 0 0 2ZM4.5 4a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2.5a1 1 0 0 0 1-1ZM14 5h2.5a1 1 0 0 0 0-2H14a1 1 0 0 0 0 2ZM23 3h-2.5a1 1 0 0 0 0 2H23a1 1 0 0 0 0-2ZM23 6h-2.5a1 1 0 0 0 0 2H23a1 1 0 0 0 0-2ZM10 21a1.51 1.51 0 0 0 1.06-.44l3.82-3.82a1 1 0 0 0 0-1.41 1 1 0 0 0-1.42 0L10 18.79 5.2 14a1 1 0 0 0-1.41 1.41l5.15 5.15A1.51 1.51 0 0 0 10 21ZM14.5 22H6a1 1 0 0 0 0 2h8.5a1 1 0 0 0 0-2Z" />
  </Svg>
);
export default SvgComponent;
