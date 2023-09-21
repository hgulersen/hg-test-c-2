import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

interface PlaylistProps {
  playlist: Question["playlist"];
}

export const Playlist = ({ playlist }: PlaylistProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.playlistContainer}>
        <MaterialCommunityIcons
          name="play-box-multiple"
          size={20}
          color="white"
        />
        <Text style={styles.playlistText}>Playlist • {playlist}</Text>
      </View>
      <Entypo name="chevron-right" size={20} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  playlistContainer: {
    flexDirection: "row",
  },
  playlistText: {
    fontSize: 16,
    color: "white",
    alignSelf: "flex-start",
    fontWeight: "500",
    marginLeft: 4,
  },
});
