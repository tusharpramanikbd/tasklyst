/** @format */

import { ScrollView } from "react-native";
import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import useDBTaskManager from "@/hooks/useDBTaskManager";

const TaskList = () => {
  const { taskLists } = useDBTaskManager();

  return (
    <ScrollView
      bounces={false}
      contentContainerClassName="gap-8"
      showsVerticalScrollIndicator={false}
    >
      {taskLists?.map((task) => <TaskItem key={task.id} {...task} />)}
    </ScrollView>
  );
};

export default TaskList;
