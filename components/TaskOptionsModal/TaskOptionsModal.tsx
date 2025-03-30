/** @format */

import React from "react";
import { Pressable, View } from "react-native";
import CustomBottomSheetModal from "../BottomSheetModal/CustomBottomSheetModal";
import Typography from "../Typography/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ConfirmPopup from "../Popups/ConfirmPopup";
import EditPopup from "../Popups/EditPopup";
import useTaskOptions from "@/hooks/useTaskOptions";

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
  const {
    isConfirmPopupVisible,
    isEditPopupVisible,
    handleDeleteTask,
    handleEditTask,
    setIsConfirmPopupVisible,
    setIsEditPopupVisible,
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
