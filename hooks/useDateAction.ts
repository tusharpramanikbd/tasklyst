/** @format */

import { useState } from "react";

const useDateAction = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);

  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  const isToday = date.toDateString() === new Date().toDateString();

  const handleLeftPress = () => {
    setDate((currentDate) => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleRightPress = () => {
    setDate((currentDate) => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const handleDatePress = () => {
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleOk = () => {
    setShow(false);
  };

  return {
    date,
    setDate,
    show,
    setShow,
    formattedDate,
    handleLeftPress,
    handleRightPress,
    handleDatePress,
    handleCancel,
    handleOk,
    isToday,
  };
};

export default useDateAction;
