/** @format */

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DateContextType {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  formattedDate: string;
  handleLeftPress: () => void;
  handleRightPress: () => void;
  handleDatePress: () => void;
  handleCancel: () => void;
  handleOk: () => void;
  isToday: boolean;
}

const initialDateContext: DateContextType = {
  date: new Date(),
  setDate: () => {},
  show: false,
  setShow: () => {},
  formattedDate: "",
  handleLeftPress: () => {},
  handleRightPress: () => {},
  handleDatePress: () => {},
  handleCancel: () => {},
  handleOk: () => {},
  isToday: false,
};

const DateContext = createContext<DateContextType>(initialDateContext);

interface DateProviderProps {
  children: ReactNode;
}

const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
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

  const value = {
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

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

const useDateContext = (): DateContextType => useContext(DateContext);

export { DateProvider, useDateContext };
