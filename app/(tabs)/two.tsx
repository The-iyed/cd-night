import { ImagePickerExample } from "@/components/ImagePicker";
import { View } from "@/components/Themed";
import { callChatGpt } from "@/components/ai";
import { ArrowLeftCircle, Ghost } from "@tamagui/lucide-icons";
import { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import {
  Adapt,
  Avatar,
  Button,
  Image,
  Input,
  Popover,
  Stack,
  Text,
  XStack,
  YStack,
} from "tamagui";

export default function TabTwoScreen() {
  const [activePage, setActivePage] = useState("");
  const [files, setFiles] = useState<ImagePickerAsset | null>(null);
  const [chatMessage, setChatMesage] = useState("");
  const ReturnBtn = (
    <XStack
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        height: "fit-content",
        width: "100%",
      }}>
      <Button
        alignSelf="center"
        icon={ArrowLeftCircle}
        size="$1"
        onPress={() => setActivePage("")}>
        Return
      </Button>
    </XStack>
  );
  console.log(chatMessage)
  return (
    <View style={styles.container}>
      <Popover size="$5" allowFlip>
        <Popover.Trigger asChild>
          <Avatar circular size="$6" style={{ cursor: "pointer" }}>
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src={"https://asset.brandfetch.io/idbrKrUZrF/id92ClxFpi.png"}
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>
        </Popover.Trigger>

        <Adapt when="sm" platform="touch">
          <Popover.Sheet modal dismissOnSnapToBottom>
            <Popover.Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Popover.Sheet.Frame>
            <Popover.Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Popover.Sheet>
        </Adapt>

        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          elevate
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}>
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

          <YStack>
            <XStack
              style={{ flexDirection: "column", gap: 5, padding: "20px" }}>
              <XStack
                style={{ flexDirection: "column", gap: 10, padding: "20px" }}>
                <Text
                  style={{
                    whiteSpace: "pre-line",
                    maxWidth: "300px",
                    textAlign: "center",
                  }}>
                    {activePage && ReturnBtn}
                  {!activePage
                    ? "Hi , How can i assist you"
                    : activePage === "videos"
                    ? "Enter your video url to get a quick explanation !"
                    : "Ask question , understand exercises and more !"}
                </Text>
              </XStack>
              {!activePage ? (
                <XStack style={{ justifyContent: "space-between", gap: 15 }}>
                  <XStack
                    style={{
                      flexDirection: "column",
                      gap: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      border: "1px solid #ef233c",
                      borderRadius: "10px",
                      padding: "8px",
                      width: "100px",
                    }}
                    onPress={() => setActivePage("videos")}>
                    <Image
                      source={{
                        width: 35,
                        height: 35,
                        uri: "https://static.vecteezy.com/system/resources/previews/022/488/752/original/3d-youtube-logo-icon-isolated-on-transparent-background-free-png.png",
                      }}
                    />
                    <Text fontSize={9}>Understand videos</Text>
                  </XStack>
                  <XStack
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                      border: "1px solid #48cae4",
                      borderRadius: "10px",
                      padding: "8px",
                      width: "100px",
                    }}
                    onPress={() => setActivePage("ask")}>
                    <Image
                      source={{
                        width: 45,
                        height: 40,
                        uri: "https://static.vecteezy.com/system/resources/previews/021/820/175/non_2x/computer-chip-with-ai-letters-3d-artificial-intelligence-icon-png.png",
                      }}
                    />
                    <Text fontSize={9}>Ask questions</Text>
                  </XStack>
                </XStack>
              ) : activePage === "videos" ? (
                <XStack
                  style={{ flexDirection: "column", gap: 1, padding: "20px" }}>
                  <Stack style={{ flexDirection: "row", gap: 10 }}>
                    <Input size="$3" width="280px" />
                    <Image
                      style={{ cursor: "pointer" }}
                      source={{
                        width: 35,
                        height: 35,
                        uri: "https://cdn-icons-png.flaticon.com/512/201/201618.png",
                      }}
                    />
                  </Stack>
                </XStack>
              ) : (
                <XStack
                  style={{ flexDirection: "column", gap: 10, padding: "20px" }}>
                  <Stack style={{ flexDirection: "row", gap: 10 }}>
                    <Stack style={{ flexDirection: "column", gap: 2 }}>
                      {files && (
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            position: "absolute",
                            top: "5px",
                          }}
                          source={{
                            uri: "https://cdn.iconscout.com/icon/premium/png-512-thumb/png-file-2694541-2246320.png?f=webp&w=256",
                          }}
                        />
                      )}
                      <Input size="$3" width="220px" paddingLeft="20px" />
                    </Stack>
                    <ImagePickerExample
                      setImage={(files: any) => setFiles(files)}
                      image={null}
                    />
                    <Pressable
                      onPress={async () => {
                        console.log('asba')
                        if (!files) return;
                        const res = await callChatGpt({
                          ...files,
                          message: "",
                        });
                        if (!res) return;
                        setChatMesage(res.choices[0].message.content);
                      }}>
                      <Image
                        style={{ cursor: "pointer", width: 35, height: 35 }}
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/512/201/201618.png",
                        }}
                      />
                    </Pressable>
                  </Stack>
                </XStack>
              )}
            </XStack>
          </YStack>
        </Popover.Content>
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
