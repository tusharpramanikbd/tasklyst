/** @format */

import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Tasklyst",
  slug: "tasklyst",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  scheme: "tasklyst-app",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.tusharpramanikbd.tasklyst",
    icon: "./assets/icon.png",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#C4C3E3",
    },
    package: "com.tusharpramanikbd.tasklyst",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#C4C3E3",
        image: "./assets/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
      },
    ],
  ],
  jsEngine: "hermes",
});
