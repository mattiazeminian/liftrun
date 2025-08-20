import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Colors from '../variables/colors';

export default function ChevronRight({
  width = 8,
  height = 12,
  fill = Colors.darkBlue,
  style,
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 8 12"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.5 11L6.5 6L1.5 1"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
