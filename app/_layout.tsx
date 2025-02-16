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
import CustomHeader from "@/components/CustomHeader";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader title="Home" />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
