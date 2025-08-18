import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Colors from '../variables/colors';

export default function IdIcon({
  width = 22,
  height = 20,
  stroke = Colors.darkBlue,
  strokeWidth = 2,
  style,
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 22 20"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      xmlns="http://www.w3.org/2000/svg" // opzionale
    >
      <Path d="M13 1.5H9C5.229 1.5 3.343 1.5 2.172 2.672C1.001 3.844 1 5.729 1 9.5V10.5C1 14.271 1 16.157 2.172 17.328C3.344 18.499 5.229 18.5 9 18.5H13C16.771 18.5 18.657 18.5 19.828 17.328C20.999 16.156 21 14.271 21 10.5V9.5C21 5.729 21 3.843 19.828 2.672C18.656 1.501 16.771 1.5 13 1.5Z" />
      <Path d="M4 14C5.036 11.419 8.896 11.25 10 14M13 6.5H18M13 10H18M13 13.5H15.5M8.75 7.75C8.75 8.21413 8.56563 8.65925 8.23744 8.98744C7.90925 9.31563 7.46413 9.5 7 9.5C6.53587 9.5 6.09075 9.31563 5.76256 8.98744C5.43437 8.65925 5.25 8.21413 5.25 7.75C5.25 7.28587 5.43437 6.84075 5.76256 6.51256C6.09075 6.18437 6.53587 6 7 6C7.46413 6 7.90925 6.18437 8.23744 6.51256C8.56563 6.84075 8.75 7.28587 8.75 7.75Z" />
    </Svg>
  );
}
