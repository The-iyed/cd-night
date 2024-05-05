import { SetStateAction, useMemo, useState } from "react";
import {
  Button,
  Input,
  Label,
  ScrollView,
  Sheet,
  Text,
  TextArea,
  View,
  XStack,
  YStack,
} from "tamagui";
export const spModes = ["percent", "constant", "fit", "mixed"] as const;
import * as DocumentPicker from "expo-document-picker";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { SelectDemoItem } from "@/components/SelectDemoItem";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  useToastState,
} from "@tamagui/toast";

import { useToastController } from "@tamagui/toast";

import React from "react";

import { Switch } from "tamagui";
import { addPost } from "@/store/slices/postsSlice";

export default function PostsSection() {
  const [open, setOpen] = useState<boolean>(false);
  const [modal, setModal] = useState(true);
  const [snapPointsMode, setSnapPointsMode] =
    useState<(typeof spModes)[number]>("percent");
  const [mixedFitDemo, setMixedFitDemo] = useState(false);
  const [position, setPosition] = useState(0);
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
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const pickDocuments = async () => {
    let result: any;
    try {
      result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });
    } catch (error) {
      console.error("Error picking documents:", error);
      return;
    }
    if (result) {
      setSelectedFiles([...selectedFiles, ...result?.assets]);
    }
  };
  const toast = useToastController();

  const deleteFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [levelValue, setLevel] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (
      !title.trim() ||
      !description.trim ||
      selectedFiles?.length == 0 ||
      !levelValue.trim()
    ) {
      if (toast)
        toast.show("Please Check you form", {
          message: "Help",
          native: true,
          duration: 1000,
        });
      toast.hide();
    } else {
      dispatch(
        addPost({
          title,
          description,
          selectedFiles,
          levelValue,
        })
      );
      setOpen(false);
    }
  };
  const data = useAppSelector((state) => state.posts);
  const currentToast = useToastState();

  const [native, setNative] = useState(false);
  return (
    <View>
      <YStack space alignItems="center">
        <CurrentToast />
      </YStack>
      <ToastViewport />

      <Text
        style={{ textAlign: "center", width: "100%" }}
        marginTop={15}
        fontSize={"$7"}
      >
        Posts
      </Text>
      <Text
        style={{ textAlign: "center", width: "100%", fontWeight: "300" }}
        marginTop={15}
        fontSize={"$4"}
      >
        Welcome to posts section where you can share your knowledge with your
        friends
      </Text>

      <View
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "95%",
          alignItems: "flex-end",
        }}
        marginTop={"$5"}
      >
        <Button
          backgroundColor={"white"}
          color={"black"}
          width={"$11"}
          onPress={() => setOpen(true)}
        >
          + Add Post
        </Button>
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
          <Sheet.Handle backgroundColor={"white"} />
          <Sheet.Frame
            padding="$4"
            justifyContent="flex-start"
            alignItems="flex-start"
            space="$5"
            borderTopColor={"white"}
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
                  Title
                </Label>
                <YStack flex={1} space={"$1"}>
                  <Input
                    flex={1}
                    id="title"
                    defaultValue=""
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
                      setLevel(e);
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
                    placeholder="Enter you description"
                    margin={0}
                    paddingTop={-5}
                    onChangeText={(e) => setDescription(e)}
                  />
                </YStack>
              </XStack>
              <XStack alignItems="center" space="$5">
                <Button onPress={pickDocuments}>Pick Files</Button>
              </XStack>
              {selectedFiles.length > 0 && (
                <>
                  <Text>Selected Files:</Text>
                  <View display="flex" space="$3" padding={5}>
                    {selectedFiles.map((file, index: number) => (
                      <View
                        key={file.name}
                        flex={1}
                        display="flex"
                        alignItems="center"
                        flexDirection="row"
                        justifyContent="space-between"
                        borderBlockColor={"white"}
                        borderWidth={2}
                        borderRadius={12}
                        padding={5}
                        paddingLeft={10}
                        borderColor={"white"}
                      >
                        <Text width={285} fontSize={10}>
                          {file?.name}
                        </Text>
                        <Button
                          onPress={() => deleteFile(index)}
                          color="white"
                          fontSize={"$1"}
                          backgroundColor={"transparent"}
                        >
                          X
                        </Button>
                      </View>
                    ))}
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
                marginTop={"$5"}
              >
                <Button
                  backgroundColor={"white"}
                  color={"black"}
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

      <YStack space={"$3"}>
        {data?.data.map((el: any, index: number) => {
          console.log("===>", el);
          return (
            <XStack flex={1} key={index}>
              <Text color={"white"}>{el?.description}</Text>
            </XStack>
          );
        })}
      </YStack>
    </View>
  );
}

export const CurrentToast = () => {
  const currentToast = useToastState();
  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>

        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
};
;


export const items = [
  { name: "Bac Math" },
  { name: "Bac Economie et Gestion" },
  { name: "2éme année" },
  { name: "7 ème De base" },
  { name: "2 ème Secondaire Informatique"},
  { name: "3 ème Secondaire Techniques"},
  { name: "3 ème secondaire Lettres"},
  { name: "Bac Sciences Exp"},
  { name: "Bac Reo Paramédical"},
  { name: "3 ème Secondaire Mathématiques"},
  { name: "السّادسة 6 ابتدائي" },
  { name: "1 ère Secondaire"}
];