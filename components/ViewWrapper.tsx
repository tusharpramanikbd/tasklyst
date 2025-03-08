/** @format */

import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    </Wrapper>
  );
};

export default ViewWrapper;
