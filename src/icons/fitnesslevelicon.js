import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Colors from '../variables/colors';

export default function FitnessLevelIcon({
  width = 24,
  height = 24,
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
      <Path
        d="M22.5 21C22.5 21.8284 21.8284 22.5 21 22.5H18C17.1716 22.5 16.5 21.8284 16.5 21V4.5C16.5 3.67157 17.1716 3 18 3H21C21.8284 3 22.5 3.67157 22.5 4.5V21ZM18 19.5C18 20.3284 18.6716 21 19.5 21V21C20.3284 21 21 20.3284 21 19.5V6C21 5.17157 20.3284 4.5 19.5 4.5V4.5C18.6716 4.5 18 5.17157 18 6V19.5ZM15 21C15 21.8284 14.3284 22.5 13.5 22.5H10.5C9.67157 22.5 9 21.8284 9 21V10.5C9 9.67157 9.67157 9 10.5 9H13.5C14.3284 9 15 9.67157 15 10.5V21ZM7.5 21C7.5 21.8284 6.82843 22.5 6 22.5H3C2.17157 22.5 1.5 21.8284 1.5 21V15C1.5 14.1716 2.17157 13.5 3 13.5H6C6.82843 13.5 7.5 14.1716 7.5 15V21Z"
        fill={fill}
      />
    </Svg>
  );
}
