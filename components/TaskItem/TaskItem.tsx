/** @format */

import { View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import Typography from "@/components/Typography/Typography";
import { ITask } from "./types";

const TaskItem = ({ title, isDone }: ITask) => {
  const [isChecked, setChecked] = useState(isDone);

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
