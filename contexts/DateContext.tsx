/** @format */

import {
  addDays,
  format,
  isBefore,
  isToday as isTodayFns,
  startOfDay,
  startOfToday,
  subDays,
} from "date-fns";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

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
  isPastDates: boolean;
  nextDate: string;
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
  isPastDates: false,
  nextDate: "",
};

const DateContext = createContext<DateContextType>(initialDateContext);

interface DateProviderProps {
  children: ReactNode;
}

const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [date, setDate] = useState<Date>(() => startOfToday());
  const [show, setShow] = useState(false);

  const formattedDate = format(date, "dd-MM-yyyy");
  const isToday = isTodayFns(date);
  const isPastDates = useMemo(
    () => isBefore(date, startOfDay(new Date())),
    [date],
  );

  const handleLeftPress = () => {
    setDate((currentDate) => subDays(currentDate, 1));
  };

  const handleRightPress = () => {
    setDate((currentDate) => addDays(currentDate, 1));
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

  const getNextDate = () => {
    return format(addDays(date, 1), "dd-MM-yyyy");
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
    isPastDates,
    nextDate: getNextDate(),
  };

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

const useDateContext = (): DateContextType => useContext(DateContext);

export { DateProvider, useDateContext };
