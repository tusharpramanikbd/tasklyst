/** @format */

import { View } from "react-native";
import React from "react";
import { FontAwesome } from "expo-vector-icons";
import Typography from "@/components/Typography/Typography";
import LinearGradientWrapper from "../LinearGradientWrapper/LinearGradientWrapper";

const EmptyState = () => {
  return (
    <View className="flex-1 items-center justify-center gap-6">
      <LinearGradientWrapper
        style={{
          padding: 16,
          borderRadius: 8,
        }}
      >
        <FontAwesome name="tasks" size={110} color="white" />
      </LinearGradientWrapper>
      <Typography type="large" className="text-center !font-bold text-gray-600">
        No tasks for this date
      </Typography>
    </View>
  );
};

export default EmptyState;
