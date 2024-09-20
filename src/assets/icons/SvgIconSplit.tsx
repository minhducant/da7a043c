import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const SvgComponent = ({fill = '#323232'}) => (
  <Svg
    width={normalize(26)}
    height={normalize(26)}
    fill="none"
    viewBox="0 0 24 24">
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M16.707 7.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414-1.414l8-8a1 1 0 0 1 1.414 0ZM9 10.01a1 1 0 0 1-1-1V9a1 1 0 1 1 2 0v.01a1 1 0 0 1-1 1Zm5 5a1 1 0 1 0 2 0V15a1 1 0 1 0-2 0v.01ZM7.25 2.388C8.55 2.099 10.124 2 12 2s3.451.1 4.75.388c1.31.291 2.399.788 3.236 1.626.838.837 1.335 1.926 1.626 3.236C21.901 8.55 22 10.124 22 12s-.1 3.451-.388 4.75c-.291 1.31-.788 2.399-1.626 3.236-.837.838-1.926 1.335-3.236 1.626-1.299.289-2.874.388-4.75.388s-3.451-.1-4.75-.388c-1.31-.291-2.399-.788-3.236-1.626-.838-.837-1.335-1.926-1.626-3.236C2.099 15.45 2 13.876 2 12s.1-3.451.388-4.75c.291-1.31.788-2.399 1.626-3.236.837-.838 1.926-1.335 3.236-1.626Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
