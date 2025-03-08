/** @format */

import { View, Text } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";

const TaskItem = () => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View className="flex-row items-center gap-2">
      <Checkbox
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? "#4630EB" : undefined}
      />
      <Text className="flex-1 text-xl">Task Title</Text>
    </View>
  );
};

export default TaskItem;
