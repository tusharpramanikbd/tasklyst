/** @format */

import { View, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomBottomSheetModal from "../BottomSheetModal/CustomBottomSheetModal";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Typography from "../Typography/Typography";
import LinearGradientWrapper from "../LinearGradientWrapper/LinearGradientWrapper";
import { useDateContext } from "@/contexts/DateContext";
import db from "@/database";
import { Q } from "@nozbe/watermelondb";
import { TaskDocType, TaskType } from "@/database/models/types";

interface IAddTaskModal {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleCloseBottomSheet: () => void;
}

const AddTaskModal = ({
  bottomSheetModalRef,
  handleCloseBottomSheet,
}: IAddTaskModal) => {
  const [taskName, setTaskName] = useState("");
  const { date } = useDateContext();

  const handleCreateTask = async () => {
    const dateTimestamp = new Date(date).getTime();

    try {
      const taskDocsCollection = db.get<TaskDocType>("task_docs");
      const tasksCollection = db.get<TaskType>("tasks");

      console.log("Task doc collection:", taskDocsCollection.query().fetch());

      await db.write(async () => {
        const existingTaskDoc = await taskDocsCollection
          .query(Q.where("task_date", Q.eq(dateTimestamp)))
          .fetch();

        let taskDoc;
        if (existingTaskDoc.length === 0) {
          taskDoc = await taskDocsCollection.create((taskDoc) => {
            taskDoc.taskDate = dateTimestamp;
          });
        } else {
          taskDoc = existingTaskDoc[0];
        }

        const newTask = await tasksCollection.create((task) => {
          task.title = taskName;
          task.isDone = false;
          task.createdAt = Date.now();
          task.taskDoc.set(taskDoc);
        });

        console.log("Created new task:", newTask);
      });

      setTaskName("");
      handleCloseBottomSheet();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleCloseModal = () => {
    setTaskName("");
    handleCloseBottomSheet();
  };

  return (
    <CustomBottomSheetModal
      ref={bottomSheetModalRef}
      name="add-task-modal"
      onClose={handleCloseModal}
      headerProps={{
        title: "Create your task",
        onClose: handleCloseModal,
      }}
    >
      <View className="flex-1 gap-6 py-4 z-50">
        <BottomSheetTextInput
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Task Name"
          className="border border-gray-300 rounded-md p-2 px-4 min-h-16 text-xl no-underline"
        />
        <LinearGradientWrapper
          style={[styles.button, { opacity: taskName.length === 0 ? 0.5 : 1 }]}
        >
          <Pressable
            className="bg-primary p-2 rounded-md"
            onPress={handleCreateTask}
            disabled={taskName.length === 0}
          >
            <Typography type="large" className="text-white">
              Create
            </Typography>
          </Pressable>
        </LinearGradientWrapper>
      </View>
    </CustomBottomSheetModal>
  );
};

export default AddTaskModal;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
