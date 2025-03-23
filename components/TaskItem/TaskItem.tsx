/** @format */

import { View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import Typography from "@/components/Typography/Typography";
import { ITask } from "./types";
import { Feather } from "expo-vector-icons";
import { colors } from "@/theme/colors";

const TaskItem = ({ title, isDone, isLast = false }: ITask) => {
  const [isChecked, setChecked] = useState(isDone);

  return (
    <View className="flex-1 flex-col gap-5">
      <View className="flex-row items-center gap-4">
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "green" : "gray"}
        />
        <Typography type="large" className="flex-1">
          {title}
        </Typography>
        <View className="flex-row items-center gap-2">
          <Feather name="more-vertical" size={24} color={colors.gray[400]} />
        </View>
      </View>
      {!isLast && <View className="h-[1px] w-full bg-gray-200" />}
    </View>
  );
};

export default TaskItem;
