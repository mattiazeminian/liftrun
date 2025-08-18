// icons/CheckIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CheckIcon({
  width = 12,
  height = 12,
  fill = 'white',
  style,
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10 3L4.5 8.5L2 6"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
