import {View} from '@/components/Themed';
import {Button} from 'react-native';
import {Text} from 'tamagui';
import {ImagePickerExample} from '@/components/ImagePicker';
import {useState} from 'react';
import axios from 'axios';
import {ImagePickerAsset} from 'expo-image-picker/src/ImagePicker.types';

export default function Posts() {
    const [image, setImage] = useState<ImagePickerAsset | null>(null);

    return (
        <View style={{flex: 1}}>
            <Button title={"Create Your Post"} onPress={async () => {
                if (image && image.base64 && image.mimeType) {
                    const response = await callChatGpt(image.base64, image.mimeType);
                }
            }}/>
            <Text>{process.env?.EXPO_PUBLIC_API_KEY}</Text>
            <ImagePickerExample image={image} setImage={setImage} />
        </View>
    )
}

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`
}

const callChatGpt = async (uri: string, mimetype: string) => {
    console.log(process.env.EXPO_PUBLIC_API_KEY)
    return axios.post<ChatCompletion>(
        'https://api.openai.com/v1/chat/completions',
        {
            model: "gpt-4-turbo",
            messages: [
                {
                    role: 'system',
                    content:
                        'you are an assistant that give simple answers questions. no longer than 50 charters',
                },
                {
                    role: "user",
                    content: [
                        {
                            "type": "text",
                            "text": "What’s in this image?"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": `data:image/${mimetype};base64,${uri}`
                            }
                        },
                    ]
                }

            ],
        }, {
            headers
        })
        .then((m) => {
            console.log(m.data)
            console.log(m.data.choices)
        }).catch(e => {
            console.log(e?.message)
        });
}

type ChatCompletion = {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    system_fingerprint: string;
};

type Choice = {
    index: number;
    message: {
        role: string;
        content: string;
    };
    logprobs: null | any;
    finish_reason: string;
};
