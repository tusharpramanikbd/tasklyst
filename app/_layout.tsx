/** @format */
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@hooks/useColorScheme";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
