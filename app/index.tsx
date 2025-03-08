/** @format */
import { Text, View } from "react-native";
import ViewWrapper from "@/components/ViewWrapper";
export default function Home() {
  return (
    <ViewWrapper>
      <View className="flex-1 items-center justify-center bg-white m-8 mt-4 rounded-lg p-4">
        <Text className="font-bold text-2xl text-red-500">Hello World</Text>
      </View>
    </ViewWrapper>
  );
}
