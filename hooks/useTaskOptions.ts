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

  const { deleteTask, updateTask } = useDBContext();

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

  return {
    isConfirmPopupVisible,
    isEditPopupVisible,
    handleDeleteTask,
    handleEditTask,
    setIsConfirmPopupVisible,
    setIsEditPopupVisible,
  };
};

export default useTaskOptions;
