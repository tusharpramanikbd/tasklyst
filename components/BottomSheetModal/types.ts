/** @format */

import { BottomSheetModalProps } from "@gorhom/bottom-sheet";

export interface ICustomBottomSheetModal extends BottomSheetModalProps {
  children: React.ReactNode;
  name: string;
  onClose: () => void;
  bottomSheetIndex?: number;
  headerProps?: IBottomSheetHeader;
  enableDismissOnClose?: boolean;
}

export interface IBottomSheetHeader {
  title: string;
  onClose: () => void;
}
