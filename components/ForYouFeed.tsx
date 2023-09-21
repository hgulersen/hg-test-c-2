import React, { useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import useForYouFeedStore from "../stores/forYouFeedStore";
import { Content } from "./Content";

const { width, height } = Dimensions.get("window");

const ForYouFeed = () => {
  const { questions, setCurrentQuestionId, fetchMore } = useForYouFeedStore();
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 20 },
      onViewableItemsChanged: (info: any) => {
        if (info?.viewableItems?.length > 0) {
          const currentQuestionId = info?.viewableItems[0]?.item?.id;
          setCurrentQuestionId(currentQuestionId);
        }
      },
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ height: height * questions.length }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        scrollEnabled={true}
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Content question={item} />}
        pagingEnabled={true}
        horizontal={false}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        bounces={false}
      />
    </View>
  );
};
export default ForYouFeed;

export const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
});
