/** @format */

import React, { useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BottomSheetHeader from "./BottomSheetHeader";
import { ICustomBottomSheetModal } from "./types";
import { StyleSheet } from "react-native";

const CustomBottomSheetModal = React.forwardRef(
  (
    {
      children,
      name,
      onClose,
      bottomSheetIndex = 0,
      headerProps,
      enableDismissOnClose = true,
      snapPoints = [350],
      ...props
    }: ICustomBottomSheetModal,
    ref: React.ForwardedRef<BottomSheetModal<ICustomBottomSheetModal>>,
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={bottomSheetIndex - 1}
          appearsOnIndex={bottomSheetIndex}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        name={name}
        onDismiss={onClose}
        index={bottomSheetIndex}
        backdropComponent={renderBackdrop}
        enableDismissOnClose={enableDismissOnClose}
        snapPoints={snapPoints}
        android_keyboardInputMode="adjustResize"
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enablePanDownToClose={true}
        {...props}
      >
        <BottomSheetView style={styles.container}>
          {headerProps?.title && <BottomSheetHeader {...headerProps} />}
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
