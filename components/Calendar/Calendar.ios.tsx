/** @format */

import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarProps } from "@/types/calendar.types";

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
          <Text>Cancel</Text>
        </Pressable>
        <Pressable onPress={handleOk}>
          <Text>Ok</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Calendar;
