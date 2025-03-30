/** @format */

import { TextProps } from "react-native";

type TypographyType = "small" | "regular" | "large" | "xlarge" | "xxlarge";

export interface ITypography extends TextProps {
  type?: TypographyType;
  className?: string;
}
