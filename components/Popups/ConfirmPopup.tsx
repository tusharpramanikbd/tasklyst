/** @format */

import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Typography from "@/components/Typography/Typography";
import LinearGradientWrapper from "@/components/LinearGradientWrapper/LinearGradientWrapper";
import BasePopup from "./BasePopup";

interface IConfirmPopup {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const TITLE = "Are you sure?";
const MESSAGE = "Are you sure you want to perform this action?";

const ConfirmPopup = ({ isVisible, onClose, onConfirm }: IConfirmPopup) => {
  return (
    <BasePopup isVisible={isVisible}>
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
    </BasePopup>
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
