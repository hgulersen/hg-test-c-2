import React from "react";
import { Text, View, StyleSheet } from "react-native";
import useTimeSpentStore from "../stores/timeSpentStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SessionTimeSpentProps {}

const SessionTimeSpent = (props: SessionTimeSpentProps) => {
  const { secondsSpentInSession } = useTimeSpentStore();
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={{ marginRight: 4 }}
        name="timer"
        size={20}
        color="lightgray"
      />
      <Text style={{ fontSize: 16, color: "lightgray" }}>
        {Math.floor(secondsSpentInSession / 60)}m
      </Text>
    </View>
  );
};
export default SessionTimeSpent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
