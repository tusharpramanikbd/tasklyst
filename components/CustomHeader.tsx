/** @format */

import React from "react";
import { Text, Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetHeaderHeight } from "@hooks/useGetHeaderHeight";
import { LinearGradient } from "expo-linear-gradient";
import Calendar from "@/components/Calendar";
import useDateAction from "@/hooks/useDateAction";

export default function CustomHeader() {
  const height = useGetHeaderHeight();
  const {
    date,
    setDate,
    show,
    formattedDate,
    handleLeftPress,
    handleRightPress,
    handleDatePress,
    handleCancel,
    handleOk,
    isToday,
  } = useDateAction();

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
            <View className="flex-row items-center">
              <Text className="text-white text-2xl font-bold">
                {formattedDate}{" "}
              </Text>
              <Text className="text-white text-sm font-normal">
                {isToday && "(Today)"}
              </Text>
            </View>
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
