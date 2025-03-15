/** @format */

import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "expo-vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface IAddTaskButtonProps {
  onPress: () => void;
}

const AddTaskButton = ({ onPress }: IAddTaskButtonProps) => {
  return (
    <LinearGradient
      colors={["#667eea", "#764ba2"]}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.button}
    >
      <Pressable onPress={onPress}>
        <AntDesign name="plus" size={34} color="white" />
      </Pressable>
    </LinearGradient>
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
