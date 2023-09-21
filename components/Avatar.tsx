import React from "react";
import { View, StyleSheet, ImageStyle, ViewStyle } from "react-native";
import { ImageBackground } from "expo-image";
import { Entypo } from "@expo/vector-icons";

interface AvatarProps {
  avatarUri: Question["user"]["avatar"];
}

export const Avatar = ({ avatarUri }: AvatarProps) => {
  return (
    <View>
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        source={{ uri: avatarUri }}
      >
        <View style={styles.iconContainer}>
          <Entypo name="plus" size={16} color="white" />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: "white",
    borderWidth: 2,
  },
  imageStyle: {
    borderRadius: 24,
  },
  iconContainer: {
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
    backgroundColor: "rgba(39,178,43,1)",
    borderRadius: 24,
    padding: 4,
  },
});

export default Avatar;
