import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import useForYouFeedStore from "../stores/forYouFeedStore";
import { FontAwesome } from "@expo/vector-icons";

interface OptionsProps {
  questionId: number;
  options: Question["options"];
}

export const Options = ({ questionId, options }: OptionsProps) => {
  const { currentQuestionId, progressTracker, answerQuestion } =
    useForYouFeedStore();
  return (
    <View style={{ width: "100%" }}>
      {options.map((option) => (
        <Pressable
          key={option.answer}
          onPress={() => {
            answerQuestion(currentQuestionId as number, option.id);
          }}
          style={[
            styles.optionContainer,
            progressTracker.isOptionGreen(questionId, option.id) &&
              styles.optionContainerGreen,
            progressTracker.isOptionRed(questionId, option.id) &&
              styles.optionContainerRed,
          ]}
        >
          <Text style={styles.optionText}>{option.answer}</Text>

          <View style={styles.optionIconContainer}>
            {progressTracker.isOptionSelectedAndCorrect(
              questionId,
              option.id
            ) && <FontAwesome name="thumbs-up" size={24} color="white" />}
            {progressTracker.isOptionSelectedAndWrong(
              questionId,
              option.id
            ) && <FontAwesome name="thumbs-down" size={24} color="white" />}
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  optionContainerGreen: {
    backgroundColor: "green",
  },
  optionContainerRed: {
    backgroundColor: "red",
  },
  optionText: {
    flex: 1,
    color: "white",
    fontSize: 18,
    padding: 12,
    textShadowColor: "black",
    textShadowRadius: 16,
    textShadowOffset: { width: 1, height: 1 },
    fontWeight: "600",
  },
  optionIconContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
