/** @format */

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { Platform } from "react-native";

export const useGetHeaderHeight = () => {
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(
    {
      height: 0,
      width: 0,
    },
    Platform.OS === "ios",
    insets.top,
  );

  return headerHeight;
};
