/** @format */

import { Platform, Keyboard } from "react-native";
import { useRef, useCallback } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const useCustomBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
    if (Platform.OS === "ios") {
      setTimeout(() => {
        bottomSheetModalRef.current?.expand();
      }, 100);
    }
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return {
    handleOpenBottomSheet,
    handleCloseBottomSheet,
    bottomSheetModalRef,
  };
};

export default useCustomBottomSheetModal;
