/** @format */

import { ViewStyle, StyleProp } from "react-native";
import React from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { colors as themeColors } from "@/theme/colors";

interface ILinearGradientWrapper extends Omit<LinearGradientProps, "colors"> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: readonly [string, string, ...string[]];
}

const LinearGradientWrapper = ({
  children,
  style,
  colors = [themeColors.primary, themeColors.secondary],
  locations = [0, 1],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}: ILinearGradientWrapper) => {
  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      end={end}
      style={[style]}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientWrapper;
