import {SetStateAction, useMemo, useState} from "react";
import {
    Avatar,
    Button,
    H2,
    H3,
    H5,
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
import {useAppDispatch, useAppSelector} from "@/store/store";
import {SelectDemoItem} from "@/components/SelectDemoItem";
import {
    Toast,
    ToastProvider,
    ToastViewport,
    useToastState,
} from "@tamagui/toast";
import * as FileSystem from "expo-file-system";
import {useToastController} from "@tamagui/toast";

import React from "react";

import {addPost} from "@/store/slices/postsSlice";
import {Alert, StyleSheet} from "react-native";

export default function PostsSection() {
    const router = useRouter();
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
                    files: selectedFiles,
                    level: levelValue,
                })
            );
            setOpen(false);
            setDescription("");
            setLevel("");
            setSelectedFiles([]);
            setTitle("");
        }
    };
    const data = useAppSelector((state) => state.posts);
    const currentToast = useToastState();
    return (
        <View style={{flex: 1, paddingBottom: 10, padding: 10}}>
            <YStack space alignItems="center">
                <CurrentToast/>
            </YStack>
            <ToastViewport/>

            <Text
                style={{textAlign: "center", width: "100%"}}
                marginTop={15}
                fontSize={"$7"}
            >
                Posts
            </Text>
            <Text
                style={{textAlign: "center", width: "100%", fontWeight: "300"}}
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
                        enterStyle={{opacity: 0}}
                        exitStyle={{opacity: 0}}
                    />
                    <Sheet.Handle backgroundColor={"white"}/>
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
                                    enterStyle={{opacity: 0, scale: 0.5, y: -25}}
                                    exitStyle={{opacity: 0, scale: 1, y: -20}}
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
                                                key={index}
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
            <ScrollView marginTop={15} space={"$5"} paddingBottom={0}>
                {data?.data?.length > 0 &&
                    data?.data?.map((el: any, index: number) => {
                        return (
                            <View
                                key={index}
                                borderColor={"white"}
                                borderWidth={0.5}
                                padding={12}
                                borderRadius={10}
                                gap={3}
                            >
                                <H3 color={"white"} textAlign="center">
                                    {el?.title}
                                </H3>
                                <View
                                    onPress={() => router.push(`/Profile/${el.author.id!}`)}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 4,
                                    }}
                                >
                                    <Avatar circular size="$4">
                                        <Avatar.Image
                                            accessibilityLabel="Cam"
                                            src={el.author.avatar}
                                        />
                                    </Avatar>
                                    <Text>{el.author.userName}</Text>
                                </View>
                                <H5 color={"white"} fontWeight={"$4"}>
                                    {el?.level}
                                </H5>
                                <Text color={"white"}>{el?.description}</Text>
                                {el?.files && el?.files?.length > 0 && (
                                    <View display="flex" space="$3" padding={5}>
                                        {el?.files.map((file: any, index: number) => (
                                            <View
                                                key={index}
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
                                                    {file?.filename}
                                                </Text>
                                                <DownloadButton
                                                    uri={file?.uri}
                                                    filename={file?.filename}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        );
                    })}
            </ScrollView>
        </View>
    );
}

const CurrentToast = () => {
    const currentToast = useToastState();
    if (!currentToast || currentToast.isHandledNatively) return null;

    return (
        <Toast
            key={currentToast.id}
            duration={currentToast.duration}
            enterStyle={{opacity: 0, scale: 0.5, y: -25}}
            exitStyle={{opacity: 0, scale: 1, y: -20}}
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

import {Download} from "@tamagui/lucide-icons";
import * as Permissions from "expo-permissions";
import {useRouter} from "expo-router";

const DownloadButton = ({uri, filename}: any) => {
    const downloadFile = async () => {
        try {
            const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if (status !== "granted") {
                console.error("Storage permission not granted!");
                return;
            }
            const {uri: downloadUri} = await FileSystem.downloadAsync(
                uri,
                FileSystem.documentDirectory + filename,
                {}
            );
            console.log("File downloaded successfully:", downloadUri);
            Alert.alert(
                "Download Complete!",
                `${filename} has been downloaded successfully.`
            );
        } catch (error) {
            console.error("Error downloading file:", error);
            Alert.alert(
                "Download Error!",
                "There was an error downloading the file. Please try again later."
            );
        }
    };

    return (
        <Button
            onPress={downloadFile}
            style={styles.downloadButton}
            icon={<Download/>}
        ></Button>
    );
};
const styles = StyleSheet.create({
    fileList: {
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 5,
    },
    fileItem: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBlockColor: "white",
        borderWidth: 2,
        borderRadius: 12,
        padding: 5,
        paddingLeft: 10,
        borderColor: "white",
        marginBottom: 5,
    },
    fileName: {
        width: 285,
        fontSize: 10,
    },
    downloadButton: {
        backgroundColor: "#3498db",
    },
    deleteButton: {
        backgroundColor: "transparent",
    },
});
