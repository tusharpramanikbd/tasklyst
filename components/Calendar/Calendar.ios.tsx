/** @format */

import React, { useState } from "react";
import { Pressable, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarProps } from "@/components/Calendar/types";
import Typography from "@/components/Typography/Typography";

const Calendar = ({ onCancel, onOk, date, setDate }: CalendarProps) => {
  const [tempDate, setTempDate] = useState<Date>(date);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;
    setTempDate(selectedDate);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleOk = () => {
    tempDate && setDate(tempDate);
    onOk?.();
  };

  return (
    <View className="items-center justify-center pb-4">
      <DateTimePicker
        value={date}
        mode="date"
        onChange={handleChange}
        display="spinner"
      />
      <View className="w-full flex-row items-center justify-center gap-12">
        <Pressable onPress={handleCancel}>
          <Typography>Cancel</Typography>
        </Pressable>
        <Pressable onPress={handleOk}>
          <Typography>Ok</Typography>
        </Pressable>
      </View>
    </View>
  );
};

export default Calendar;
