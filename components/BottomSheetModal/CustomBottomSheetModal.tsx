/** @format */

import React from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";

interface ICustomBottomSheetModal extends BottomSheetModalProps {
  children: React.ReactNode;
}

const CustomBottomSheetModal = React.forwardRef(
  (
    { children, ...props }: ICustomBottomSheetModal,
    ref: React.ForwardedRef<BottomSheetModal<ICustomBottomSheetModal>>,
  ) => {
    return (
      <BottomSheetModal ref={ref} {...props}>
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  },
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;
