import {View, StyleSheet, Pressable} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {ImagePickerAsset} from "expo-image-picker/src/ImagePicker.types";
import {Image, Stack} from "tamagui";

interface ImagePickerProps {
    setImage: (image: ImagePickerAsset | null) => void;
    image: ImagePickerAsset | null;
}

export function ImagePickerExample({setImage, image}: ImagePickerProps) {
    const pickImage = async () => {
        console.log("clickd");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.8,
            base64: true,
        });

        if (result.assets && result.assets.length > 0) {
            setImage(result.assets[0] ?? null);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={pickImage}>

                <Image
                    style={{cursor: "pointer"}}
                    source={{
                        width: 40,
                        height: 35,
                        uri: "https://icons.veryicon.com/png/128/business/general-office-icon/general-download-file.png",
                    }}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: 100,
    },
});
