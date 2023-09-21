import { ImageBackground, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import ForYouFeed from "../../components/ForYouFeed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ForYouFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
