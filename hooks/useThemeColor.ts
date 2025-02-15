/** @format */

import { useColorScheme } from "react-native";

import { theme } from "@constants/theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof theme.light & keyof typeof theme.dark,
) {
  const colorMode = useColorScheme() || "light";
  const colorFromProps = props[colorMode];

  if (colorFromProps) {
    return colorFromProps;
  }

  return theme[colorMode][colorName];
}
