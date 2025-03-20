/** @format */

import { ScrollView } from "react-native";
import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import { ITask } from "../TaskItem/types";

const taskList: ITask[] = [
  {
    id: 1,
    title: "Task 1",
    isDone: false,
  },
  {
    id: 2,
    title: "Task 2",
    isDone: true,
  },
  {
    id: 3,
    title: "Task 3",
    isDone: false,
  },
  {
    id: 4,
    title: "Task 4",
    isDone: true,
  },
  {
    id: 5,
    title: "Task 5",
    isDone: false,
  },
  {
    id: 6,
    title: "Task 6",
    isDone: true,
  },
  {
    id: 7,
    title: "Task 7",
    isDone: false,
  },
  {
    id: 8,
    title: "Task 8",
    isDone: true,
  },
  {
    id: 9,
    title: "Task 9",
    isDone: false,
  },
  {
    id: 10,
    title: "Task 10",
    isDone: true,
  },
];

const TaskList = () => {
  return (
    <ScrollView
      bounces={false}
      contentContainerClassName="gap-8"
      showsVerticalScrollIndicator={false}
    >
      {taskList?.map((task) => <TaskItem key={task.id} {...task} />)}
    </ScrollView>
  );
};

export default TaskList;
