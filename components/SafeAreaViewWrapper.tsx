/** @format */

import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const SafeAreaViewWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaViewWrapper;
