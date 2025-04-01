/** @format */

import { Pressable, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import Typography from "@/components/shared/Typography/Typography";
import { ITask } from "./types";
import { Feather } from "expo-vector-icons";
import { colors } from "@/theme/colors";
import TaskOptionsModal from "@/components/shared/BottomSheetModal/TaskOptionsModal";
import useCustomBottomSheetModal from "@/hooks/useCustomBottomSheetModal";
import { useDBContext } from "@/contexts/DBContext";

const TaskItem = ({
  title,
  isDone,
  isLast = false,
  isDisabled = false,
  id,
}: ITask) => {
  const { updateTask } = useDBContext();
  const { handleOpenBottomSheet, handleCloseBottomSheet, bottomSheetModalRef } =
    useCustomBottomSheetModal();

  const handleOptionPress = () => {
    handleOpenBottomSheet();
  };

  const handleCheckboxPress = async () => {
    await updateTask({
      taskId: id,
      isDone: !isDone,
    });
  };

  return (
    <>
      <View className="flex-1 flex-col gap-5">
        <View className="flex-row items-center gap-4">
          <Checkbox
            value={isDone}
            onValueChange={handleCheckboxPress}
            color={isDone ? colors.secondary : colors.gray[400]}
            disabled={isDisabled}
          />
          <Typography
            type="large"
            className={`flex-1 ${isDone ? "!line-through text-gray-500" : ""} ${
              isDisabled ? "text-gray-400" : ""
            }`}
          >
            {title}
          </Typography>
          <Pressable
            className="flex-row items-center gap-2"
            onPress={handleOptionPress}
            disabled={isDisabled}
          >
            <Feather name="more-vertical" size={24} color={colors.gray[400]} />
          </Pressable>
        </View>
        {!isLast && <View className="h-[1px] w-full bg-gray-200" />}
      </View>
      <TaskOptionsModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleCloseModal={handleCloseBottomSheet}
        taskId={id}
        taskName={title}
        isDone={isDone}
      />
    </>
  );
};

export default TaskItem;
