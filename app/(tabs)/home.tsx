import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { VideoCard } from "@/components/Video";
import { Image, Input, ScrollView, YStack } from "tamagui";
import Colors from "@/constants/Colors";
import loader from "@/assets/images/search.gif";
import { posts } from "@/data/posts";

export default () => {
  const [loading, setLoading] = React.useState(false);
  const [videos, setVideos] = React.useState(posts);
  return (
    <View>
      {/* <CameraComp /> */}
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
          if (e !== "") {
            setLoading(true);
          }

          setVideos(searchVideos(e, videos));
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }}
      />
      {loading ? (
        <View
          style={{
            height: 500,
            width: Dimensions.get("window").width,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image style={{ width: 150, height: 150 }} src={loader} />
        </View>
      ) : (
        <ScrollView>
          <YStack
            paddingTop={10}
            paddingBottom={100}
            gap={20}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {videos.map(
              (
                { videoSrc, thumbnailSrc, description, name, tags, author },
                index
              ) => (
                <VideoCard
                  author={author}
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
      )}
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
    gap: 180,
    height: Dimensions.get("window").height - 40,
  },
});
function searchVideos(searchTerm: string, videos: any[]) {
  if (searchTerm === "") return posts;
  searchTerm = searchTerm?.toLowerCase();

  if (!searchTerm) {
    return videos;
  }

  const results = videos.filter((video) => {
    const loweredName = video.name.toLowerCase();
    const loweredDescription = video.description.toLowerCase();
    const loweredTags = video.tags.map((tag: any) => tag.toLowerCase());

    return (
      video.name === searchTerm ||
      loweredName.startsWith(searchTerm) ||
      loweredDescription.includes(searchTerm) ||
      loweredTags.some((tag: any) => tag.startsWith(searchTerm))
    );
  });

  return results;
}
