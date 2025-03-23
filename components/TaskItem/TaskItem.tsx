/** @format */

import { Pressable, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import Typography from "@/components/Typography/Typography";
import { ITask } from "./types";
import { Feather } from "expo-vector-icons";
import { colors } from "@/theme/colors";

const TaskItem = ({
  title,
  isDone,
  isLast = false,
  isDisabled = false,
}: ITask) => {
  const [isChecked, setChecked] = useState(isDone);

  const handleOptionPress = () => {
    console.log("option pressed");
  };

  return (
    <View className="flex-1 flex-col gap-5">
      <View className="flex-row items-center gap-4">
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? colors.secondary : colors.gray[400]}
          disabled={isDisabled}
        />
        <Typography
          type="large"
          className={`flex-1 ${isChecked ? "!line-through text-gray-500" : ""}`}
        >
          {title}
        </Typography>
        <Pressable
          className="flex-row items-center gap-2"
          onPress={handleOptionPress}
          disabled={isDisabled}
        >
          <Feather name="more-vertical" size={24} color={colors.gray[400]} />
        </Pressable>
      </View>
      {!isLast && <View className="h-[1px] w-full bg-gray-200" />}
    </View>
  );
};

export default TaskItem;
