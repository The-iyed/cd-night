import {ImagePickerExample} from "@/components/ImagePicker";
import {View} from "@/components/Themed";
import {callChatGpt, callChatGptYoutube} from "@/components/ai";
import {ArrowLeftCircle, Ghost} from "@tamagui/lucide-icons";
import {ImagePickerAsset} from "expo-image-picker";
import {useState} from "react";
import {Pressable, StyleSheet} from "react-native";
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
import {Typewriter} from '@/components/typeWriter';
import LottieView from 'lottie-react-native';

export default function TabTwoScreen() {
    const [activePage, setActivePage] = useState("");
    const [files, setFiles] = useState<ImagePickerAsset | null>(null);
    const [chatIncludes, setChatIncludes] = useState<string>("explain to me the math problem attached");
    const [chatMessage, setChatMesage] = useState("");
    const [chatYtMessage, setChatYtMesage] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [loading2, setIsLoading2] = useState(false);

    const [ytb, setYtb] = useState<string>("https://youtu.be/G7lZBKFFnls?si=F8BE4AbJm4FS32XD")
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
    console.log(chatMessage);
    return (
        <View style={styles.container}>
            <Popover size="$5" allowFlip>
                <Popover.Trigger asChild>
                    <Avatar circular size="$12" style={{cursor: "pointer"}}>
                        <Avatar.Image
                            accessibilityLabel="Nate Wienert"
                            src={"https://asset.brandfetch.io/idbrKrUZrF/id92ClxFpi.png"}
                        />
                        <Avatar.Fallback delayMs={600} backgroundColor="$blue10"/>
                    </Avatar>
                </Popover.Trigger>

                <Adapt when="sm" platform="touch">
                    <Popover.Sheet modal dismissOnSnapToBottom>
                        <Popover.Sheet.Frame padding="$4">
                            <Adapt.Contents/>
                        </Popover.Sheet.Frame>
                        <Popover.Sheet.Overlay
                            animation="lazy"
                            enterStyle={{opacity: 0}}
                            exitStyle={{opacity: 0}}
                        />
                    </Popover.Sheet>
                </Adapt>

                <Popover.Content
                    borderWidth={1}
                    borderColor="$borderColor"
                    enterStyle={{y: -10, opacity: 0}}
                    exitStyle={{y: -10, opacity: 0}}
                    elevate
                    animation={[
                        "quick",
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}>
                    <Popover.Arrow borderWidth={1} borderColor="$borderColor"/>

                    <YStack>
                        <XStack
                            style={{flexDirection: "column", gap: 30, padding: "20px"}}>
                            <XStack
                                style={{flexDirection: "column", gap: 25, padding: "20px"}}>
                                {activePage && ReturnBtn}
                                <Text
                                    style={{
                                        whiteSpace: "pre-line",
                                        maxWidth: "300px",
                                        textAlign: "center",
                                    }}>


                                    {!activePage
                                        ? "Hi , How can i assist you ."
                                        : activePage === "videos"
                                            ? "Enter your  youtube video url to get a quick explanation !"
                                            : "Ask question , understand exercises and more !"}
                                </Text>
                            </XStack>
                            {!activePage ? (
                                <XStack style={{justifyContent: "space-between", gap: 15}}>
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
                                    style={{flexDirection: "column", gap: 1, padding: "20px"}}>
                                    <Stack style={{flexDirection: "row", gap: 10}}>
                                        <Input size="$3" style={{flex: 1}} onChangeText={(e) => {
                                            setYtb(e)
                                        }} defaultValue={ytb} value={ytb}/>
                                        <Pressable onPress={async () => {
                                            if (loading) return;
                                            try {
                                                setIsLoading(true)
                                                const newVar = await callChatGptYoutube(ytb);
                                                if (!newVar) return;
                                                setChatYtMesage(newVar.choices[0].message.content)
                                            } catch (e) {
                                            } finally {
                                                setIsLoading(false)
                                            }
                                        }}>

                                            <Image
                                                style={{cursor: "pointer"}}
                                                source={{
                                                    width: 35,
                                                    height: 35,
                                                    uri: "https://cdn-icons-png.flaticon.com/512/201/201618.png",
                                                }}
                                            />
                                        </Pressable>
                                    </Stack>
                                    {!loading && chatYtMessage ? <Typewriter text={chatYtMessage} delay={1} infinite={false}/> :
                                        <LottieView
                                            autoPlay
                                            style={{
                                                width: 200,
                                                height: 200,
                                                alignSelf: "center",
                                            }}
                                            source={require("@/assets/images/lottie.json")}
                                        />}
                                </XStack>
                            ) : (
                                <XStack
                                    style={{flexDirection: "column"}}>
                                    <Stack style={{flexDirection: "row", width: '100%'}}>
                                        <Stack style={{flexDirection: "column", flex: 1, position: 'relative'}}>
                                            {files && (
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        position: "absolute",
                                                        top: 0,
                                                        zIndex: 99
                                                    }}
                                                    source={{
                                                        uri: "https://cdn.iconscout.com/icon/premium/png-512-thumb/png-file-2694541-2246320.png?f=webp&w=256",
                                                    }}
                                                />
                                            )}
                                            <Input style={{flex: 1}} paddingLeft="20px" value={chatIncludes} onChangeText={(e)=>{
                                                setChatIncludes(e)
                                            }} defaultValue={chatIncludes} />
                                        </Stack>
                                        <Stack style={{flexDirection: "row", flex: 1}}>
                                            <ImagePickerExample
                                                setImage={setFiles}
                                                image={null}
                                            />
                                            <Pressable
                                                onPress={async () => {
                                                    if (loading2) return;
                                                    try {

                                                        if (!files) return;
                                                        setIsLoading2(true)
                                                        const res = await callChatGpt({
                                                            ...files,
                                                            message: chatIncludes.trim(),
                                                        });
                                                        if (!res) return;
                                                        setChatMesage(res.choices[0].message.content);
                                                    } finally {
                                                        setIsLoading2(false)
                                                    }
                                                }}>
                                                <Image
                                                    style={{cursor: "pointer", width: 35, height: 35}}
                                                    source={{
                                                        uri: "https://cdn-icons-png.flaticon.com/512/201/201618.png",
                                                    }}
                                                />
                                            </Pressable>
                                        </Stack>
                                    </Stack>
                                    {loading2 ? <Typewriter text={chatMessage} delay={1} infinite={false}/> :
                                        <LottieView
                                            autoPlay
                                            style={{
                                                width: 200,
                                                height: 200,
                                                alignSelf: "center",
                                            }}
                                            source={require("@/assets/images/lottie.json")}
                                        />}
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
