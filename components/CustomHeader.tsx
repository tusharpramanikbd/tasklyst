/** @format */

import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetHeaderHeight } from "@hooks/useGetHeaderHeight";

export default function CustomHeader({ title }: { title: string }) {
  const height = useGetHeaderHeight();

  return (
    <View style={[styles.header, { height: height }]}>
      <AntDesign name="left" size={24} color="white" />
      <Text style={styles.title}>{title}</Text>
      <AntDesign name="right" size={24} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#6200ee",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
