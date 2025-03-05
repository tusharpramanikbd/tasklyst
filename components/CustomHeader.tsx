/** @format */

import { Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetHeaderHeight } from "@hooks/useGetHeaderHeight";
import { LinearGradient } from "expo-linear-gradient";

export default function CustomHeader({ title }: { title: string }) {
  const height = useGetHeaderHeight();

  return (
    <LinearGradient
      colors={["#667eea", "#764ba2"]}
      style={[styles.header, { height: height }]}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <AntDesign name="left" size={24} color="white" />
      <Text style={styles.title}>{title}</Text>
      <AntDesign name="right" size={24} color="white" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
