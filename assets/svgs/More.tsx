import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const More = (props: SvgProps) => (
  <Svg
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      fill="none"
      stroke="#FF9C01"
      strokeMiterlimit={10}
      strokeWidth={20}
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
    />
    <Path
      fill="none"
      stroke="#FF9C01"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={20}
      d="M256 176v160m80-80H176"
    />
  </Svg>
)
export default More
