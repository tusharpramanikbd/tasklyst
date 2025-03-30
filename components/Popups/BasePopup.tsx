/** @format */

import { View } from "react-native";
import React from "react";
import Modal from "react-native-modal";

interface IBasePopup {
  isVisible?: boolean;
  children: React.ReactNode;
}

const BasePopup = ({ isVisible, children }: IBasePopup) => {
  return (
    <Modal isVisible={isVisible} statusBarTranslucent={true}>
      <View className="bg-white rounded-lg p-6 max-w-[95%] mx-auto gap-4">
        {children}
      </View>
    </Modal>
  );
};

export default BasePopup;
