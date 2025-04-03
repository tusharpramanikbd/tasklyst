/** @format */

import React from "react";
import { Pressable, View } from "react-native";
import CustomBottomSheetModal from "./BaseModal/CustomBottomSheetModal";
import Typography from "@/components/shared/Typography/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ConfirmPopup from "@/components/shared/Popups/ConfirmPopup";
import EditPopup from "@/components/shared/Popups/EditPopup";
import useTaskOptions from "@/hooks/useTaskOptions";

interface ITaskOptionsModal {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleCloseModal: () => void;
  taskId: string;
  taskName: string;
  isDone: boolean;
}

const TaskOptionsModal = ({
  bottomSheetModalRef,
  handleCloseModal,
  taskId,
  taskName,
  isDone,
}: ITaskOptionsModal) => {
  const {
    isConfirmPopupVisible,
    isEditPopupVisible,
    handleDeleteTask,
    handleEditTask,
    setIsConfirmPopupVisible,
    setIsEditPopupVisible,
    handleMoveTaskToNextDay,
  } = useTaskOptions({ taskId, handleCloseModal });

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
        snapPoints={[270]}
      >
        <View className="flex-1 justify-center items-center gap-4">
          <Pressable
            className="p-2 rounded-md"
            onPress={() => setIsEditPopupVisible(true)}
            disabled={isDone}
          >
            <Typography
              type="xlarge"
              className={`${isDone ? "text-gray-300" : ""}`}
            >
              Edit
            </Typography>
          </Pressable>
          <Pressable
            className="p-2 rounded-md"
            onPress={() => handleMoveTaskToNextDay(taskName, taskId)}
            disabled={isDone}
          >
            <Typography
              type="xlarge"
              className={`${isDone ? "text-gray-300" : ""}`}
            >
              Move to next day
            </Typography>
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
