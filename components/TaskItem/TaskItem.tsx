/** @format */

import { View, Text } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";

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
      <Text className="flex-1 text-xl">{title}</Text>
    </View>
  );
};

export default TaskItem;
