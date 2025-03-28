/** @format */

import { Pressable, View } from "react-native";
import React, { useState } from "react";
import CustomBottomSheetModal from "../BottomSheetModal/CustomBottomSheetModal";
import Typography from "../Typography/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useDBTaskManager from "@/hooks/useDBTaskManager";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";

interface ITaskOptionsModal {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleCloseModal: () => void;
  taskId: string;
}

const TaskOptionsModal = ({
  bottomSheetModalRef,
  handleCloseModal,
  taskId,
}: ITaskOptionsModal) => {
  const [isConfirmPopupVisible, setIsConfirmPopupVisible] = useState(false);

  const { deleteTask } = useDBTaskManager();

  const handleDeleteTask = async () => {
    await deleteTask(taskId);
    setIsConfirmPopupVisible(false);
    handleCloseModal();
  };

  return (
    <>
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        name="task-options-modal"
        onClose={handleCloseModal}
        headerProps={{
          title: "Task Options",
          onClose: handleCloseModal,
        }}
        snapPoints={[150]}
      >
        <View className="flex-1 justify-center items-center">
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
    </>
  );
};

export default TaskOptionsModal;
