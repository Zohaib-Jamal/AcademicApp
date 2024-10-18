import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SendSVG = ({isLoading}:{isLoading:boolean}) => (
  <Svg
    viewBox="0 0 512 512"

  >
    <Path
      fill="none"
      stroke={isLoading ? "#000" : "#FF9C01"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M470.3 271.15 43.16 447.31a7.83 7.83 0 0 1-11.16-7V327a8 8 0 0 1 6.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 0 1-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 0 1 0 29.39z"
    />
  </Svg>
)
export default SendSVG
