import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DescriptionProps {
  userName: Question["user"]["name"];
  description: Question["description"];
}

export const Description = ({ userName, description }: DescriptionProps) => {
  const descSplit = description.split(" ");
  const descLastWord = descSplit.slice(-1)[0];
  const descFirstWords = descSplit.slice(0, -1).join(" ");
  return (
    <View style={styles.container}>
      <View style={styles.userNameContainer}>
        <Text style={styles.userNameText}>{userName}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionFirstWords}>{descFirstWords}</Text>
        <Text style={styles.descriptionLastWord}>{descLastWord}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  userNameContainer: {
    marginBottom: 8,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  descriptionContainer: {
    flexDirection: "row",
  },
  descriptionFirstWords: {
    color: "white",
  },
  descriptionLastWord: {
    color: "white",
    fontWeight: "600",
    marginLeft: 4,
  },
});
