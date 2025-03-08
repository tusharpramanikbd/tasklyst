/** @format */

import React from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarProps } from "@/types/calendar.types";

const Calendar = ({ date, setDate, onOk }: CalendarProps) => {
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    onOk?.();
  };

  return <DateTimePicker value={date} mode="date" onChange={handleChange} />;
};

export default Calendar;
