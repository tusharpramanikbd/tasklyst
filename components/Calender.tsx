/** @format */

import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface CalenderProps {
  onChange?: (date: Date) => void;
  onCancel?: () => void;
  onOk?: () => void;
}

const Calender = ({ onChange, onCancel, onOk }: CalenderProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const isAndroid = Platform.OS === "android";

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    onChange?.(selectedDate);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleOk = () => {
    onOk?.();
  };

  if (isAndroid) {
    return <DateTimePicker value={date} mode="date" onChange={handleChange} />;
  }

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

export default Calender;
