/** @format */
import { ScrollView, View } from "react-native";
import ViewWrapper from "@/components/ViewWrapper";
import TaskItem from "@/components/TaskItem/TaskItem";

export default function Home() {
  return (
    <ViewWrapper>
      <View className="flex-1 bg-white m-8 mt-4 rounded-lg p-6 overflow-hidden">
        <ScrollView
          bounces={false}
          contentContainerClassName="gap-8"
          showsVerticalScrollIndicator={false}
        >
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ScrollView>
      </View>
    </ViewWrapper>
  );
}
