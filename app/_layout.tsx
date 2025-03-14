/** @format */
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import React from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import CustomHeader from "@/components/Headers/CustomHeader";

const RootLayout = () => {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
