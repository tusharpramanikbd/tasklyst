/** @format */

import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import useDBTaskManager from "@/hooks/useDBTaskManager";
import { useDateContext } from "@/contexts/DateContext";
import EmptyState from "../EmptyState/EmptyState";

const TaskList = () => {
  const { formattedDate, isPastDates } = useDateContext();
  const { taskLists, observeTasksByDate } = useDBTaskManager();

  useEffect(() => {
    observeTasksByDate(formattedDate);
  }, [formattedDate, observeTasksByDate]);

  return (
    <View className="flex-1">
      {taskLists?.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView
          bounces={false}
          contentContainerClassName="gap-5"
          showsVerticalScrollIndicator={false}
        >
          {taskLists?.map((task, index) => (
            <TaskItem
              key={task.id}
              {...task}
              isLast={index === taskLists.length - 1}
              isDisabled={isPastDates}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TaskList;
