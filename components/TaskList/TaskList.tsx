/** @format */

import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import useDBTaskManager from "@/hooks/useDBTaskManager";
import { useDateContext } from "@/contexts/DateContext";
import EmptyState from "../EmptyState/EmptyState";

const TaskList = () => {
  const { formattedDate } = useDateContext();
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
            <>
              <TaskItem key={task.id} {...task} />
              {index !== taskLists.length - 1 && (
                <View className="h-[1px] w-full bg-gray-200" />
              )}
            </>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TaskList;
