import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { VideoCard } from "@/components/Video";
import { Input, ScrollView, YStack } from "tamagui";
import Colors from "@/constants/Colors";

export default () => {
  const [videos, setVideos] = React.useState(allVideos);
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
        onChangeText={e => {
          setVideos(searchVideos(e, videos));
        }}
      />
      <ScrollView>
        <YStack
          paddingTop={10}
          paddingBottom={100}
          gap={20}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start">
          {videos.map(
            (
              { videoSrc, thumbnailSrc, description, name, tags, author },
              index
            ) => (
              <VideoCard
                videoSrc={videoSrc}
                thumbnailSrc={thumbnailSrc}
                description={description}
                name={name}
                tags={tags}
                id={author?.id}
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
    gap: 180,
    height: Dimensions.get("window").height - 40,
  },
});
function searchVideos(searchTerm: string, videos: any[]) {
  if (searchTerm === "") return allVideos;
  searchTerm = searchTerm?.toLowerCase();

  if (!searchTerm) {
    return videos;
  }

  const results = videos.filter(video => {
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
const allVideos = [
  {
    videoSrc: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    thumbnailSrc:
      "https://marketplace.canva.com/EAFf5rfnPgA/1/0/1600w/canva-blue-modern-eye-catching-vlog-youtube-thumbnail-LEcp-BYepDU.jpg",
    description: "ssssss",
    name: "course",
    tags: ["bac fn", "bac sc", "bac math", "bac info", "bac eco"],
  },
  {
    videoSrc: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    thumbnailSrc:
      "https://marketplace.canva.com/EAFf5rfnPgA/1/0/1600w/canva-blue-modern-eye-catching-vlog-youtube-thumbnail-LEcp-BYepDU.jpg",
    description:
      "In this video, we'll talk about the best way to learn English on your own. And I’ll show you the free courses, podcasts and books that can help you reach a C2 level of English- and beyond!",
    name: "How to Learn English On Your Own ",
    tags: ["bac fn", "bac sc", "bac math", "bac info", "bac eco"],
  },
  {
    videoSrc: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    thumbnailSrc:
      "https://marketplace.canva.com/EAFf5rfnPgA/1/0/1600w/canva-blue-modern-eye-catching-vlog-youtube-thumbnail-LEcp-BYepDU.jpg",
    description:
      "In this video, we'll talk about the best way to learn English on your own. And I’ll show you the free courses, podcasts and books that can help you reach a C2 level of English- and beyond!",
    name: "How to Learn English On Your Own ",
    tags: ["bac fn", "bac sc", "bac math", "bac info", "bac eco"],
  },
];
