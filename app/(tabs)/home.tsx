import * as React from "react";
import { Dimensions } from "react-native";
import { VideoCard } from "@/components/Video";
import * as DocumentPicker from "expo-document-picker";

import {
  Button,
  Image,
  Input,
  ScrollView,
  XStack,
  View,
  YStack,
  Sheet,
  Label,
  Text,
  TextArea,
} from "tamagui";
import Colors from "@/constants/Colors";
//@ts-ignore
import loader from "@/assets/images/search.gif";
import { posts } from "@/data/posts";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { spModes } from "./posts_section";
import { Toast, useToastState } from "@tamagui/toast";
import { addCourse } from "@/store/slices/coursesSlice";
import { SelectDemoItem } from "@/components/SelectDemoItem";
import { findUser } from "@/data";

export default () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const currentToast = useToastState();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState<any>();
  const [level, setLevel] = React.useState();
  const pickThumbnail = async () => {
    let result: any;
    try {
      result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
    } catch (error) {
      console.error("Error picking documents:", error);
      return;
    }
    if (result) {
      setThumbnailSrc(result?.assets[0]);
    }
  };
  const pickDocuments = async () => {
    let result: any;
    try {
      result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
      });
    } catch (error) {
      console.error("Error picking documents:", error);
      return;
    }
    if (result) {
      console.log(result);
      setSelectedFiles(result?.assets[0]);
    }
  };
  const [videos, setVideos] = React.useState(posts);
  const { data } = useAppSelector((state) => state.courses);
  const [modal, setModal] = React.useState(true);
  const [snapPointsMode, setSnapPointsMode] =
    React.useState<(typeof spModes)[number]>("percent");
  const [mixedFitDemo, setMixedFitDemo] = React.useState(false);
  const [position, setPosition] = React.useState(0);
  const isPercent = snapPointsMode === "percent";
  const isConstant = snapPointsMode === "constant";
  const isFit = snapPointsMode === "fit";
  const snapPoints = isPercent
    ? [85, 50, 25]
    : isConstant
    ? [256, 190]
    : isFit
    ? undefined
    : mixedFitDemo
    ? ["fit", 110]
    : ["80%", 256, 190];
  const [thumbnailSrc, setThumbnailSrc] = React.useState<any>(null);
  const handleSubmit = () => {
    dispatch(
      addCourse({
        name: title,
        description,
        videoSrc: selectedFiles?.uri,
        tags: [level],
        thumbnailSrc: thumbnailSrc?.uri,
        author: findUser("0001"),
      })
    );
    setOpen(false);
  };

  return (
    <View>
      <View>
        <View style={{ display: "flex" }}>
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
          <Button
            style={{ alignSelf: "flex-end" }}
            width={"$13"}
            onPress={() => setOpen(true)}
          >
            + Add Course
          </Button>
        </View>
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
              height={"80%"}
              gap={70}
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {data?.map(
                (
                  {
                    videoSrc,
                    thumbnailSrc,
                    description,
                    name,
                    tags,
                    author,
                  }: any,
                  index: any
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
      {open && (
        <Sheet
          forceRemoveScrollEnabled={open}
          modal={modal}
          open={open}
          onOpenChange={setOpen}
          snapPoints={snapPoints}
          snapPointsMode={snapPointsMode}
          dismissOnSnapToBottom
          position={position}
          onPositionChange={setPosition}
          zIndex={100_000}
          animation="medium"
        >
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Sheet.Handle />
          <Sheet.Frame
            padding="$4"
            justifyContent="flex-start"
            alignItems="flex-start"
            space="$5"
            borderWidth="$-1"
          >
            <ScrollView width={"100%"} display="flex" space="$2">
              {currentToast && currentToast.isHandledNatively && (
                <Toast
                  key={currentToast?.id}
                  duration={currentToast?.duration}
                  enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
                  exitStyle={{ opacity: 0, scale: 1, y: -20 }}
                  y={0}
                  opacity={1}
                  scale={1}
                  animation="100ms"
                  viewportName={currentToast?.viewportName}
                  zIndex={989898989}
                >
                  <YStack>
                    <Toast.Title>{currentToast?.title}</Toast.Title>

                    {!!currentToast?.message && (
                      <Toast.Description>
                        {currentToast.message}
                      </Toast.Description>
                    )}
                  </YStack>
                </Toast>
              )}
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontWeight: "300",
                }}
                marginTop={15}
                fontSize={"$5"}
              >
                Create Your Post
              </Text>
              <XStack alignItems="center" space="$5">
                <Label width={90} htmlFor="title">
                  Name
                </Label>
                <YStack flex={1} space={"$1"}>
                  <Input
                    flex={1}
                    id="title"
                    defaultValue=""
                    placeholder="Enter course name"
                    onChangeText={(e) => setTitle(e)}
                  />
                </YStack>
              </XStack>
              <XStack ai="center" gap="$4">
                <Label htmlFor="select-demo-1" f={1} width={90}>
                  Level
                </Label>
                <YStack flex={1} space={"$1"}>
                  <SelectDemoItem
                    id="select-demo-1"
                    onValueChange={(e) => {
                      setLevel(e as any);
                    }}
                  />
                </YStack>
              </XStack>
              <XStack alignItems="flex-start" space="$5">
                <Label width={90} htmlFor="desc">
                  Description
                </Label>

                <YStack flex={1} space={"$1"}>
                  <TextArea
                    borderWidth={2}
                    defaultValue=""
                    flex={1}
                    placeholder="Enter course description"
                    margin={0}
                    paddingTop={-5}
                    onChangeText={(e) => setDescription(e)}
                  />
                </YStack>
              </XStack>
              <XStack alignItems="center" space="$5">
                <Button onPress={pickThumbnail}>Pick Thumbnail</Button>
              </XStack>
              {thumbnailSrc && (
                <>
                  <Text>Selected Files:</Text>
                  <View display="flex" space="$3" padding={5}>
                    <View
                      flex={1}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      justifyContent="space-between"
                      borderWidth={2}
                      borderRadius={12}
                      padding={5}
                      paddingLeft={10}
                    >
                      <Text width={285} fontSize={10}>
                        {thumbnailSrc?.name}
                      </Text>
                    </View>
                  </View>
                </>
              )}
              <XStack alignItems="center" space="$5">
                <Button onPress={pickDocuments}>Pick Video</Button>
              </XStack>
              {selectedFiles && (
                <>
                  <Text>Selected Files:</Text>
                  <View display="flex" space="$3" padding={5}>
                    <View
                      flex={1}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      justifyContent="space-between"
                      borderWidth={2}
                      borderRadius={12}
                      padding={5}
                      paddingLeft={10}
                    >
                      <Text width={285} fontSize={10}>
                        {selectedFiles?.name}
                      </Text>
                    </View>
                  </View>
                </>
              )}
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "95%",
                  alignItems: "flex-end",
                }}
                // marginTop={"$5"}
              >
                <Button
                  width={"$11"}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </View>
            </ScrollView>
          </Sheet.Frame>
        </Sheet>
      )}
    </View>
  );
};

function searchVideos(searchTerm: string, videos: any[]) {
  if (searchTerm === "") return posts;
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
