/** @format */

import React from "react";
import { Text, Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetHeaderHeight } from "@hooks/useGetHeaderHeight";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Calender from "./Calender";

export default function CustomHeader() {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const height = useGetHeaderHeight();

  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

  const onChange = (selectedDate?: Date) => {
    if (!selectedDate) return;
    setDate(selectedDate);
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
          <AntDesign name="left" size={24} color="white" />
          <Pressable onPress={() => setShow(true)}>
            <Text className="text-white text-2xl font-bold">
              {formattedDate}
            </Text>
          </Pressable>
          <AntDesign name="right" size={24} color="white" />
        </View>
      </LinearGradient>
      {show && (
        <Calender
          onChange={onChange}
          onCancel={() => setShow(false)}
          onOk={() => setShow(false)}
        />
      )}
    </>
  );
}
