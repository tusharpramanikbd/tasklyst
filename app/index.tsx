/** @format */
import { View } from "react-native";
import ViewWrapper from "@/components/ViewWrapper";
import TaskItem from "@/components/TaskItem/TaskItem";

export default function Home() {
  return (
    <ViewWrapper>
      <View className="flex-1 bg-white m-8 mt-4 rounded-lg p-6 gap-4">
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </View>
    </ViewWrapper>
  );
}
