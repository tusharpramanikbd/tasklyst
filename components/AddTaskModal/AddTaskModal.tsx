/** @format */

import { View, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomBottomSheetModal from "../BottomSheetModal/CustomBottomSheetModal";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "../Typography/Typography";

interface IAddTaskModal {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleCloseBottomSheet: () => void;
}

const AddTaskModal = ({
  bottomSheetModalRef,
  handleCloseBottomSheet,
}: IAddTaskModal) => {
  const [taskName, setTaskName] = useState("");

  const handleCreateTask = () => {
    // TODO: Create task
    setTaskName("");
    handleCloseBottomSheet();
  };

  return (
    <CustomBottomSheetModal
      ref={bottomSheetModalRef}
      name="add-task-modal"
      onClose={handleCloseBottomSheet}
      headerProps={{
        title: "Create your task",
        onClose: handleCloseBottomSheet,
      }}
    >
      <View className="flex-1 gap-6 py-4 z-50">
        <BottomSheetTextInput
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Task Name"
          className="border border-gray-300 rounded-md p-2 px-4 min-h-16 text-xl no-underline"
        />
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
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
        </LinearGradient>
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
