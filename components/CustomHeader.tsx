/** @format */

import { View, Text, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function CustomHeader({ title }: { title: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(
    {
      height: 0,
      width: 0,
    },
    Platform.OS === "ios",
    insets.top,
  );

  return (
    <View style={[styles.header, { height: headerHeight }]}>
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
