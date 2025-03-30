/** @format */

import { Text } from "react-native";
import React from "react";
import { ITypography } from "./types";
import { fontSizeMap } from "./utils";

const Typography = ({
  type = "regular",
  className = "",
  ...rest
}: ITypography) => {
  return (
    <Text
      textBreakStrategy="simple"
      className={`
        text-black
        ${fontSizeMap[type]} 
        ${className}
      `}
      {...rest}
    />
  );
};

export default Typography;
