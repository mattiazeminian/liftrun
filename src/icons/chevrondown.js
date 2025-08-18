import React from 'react';
import Svg, { Path } from 'react-native-svg';

import Colors from '../variables/colors';

export default function ChevronDown({
  width = 16,
  height = 16,
  fill = Colors.darkBlue,
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
        d="M4.5 6L8.5 10L12.5 6"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
