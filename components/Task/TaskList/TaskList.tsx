/** @format */

import { ScrollView, View } from "react-native";
import React from "react";
import TaskItem from "@/components/Task/TaskItem/TaskItem";
import { useDateContext } from "@/contexts/DateContext";
import EmptyState from "@/components/EmptyState/EmptyState";
import { useDBContext } from "@/contexts/DBContext";

const TaskList = () => {
  const { isPastDates } = useDateContext();
  const { taskLists } = useDBContext();

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
