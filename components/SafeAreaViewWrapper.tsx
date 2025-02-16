/** @format */

import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface SafeAreaViewWrapperProps {
  children: ReactNode;
}

const SafeAreaViewWrapper = ({ children }: SafeAreaViewWrapperProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaViewWrapper;
