/** @format */

import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import LinearGradientWrapper from "../LinearGradientWrapper/LinearGradientWrapper";
import Typography from "../Typography/Typography";

interface IEditPopup {
  isVisible: boolean;
  onClose: () => void;
  onDone: (taskName: string) => void;
  taskName: string;
}

const EditPopup = ({ isVisible, onClose, onDone, taskName }: IEditPopup) => {
  const [currentTaskName, setCurrentTaskName] = useState(taskName);

  return (
    <Modal isVisible={isVisible} statusBarTranslucent={true}>
      <View className="bg-white rounded-lg p-6 max-w-[95%] mx-auto gap-4">
        <TextInput
          value={currentTaskName}
          onChangeText={setCurrentTaskName}
          placeholder="Task Name"
          className="border border-gray-300 rounded-md p-2 px-4 min-h-16 text-xl no-underline min-w-full"
        />
        <View className="flex-col justify-between mt-4 gap-4">
          <LinearGradientWrapper style={[styles.button]}>
            <Pressable onPress={() => onDone(currentTaskName)}>
              <Typography type="large" className="text-white !inset-1font-bold">
                Done
              </Typography>
            </Pressable>
          </LinearGradientWrapper>
          <LinearGradientWrapper style={[styles.button]}>
            <Pressable
              onPress={onClose}
              className="bg-white w-full rounded-full items-center justify-center p-2 -m-[9px]"
            >
              <Typography type="large" className="!font-bold">
                Cancel
              </Typography>
            </Pressable>
          </LinearGradientWrapper>
        </View>
      </View>
    </Modal>
  );
};

export default EditPopup;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
