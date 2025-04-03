/** @format */

import { useDBContext } from "@/contexts/DBContext";
import { useState } from "react";

interface IUseTaskOptions {
  taskId: string;
  handleCloseModal: () => void;
}

const useTaskOptions = ({ taskId, handleCloseModal }: IUseTaskOptions) => {
  const [isConfirmPopupVisible, setIsConfirmPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);

  const { deleteTask, updateTask, moveTaskToNextDay } = useDBContext();

  const handleDeleteTask = async () => {
    await deleteTask(taskId);
    setIsConfirmPopupVisible(false);
    handleCloseModal();
  };

  const handleEditTask = async (newTaskName: string) => {
    await updateTask({
      taskId,
      taskName: newTaskName,
    });
    setIsEditPopupVisible(false);
    handleCloseModal();
  };

  const handleMoveTaskToNextDay = async (taskTitle: string, taskId: string) => {
    await moveTaskToNextDay(taskTitle, taskId);
    handleCloseModal();
  };

  return {
    isConfirmPopupVisible,
    isEditPopupVisible,
    handleDeleteTask,
    handleEditTask,
    setIsConfirmPopupVisible,
    setIsEditPopupVisible,
    handleMoveTaskToNextDay,
  };
};

export default useTaskOptions;
