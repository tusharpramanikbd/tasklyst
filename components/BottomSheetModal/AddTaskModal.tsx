/** @format */

import { View, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomBottomSheetModal from "./BaseModal/CustomBottomSheetModal";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Typography from "@/components/Typography/Typography";
import LinearGradientWrapper from "@/components/LinearGradientWrapper/LinearGradientWrapper";
import { useDateContext } from "@/contexts/DateContext";
import { useDBContext } from "@/contexts/DBContext";

interface IAddTaskModal {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleCloseBottomSheet: () => void;
}

const AddTaskModal = ({
  bottomSheetModalRef,
  handleCloseBottomSheet,
}: IAddTaskModal) => {
  const [taskName, setTaskName] = useState("");
  const { formattedDate } = useDateContext();
  const { addTask } = useDBContext();

  const handleCreateTask = async () => {
    await addTask(taskName, formattedDate);

    setTaskName("");
    handleCloseBottomSheet();
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
            className="p-2 rounded-md"
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
