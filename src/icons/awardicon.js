import React from 'react';
import Svg, { Path } from 'react-native-svg';

import Colors from '../variables/colors';

export default function AwardIcon({
  width = 24,
  height = 24,
  stroke = Colors.darkBlue,
  strokeWidth = 2,
  style,
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg" // opzionale, non sempre necessario
    >
      <Path
        d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88M19 8C19 11.866 15.866 15 12 15C8.13401 15 5 11.866 5 8C5 4.13401 8.13401 1 12 1C15.866 1 19 4.13401 19 8Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
