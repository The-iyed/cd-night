import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Button, Image, Text, View } from "tamagui";
import AntDesign from "@expo/vector-icons/AntDesign";

export const VideoCard = ({
  videoSrc,
  thumbnailSrc,
  description,
  name,
  tags,
}: any) => {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState<any>({});
  return (
    <View>
      <Video
        ref={video}
        onFullscreenUpdate={(status) => {
          if (status.fullscreenUpdate === 3) {
            video?.current?.pauseAsync();
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

      <Button
        style={styles.container}
        onTouchEnd={() => {
          video?.current?.playAsync();
          video?.current?.presentFullscreenPlayer();
        }}
      >
        <Image style={styles.thumbnail} src={thumbnailSrc} />
        {/* <AntDesign name="play" size={24} color="black" /> */}
        <View style={styles.detailsContainer}>
          <Text style={styles.courseName}>{name}</Text>
          <Text>{description}</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag: string, index: number) => (
              <Text style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>
      </Button>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    alignItems: "flex-start",
    display: "flex",
    height: "100%",
    flexDirection: "row",
    gap: 1,
  },
  thumbnail: {
    width: 170,
    height: "100%",
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
