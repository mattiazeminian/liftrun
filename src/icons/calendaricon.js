import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Colors from '../variables/colors';

export default function CalendarIcon({
  width = 20,
  height = 22,
  stroke = Colors.darkBlue,
  strokeWidth = 2,
  style,
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 22"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
