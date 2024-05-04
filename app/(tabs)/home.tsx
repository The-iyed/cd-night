import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { VideoCard } from "@/components/Video";
import { Input, ScrollView, YStack } from "tamagui";
import Colors from "@/constants/Colors";

export default () => {
  const videos = [
    {
      videoSrc: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      thumbnailSrc:
        "https://marketplace.canva.com/EAFf5rfnPgA/1/0/1600w/canva-blue-modern-eye-catching-vlog-youtube-thumbnail-LEcp-BYepDU.jpg",
      description: "sss",
      name: "course",
      tags: [
        "bac sc",
        "bac math",
        "bac info",
        "bac eco",
        "3eme math",
        "3eme info",
        "3eme sc",
        "2nd math",
        "2nd info",
        "2nd sc",
        "1er math",
        "1er info",
        "1er sc",
        "terminal math",
        "terminal info",
        "terminal sc",
      ],
    },
  ];
  return (
    <View>
      <Input
        placeholder="Search "
        size="$4"
        margin="$3"
        padding="$2"
        borderCurve="circular"
        focusStyle={{
          borderColor: Colors.light.text,
        }}
        onChangeText={(e) => {
          console.log(e);
        }}
      />
      <ScrollView>
        <YStack
          paddingTop={10}
          paddingBottom={100}
          gap={10}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {videos.map(
            ({ videoSrc, thumbnailSrc, description, name, tags }, index) => (
              <VideoCard
                videoSrc={videoSrc}
                thumbnailSrc={thumbnailSrc}
                description={description}
                name={name}
                tags={tags}
                key={index}
              />
            )
          )}
        </YStack>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "flex-start",
    gap: 110,
    height: Dimensions.get("window").height - 40,
  },
});
