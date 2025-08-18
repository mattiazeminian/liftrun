import React from 'react';
import Svg, { Path } from 'react-native-svg';

import Colors from '../variables/colors';

export default function ArrowLeft({
  width = 24,
  height = 24,
  stroke = Colors.darkBlue,
  style,
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.6667 8H3.33337M3.33337 8L8.00004 12.6667M3.33337 8L8.00004 3.33333"
        stroke={stroke}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
