import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker/src/ImagePicker.types';

interface ImagePickerProps {
  setImage: (image: ImagePickerAsset | null) => void;
  image: ImagePickerAsset | null;
}


export  function ImagePickerExample({setImage,image}: ImagePickerProps) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
      base64:true
    });


    if (result.assets && result.assets.length > 0 ) {
      setImage(result.assets[0] ?? null);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: `data:image/${image.mimeType};base64,`+image.base64 }} style={styles.image} />}
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
