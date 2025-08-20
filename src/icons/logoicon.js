import React from 'react';
import Svg, { G, Path, Circle, Defs, ClipPath, Rect } from 'react-native-svg';
import Colors from '../variables/colors';

export default function LogoIcon({
  width = 32,
  height = 32,
  fill = Colors.darkBlue,
  style,
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Defs>
        <ClipPath id="clip0">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0)">
        <Path
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM4.4028 12C4.4028 16.1958 7.80418 19.5972 12 19.5972C16.1958 19.5972 19.5972 16.1958 19.5972 12C19.5972 7.80418 16.1958 4.4028 12 4.4028C7.80418 4.4028 4.4028 7.80418 4.4028 12Z"
          fill={fill}
        />
        <Circle cx="12" cy="12" r="6" fill={fill} />
      </G>
    </Svg>
  );
}
