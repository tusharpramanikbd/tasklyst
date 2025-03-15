/** @format */
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import React from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import CustomHeader from "@/components/Headers/CustomHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <ThemeProvider value={DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                header: () => <CustomHeader />,
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default RootLayout;
