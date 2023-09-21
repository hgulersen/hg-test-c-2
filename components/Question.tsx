import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Question = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    borderRadius: 8,
    padding: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  text: {
    fontSize: 24,
    color: "white",
    alignSelf: "flex-start",
    fontWeight: "500",
  },
});
