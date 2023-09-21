import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface IconWithTextProps {
  IconComponent: React.ComponentType<any>;
  text: string;
}

export const IconWithText = ({ IconComponent, text }: IconWithTextProps) => {
  return (
    <View style={styles.container}>
      <IconComponent size={24} color="white" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
  },
});
