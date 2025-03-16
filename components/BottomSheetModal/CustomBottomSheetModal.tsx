/** @format */

import React, { useCallback, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BottomSheetHeader from "./BottomSheetHeader";
import { ICustomBottomSheetModal } from "./types";
import { LayoutChangeEvent } from "react-native";
import { Dimensions } from "react-native";

const DEFAULT_SNAP_POINT = 368;
const BOTTOM_SPACE = 20;

const CustomBottomSheetModal = React.forwardRef(
  (
    {
      children,
      name,
      onClose,
      bottomSheetIndex = 0,
      headerProps,
      enableDismissOnClose = true,
      ...props
    }: ICustomBottomSheetModal,
    ref: React.ForwardedRef<BottomSheetModal<ICustomBottomSheetModal>>,
  ) => {
    const [contentHeight, setContentHeight] = useState(0);

    const snapPoints =
      contentHeight > 0
        ? [
            Math.min(
              contentHeight + BOTTOM_SPACE,
              Dimensions.get("window").height * 0.9,
            ),
          ]
        : [DEFAULT_SNAP_POINT];

    const measureContent = useCallback((event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setContentHeight(height);
    }, []);

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
        {...props}
      >
        <BottomSheetView
          className="px-4 pb-10 flex-1"
          onLayout={measureContent}
        >
          {headerProps?.title && <BottomSheetHeader {...headerProps} />}
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;
