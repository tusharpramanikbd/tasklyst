/** @format */

import { Platform, Keyboard } from "react-native";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const useCustomBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
    if (Platform.OS === "ios") {
      setTimeout(() => {
        bottomSheetModalRef.current?.expand();
      }, 100);
    }
  };

  const handleCloseBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return {
    handleOpenBottomSheet,
    handleCloseBottomSheet,
    bottomSheetModalRef,
  };
};

export default useCustomBottomSheetModal;
