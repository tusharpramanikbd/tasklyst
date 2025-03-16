/** @format */

import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import LinearGradientWrapper from "../LinearGradientWrapper/LinearGradientWrapper";

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
    <Wrapper className={`flex-1 ${className}`}>
      <StatusBar style="light" />
      <LinearGradientWrapper style={{ flex: 1 }}>
        {children}
      </LinearGradientWrapper>
    </Wrapper>
  );
};

export default ViewWrapper;
