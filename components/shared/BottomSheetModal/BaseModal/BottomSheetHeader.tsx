/** @format */

import React from "react";
import { Pressable, View } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Typography from "@/components/shared/Typography/Typography";
import { AntDesign } from "expo-vector-icons";
import { IBottomSheetHeader } from "./types";

const BottomSheetHeader = ({ title, onClose }: IBottomSheetHeader) => {
  return (
    <BottomSheetView className="py-4">
      <View className="flex-row justify-between items-center gap-2">
        <Typography type="large" className="flex-1">
          {title}
        </Typography>
        {onClose && (
          <Pressable onPress={onClose} hitSlop={20}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
        )}
      </View>
    </BottomSheetView>
  );
};

export default BottomSheetHeader;
