/** @format */
import React from "react";
import { View } from "react-native";
import ViewWrapper from "@/components/shared/Wrappers/ViewWrapper";
import AddTaskButton from "@/components/Task/AddTaskButton/AddTaskButton";
import useCustomBottomSheetModal from "@/hooks/useCustomBottomSheetModal";
import AddTaskModal from "@/components/shared/BottomSheetModal/AddTaskModal";
import TaskList from "@/components/Task/TaskList/TaskList";
import { DBProvider } from "@/contexts/DBContext";

export default function Home() {
  const { handleOpenBottomSheet, handleCloseBottomSheet, bottomSheetModalRef } =
    useCustomBottomSheetModal();

  return (
    <DBProvider>
      <ViewWrapper>
        <View className="flex-1 bg-white m-8 mt-4 rounded-lg p-6 overflow-hidden">
          <TaskList />
          <AddTaskButton onPress={handleOpenBottomSheet} />
        </View>
      </ViewWrapper>
      <AddTaskModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    </DBProvider>
  );
}
