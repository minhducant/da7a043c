import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const SvgComponent = ({tiny = false}) => (
  <Svg
    width={tiny ? normalize(16) : normalize(50)}
    height={tiny ? normalize(16) : normalize(50)}
    fill="none"
    viewBox="0 0 30 34">
    <Path
      fill="#E45651"
      d="M20.94.331c-.833.555-5.898 5.55-8.326 9.02-2.429-3.122-7.632-7.98-8.326-8.326-.347 0-2.775 2.428-3.816 3.47.555 2.22 5.32 8.556 7.632 11.447-1.388 1.735-5.55 10.06-6.591 12.836 1.04 1.04 5.55 3.816 7.285 4.857 1.734-1.388 5.897-9.02 6.938-10.06.694.693 8.326 4.856 10.06 5.203l4.163-4.163c-1.11-1.388-6.591-6.591-9.366-8.673 1.387-1.734 4.163-7.285 5.55-11.101 0-.278-3.469-3.47-5.203-4.51Z"
    />
  </Svg>
);
export default SvgComponent;
