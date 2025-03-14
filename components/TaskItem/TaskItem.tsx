/** @format */

import { View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import Typography from "@/components/Typography/Typography";

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

const TaskItem = ({ title, isCompleted }: Task) => {
  const [isChecked, setChecked] = useState(isCompleted);

  return (
    <View className="flex-row items-center gap-2">
      <Checkbox
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? "green" : "gray"}
      />
      <Typography type="large" className="flex-1">
        {title}
      </Typography>
    </View>
  );
};

export default TaskItem;
