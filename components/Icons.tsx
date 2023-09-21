import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar } from "./Avatar";
import { IconWithText } from "./IconWithText";

interface IconsProps {
  avatarUri: Question["user"]["avatar"];
}

export const Icons = ({ avatarUri }: IconsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar avatarUri={avatarUri} />
      </View>
      <IconWithText
        IconComponent={() => <AntDesign name="heart" size={32} color="white" />}
        text="87"
      />
      <IconWithText
        IconComponent={() => (
          <FontAwesome name="commenting" size={32} color="white" />
        )}
        text="35"
      />
      <IconWithText
        IconComponent={() => (
          <FontAwesome name="bookmark" size={32} color="white" />
        )}
        text="35"
      />
      <IconWithText
        IconComponent={() => (
          <MaterialCommunityIcons name="share" size={32} color="white" />
        )}
        text="35"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 320,
    justifyContent: "space-between",
  },
  avatarContainer: {
    marginBottom: 8,
  },
});
