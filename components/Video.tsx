import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Avatar, Button, Image, Paragraph, Text, Tooltip, View } from "tamagui";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export const VideoCard = ({
  videoSrc,
  thumbnailSrc,
  description,
  name,
  tags,
  author,
}: any) => {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState<any>({});
  return (
    <View style={{ flexShrink: 1 }}>
      <Video
        ref={video}
        onFullscreenUpdate={(status) => {
          if (status.fullscreenUpdate === 3) {
            video?.current?.pauseAsync();
            setStatus(() => ({}));
          }
        }}
        style={status.isPlaying ? styles.video : styles.displayNone}
        source={{
          uri: videoSrc,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            height: 150,
            gap: 10,
            justifyContent: "start",
            alignItems: "flex-start",
          }}
        >
          <View
            onPress={() => router.push(`/${author?.id ?? ""}`)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar circular size="$2">
              <Avatar.Image accessibilityLabel="Cam" src={author.avatar} />
            </Avatar>
            <Text style={{ fontSize: 10 }}>{author.userName}</Text>
          </View>
          <View style={{ position: "relative" }}>
            <View
              onTouchEnd={() => {
                video?.current?.playAsync();
                video?.current?.presentFullscreenPlayer();
              }}
              style={{ position: "relative", height: 100 }}
            >
              <Image style={styles.thumbnail} src={thumbnailSrc} />
              <AntDesign
                style={{
                  zIndex: 10,
                  position: "absolute",
                  top: "40%",
                  left: "40%",
                }}
                name="play"
                size={24}
                color="white"
              />
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.courseName}>{name}</Text>
          <Text>
            <Tooltip>
              <Text style={styles.description}>{description}</Text>
            </Tooltip>
          </Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag: string, index: number) => (
              <Text key={index} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tagsContainer: {
    maxWidth: Dimensions.get("window").width - 200,
    display: "flex",
    flexDirection: "row",
    gap: 1,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "lightgray",

    padding: 5,
    borderRadius: 10,
    fontSize: 10,
  },
  courseName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  description: {
    fontSize: 10,
    fontWeight: "normal",
  },
  detailsContainer: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: Dimensions.get("window").width - 200,
  },
  container: {
    alignItems: "flex-start",
    padding: 10,
    display: "flex",
    justifyContent: "flex-start",
    maxHeight: 150,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    gap: 5,
  },
  thumbnail: {
    width: 150,
    height: 100,
    objectFit: "cover",
    borderRadius: 10,
  },

  displayNone: {
    display: "none",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
