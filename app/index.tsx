/** @format */

import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import { Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaViewWrapper>
      <Text className="font-bold text-2xl text-red-500">Hello World</Text>
    </SafeAreaViewWrapper>
  );
}
