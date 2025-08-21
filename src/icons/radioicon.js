import React from 'react';
import Svg, { Rect, Circle } from 'react-native-svg';

import Colors from '../variables/colors';

export default function RadioIcon({
  width = 16,
  height = 16,
  fill = 'white',
  stroke = Colors.grey600,
  circleFill = Colors.grey600,
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
      <Rect x={1} y={1} width={14} height={14} rx={7} fill={fill} />
      <Rect
        x={1}
        y={1}
        width={14}
        height={14}
        rx={7}
        stroke={stroke}
        strokeWidth={2}
      />
      <Circle cx={8} cy={8} r={4} fill={circleFill} />
    </Svg>
  );
}
