import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import OptimisedImageBackground from "./OptimisedImageBackground";
import config from "../config";
import { Question } from "./Question";
import { Options } from "./Options";
import { Description } from "./Description";
import { Playlist } from "./Playlist";
import { Icons } from "./Icons";

interface ContentProps {
  question: Question;
}
const { width, height } = Dimensions.get("window");
export const Content = ({ question }: ContentProps) => {
  return (
    <OptimisedImageBackground style={styles.imageBg} imageUri={question.image}>
      <View
        style={{
          width: "100%",
          height: height,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <View
          style={{
            width: "100%",
            flex: 0.8,
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: config.tabBarHeight,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
          >
            <Question text={question.question} />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      height: "70%",
                    }}
                  >
                    <View style={{ flex: 1, marginRight: 20 }}>
                      <Options
                        questionId={question.id}
                        options={question.options}
                      />
                    </View>
                  </View>
                  <View style={{ marginVertical: 16 }}>
                    <Description
                      userName={question.user.name}
                      description={question.description}
                    />
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <Icons avatarUri={question.user.avatar} />
              </View>
            </View>
          </View>
          <Playlist playlist={question.playlist} />
        </View>
      </View>
    </OptimisedImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: "100%",
    height: height,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
