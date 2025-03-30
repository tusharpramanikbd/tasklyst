/** @format */

import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "expo-vector-icons";
import LinearGradientWrapper from "@/components/LinearGradientWrapper/LinearGradientWrapper";

interface IAddTaskButtonProps {
  onPress: () => void;
}

const AddTaskButton = ({ onPress }: IAddTaskButtonProps) => {
  return (
    <LinearGradientWrapper style={styles.button}>
      <Pressable onPress={onPress}>
        <AntDesign name="plus" size={34} color="white" />
      </Pressable>
    </LinearGradientWrapper>
  );
};

export default AddTaskButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 80,
    position: "absolute",
    bottom: 20,
    right: -4,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
});
