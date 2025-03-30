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

const CustomBottomSheetModal = React.forwardRef(
  (
    {
      children,
      name,
      onClose,
      bottomSheetIndex = 0,
      headerProps,
      enableDismissOnClose = true,
      snapPoints = ["30%", "40%"],
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
        {...props}
      >
        <BottomSheetView className="px-4 pb-10 flex-1">
          {headerProps?.title && <BottomSheetHeader {...headerProps} />}
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;
