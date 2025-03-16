/** @format */

import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
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
          placeholder="Task Name"
          className="border border-gray-300 rounded-md p-2 px-4 min-h-16 text-xl no-underline"
        />
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Pressable
            className="bg-primary p-2 rounded-md"
            onPress={handleCloseBottomSheet}
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
