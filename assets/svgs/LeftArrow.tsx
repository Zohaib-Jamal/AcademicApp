import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = ({ color }: { color: string }) => (
  <Svg viewBox="0 0 512 512">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={48}
      d="M244 400 100 256l144-144M120 256h292"
    />
  </Svg>
);
export default SvgComponent;
