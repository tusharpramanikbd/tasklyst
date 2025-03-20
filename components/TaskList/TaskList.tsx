/** @format */

import { ScrollView } from "react-native";
import React, { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import useDBTaskManager from "@/hooks/useDBTaskManager";
import { useDateContext } from "@/contexts/DateContext";

const TaskList = () => {
  const { formattedDate } = useDateContext();
  const { taskLists, observeTasksByDate } = useDBTaskManager();

  useEffect(() => {
    observeTasksByDate(formattedDate);
  }, [formattedDate, observeTasksByDate]);

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
