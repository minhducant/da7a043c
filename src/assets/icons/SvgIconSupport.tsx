import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

function SvgComponent({
  fill,
  width = normalize(23),
  height = normalize(23),
}: any) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      //   fill="none"
      style={{}}>
      <Path
        fill="green"
        fillRule="evenodd"
        d="m.933 24.478.674 7.847c.133 2.462.366 3.853.773 6.278l.241 1.45c.607 3.696 4.063 7.6 9.243 7.031 5.101-.56 7.982-5.072 7.87-8.91-.112-3.79-.35-5.207-.85-8.197a451.97 451.97 0 0 1-.242-1.45c-.607-3.696-4.062-7.6-9.243-7.031a8.745 8.745 0 0 0-3.392 1.085C6.095 14.167 12.647 6.003 24 6.003c11.354 0 17.905 8.164 17.992 16.579a8.745 8.745 0 0 0-3.391-1.086c-5.18-.57-8.637 3.335-9.243 7.03l-.242 1.45v.001c-.5 2.99-.738 4.407-.85 8.197-.112 3.838 2.769 8.35 7.87 8.91 5.18.57 8.636-3.335 9.243-7.03l.241-1.451c.406-2.424.639-3.815.772-6.274v-.005l.675-7.846.001-.016C48.008 12.677 39.13.86 24 .86 8.871.86-.008 12.677.932 24.462l.001.016Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default SvgComponent;
