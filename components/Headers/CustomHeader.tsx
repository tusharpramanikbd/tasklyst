/** @format */

import React from "react";
import { Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetHeaderHeight } from "@hooks/useGetHeaderHeight";
import Calendar from "@/components/Calendar";
import Typography from "@/components/Typography/Typography";
import LinearGradientWrapper from "@/components/LinearGradientWrapper/LinearGradientWrapper";
import { useDateContext } from "@/contexts/DateContext";

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
  } = useDateContext();

  return (
    <>
      <LinearGradientWrapper>
        <View
          className="flex-row items-end justify-between px-5 pb-2"
          style={{ height: height }}
        >
          <Pressable onPress={handleLeftPress}>
            <AntDesign name="left" size={24} color="white" />
          </Pressable>
          <Pressable onPress={handleDatePress}>
            <View className="flex-row items-center">
              <Typography type="large" className="text-white">
                {formattedDate}{" "}
              </Typography>
              <Typography type="small" className="text-white">
                {isToday && "(Today)"}
              </Typography>
            </View>
          </Pressable>
          <Pressable onPress={handleRightPress}>
            <AntDesign name="right" size={24} color="white" />
          </Pressable>
        </View>
      </LinearGradientWrapper>
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
