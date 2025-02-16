/** @format */

import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CustomHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Text onPress={() => router.back()} style={styles.backButton}>
        ←
      </Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 80,
    backgroundColor: "#6200ee",
  },
  backButton: {
    color: "#fff",
    fontSize: 24,
    marginRight: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
