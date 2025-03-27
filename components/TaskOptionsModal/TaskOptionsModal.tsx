/** @format */

import { Pressable, View } from "react-native";
import React from "react";
import CustomBottomSheetModal from "../BottomSheetModal/CustomBottomSheetModal";
import Typography from "../Typography/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface ITaskOptionsModal {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleCloseModal: () => void;
}

const TaskOptionsModal = ({
  bottomSheetModalRef,
  handleCloseModal,
}: ITaskOptionsModal) => {
  return (
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
        <Pressable className="p-2 rounded-md">
          <Typography type="xlarge" className="text-red">
            Delete
          </Typography>
        </Pressable>
      </View>
    </CustomBottomSheetModal>
  );
};

export default TaskOptionsModal;
