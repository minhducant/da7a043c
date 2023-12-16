import * as React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

const {width} = Dimensions.get('screen');

const SvgComponent = () => (
  <Svg width={500} height={normalize(100)} fill="none">
    <Path fill="#fff" d="M0 0h295v100H0V0Z" />
    <Path
      fill="#FEDAE4"
      d="M60.125 24.63s4.541 1.164 4.163 8.12c0 0-28.644 2.216-31.578 20.696l-2.657-8.121s7.983-21.081 30.072-20.696Z"
    />
    <Path
      fill="#BACCD0"
      d="M189.371 49.84c-1.109 0-1.759-2.603-4.314-5.89-.764-.981 6.415-9.124 7.303-10.061 3.343-3.527 5.926-3.984 10.697-4.889a24.655 24.655 0 0 0 .063 8.76c-.042-.22-.176-.32-.384-.32-1.844 0-9.496 7.84-9.841 8.378-1.632 2.54-2.557 3.735-3.261 3.976a.806.806 0 0 1-.263.046Z"
    />
    <Path
      fill="#FEDFE2"
      d="M249.444 45.29c-3.3-1.376-5.696-3.977-8.727-5.777-3.238-1.923-6.886-2.955-9.807-5.436-2.092-1.777-2.485-2.546-2.891-5.035-.229-1.402 1.667-7.23.857-8.042 2.866 2.87 6.696 4.083 9.908 6.312 4.277 2.97 7.897 6.586 12.468 9.24l-1.808 8.739Z"
    />
    <Path
      fill="#99D2CC"
      d="M21.125 85.896a4.95 4.95 0 1 1-.35-9.892 4.95 4.95 0 0 1 .35 9.892Z"
    />
    <Path
      fill="#BDB5D5"
      d="M103.221 16.081a5.043 5.043 0 1 1-.357-10.079 5.043 5.043 0 0 1 .357 10.08Z"
    />
    <Path
      fill="#FCD767"
      d="M261.356 54.55a2.276 2.276 0 1 1-.161-4.55 2.276 2.276 0 0 1 .161 4.55Z"
    />
  </Svg>
);
export default SvgComponent;