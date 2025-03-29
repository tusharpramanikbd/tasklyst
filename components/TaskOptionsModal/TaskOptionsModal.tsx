/** @format */

import { Pressable, View } from "react-native";
import React, { useState } from "react";
import CustomBottomSheetModal from "../BottomSheetModal/CustomBottomSheetModal";
import Typography from "../Typography/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useDBTaskManager from "@/hooks/useDBTaskManager";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import EditPopup from "../EditPopup/EditPopup";

interface ITaskOptionsModal {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleCloseModal: () => void;
  taskId: string;
  taskName: string;
}

const TaskOptionsModal = ({
  bottomSheetModalRef,
  handleCloseModal,
  taskId,
  taskName,
}: ITaskOptionsModal) => {
  const [isConfirmPopupVisible, setIsConfirmPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);

  const { deleteTask, updateTask } = useDBTaskManager();

  const handleDeleteTask = async () => {
    await deleteTask(taskId);
    setIsConfirmPopupVisible(false);
    handleCloseModal();
  };

  const handleEditTask = async (newTaskName: string) => {
    await updateTask(taskId, newTaskName);
    setIsEditPopupVisible(false);
    handleCloseModal();
  };

  return (
    <>
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        name="task-options-modal"
        onClose={handleCloseModal}
        headerProps={{
          title: "Options",
          onClose: handleCloseModal,
        }}
        snapPoints={[200]}
      >
        <View className="flex-1 justify-center items-center gap-4">
          <Pressable
            className="p-2 rounded-md"
            onPress={() => setIsEditPopupVisible(true)}
          >
            <Typography type="xlarge">Edit</Typography>
          </Pressable>
          <Pressable
            className="p-2 rounded-md"
            onPress={() => setIsConfirmPopupVisible(true)}
          >
            <Typography type="xlarge" className="text-red">
              Delete
            </Typography>
          </Pressable>
        </View>
      </CustomBottomSheetModal>
      <ConfirmPopup
        isVisible={isConfirmPopupVisible}
        onClose={() => setIsConfirmPopupVisible(false)}
        onConfirm={handleDeleteTask}
      />
      <EditPopup
        isVisible={isEditPopupVisible}
        onClose={() => setIsEditPopupVisible(false)}
        onDone={handleEditTask}
        taskName={taskName}
      />
    </>
  );
};

export default TaskOptionsModal;
