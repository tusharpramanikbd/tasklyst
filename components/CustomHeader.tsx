/** @format */

import React from "react";
import { Text, Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetHeaderHeight } from "@hooks/useGetHeaderHeight";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Calendar from "@/components/Calendar";

export default function CustomHeader() {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const height = useGetHeaderHeight();

  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

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

  return (
    <>
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          className="flex-row items-end justify-between px-5 pb-2"
          style={{ height: height }}
        >
          <Pressable onPress={handleLeftPress}>
            <AntDesign name="left" size={24} color="white" />
          </Pressable>
          <Pressable onPress={handleDatePress}>
            <Text className="text-white text-2xl font-bold">
              {formattedDate}
            </Text>
          </Pressable>
          <Pressable onPress={handleRightPress}>
            <AntDesign name="right" size={24} color="white" />
          </Pressable>
        </View>
      </LinearGradient>
      {show && (
        <Calendar
          date={date}
          setDate={setDate}
          onCancel={handleCancel}
          onOk={handleOk}
        />
      )}
    </>
  );
}
