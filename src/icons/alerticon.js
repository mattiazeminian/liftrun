import React from 'react';
import Colors from '../variables/colors';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export default function AlertIcon({
  width = 16,
  height = 16,
  fill = Colors.error,
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
      <Defs>
        <ClipPath id="clip0_70_162">
          <Rect width={16} height={16} fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_70_162)">
        <Path
          d="M7.99998 5.33334V8.00001M7.99998 10.6667H8.00665M14.6666 8.00001C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8.00001C1.33331 4.31811 4.31808 1.33334 7.99998 1.33334C11.6819 1.33334 14.6666 4.31811 14.6666 8.00001Z"
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
