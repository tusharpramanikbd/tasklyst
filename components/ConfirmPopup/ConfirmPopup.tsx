/** @format */

import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Typography from "../Typography/Typography";
import LinearGradientWrapper from "../LinearGradientWrapper/LinearGradientWrapper";

interface IConfirmPopup {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const TITLE = "Are you sure?";
const MESSAGE = "Are you sure you want to perform this action?";

const ConfirmPopup = ({ isVisible, onClose, onConfirm }: IConfirmPopup) => {
  return (
    <Modal isVisible={isVisible} statusBarTranslucent={true}>
      <View className="bg-white rounded-lg p-6 max-w-[90%] mx-auto gap-4">
        <Typography type="large">{TITLE}</Typography>
        <Typography type="regular">{MESSAGE}</Typography>
        <View className="flex-col justify-between mt-4 gap-4">
          <LinearGradientWrapper style={[styles.button]}>
            <Pressable onPress={onConfirm}>
              <Typography type="large" className="text-white !inset-1font-bold">
                Confirm
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

export default ConfirmPopup;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
