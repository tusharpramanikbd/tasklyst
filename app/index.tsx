/** @format */
import { ScrollView, View } from "react-native";
import ViewWrapper from "@/components/Wrappers/ViewWrapper";
import TaskItem from "@/components/TaskItem/TaskItem";
import AddTaskButton from "@/components/AddTaskButton/AddTaskButton";

const taskList = [
  {
    id: 1,
    title: "Task 1",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Task 2",
    isCompleted: true,
  },
  {
    id: 3,
    title: "Task 3",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Task 4",
    isCompleted: true,
  },
  {
    id: 5,
    title: "Task 5",
    isCompleted: false,
  },
];

export default function Home() {
  return (
    <ViewWrapper>
      <View className="flex-1 bg-white m-8 mt-4 rounded-lg p-6 overflow-hidden">
        <ScrollView
          bounces={false}
          contentContainerClassName="gap-8"
          showsVerticalScrollIndicator={false}
        >
          {taskList?.map((task) => <TaskItem key={task.id} {...task} />)}
        </ScrollView>
        <AddTaskButton />
      </View>
    </ViewWrapper>
  );
}
