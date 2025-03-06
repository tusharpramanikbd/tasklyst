/** @format */

import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

interface ViewWrapperProps {
  children: ReactNode;
  className?: string;
  enableSafeArea?: boolean;
}

const ViewWrapper = ({
  children,
  className = "",
  enableSafeArea = false,
}: ViewWrapperProps) => {
  const Wrapper = enableSafeArea ? SafeAreaView : View;

  return (
    <Wrapper className={`flex-1 bg-white ${className}`}>
      <StatusBar style="light" />
      {children}
    </Wrapper>
  );
};

export default ViewWrapper;
