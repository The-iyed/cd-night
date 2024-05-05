import {Button} from 'react-native';
import {ScrollView, Text, View} from 'tamagui';
import {ImagePickerExample} from '@/components/ImagePicker';
import {useState} from 'react';
import axios from 'axios';
import {ImagePickerAsset} from 'expo-image-picker/src/ImagePicker.types';
import LottieView from 'lottie-react-native';
import {Typewriter} from '@/components/typeWriter';
import {YoutubeTranscript} from 'youtube-transcript';

export default function Posts() {
    const [image, setImage] = useState<ImagePickerAsset | null>(null);
    const [response, setResponse] = useState<ChatCompletion | null>(null);
    const [loading, setLoading] = useState(false);
    return (
        // <ScrollView style={{flex: 1}}>
        //     <Button title={"Create Your Post"} onPress={async () => {
        //         if (image && image.base64 && image.mimeType && process.env.EXPO_PUBLIC_API_KEY) {
        //             setLoading(true);
        //             const response = await callChatGpt(image.base64, image.mimeType).finally(()=>{
        //                 setLoading(false)
        //             });
        //             if(response) {
        //                 setResponse(response)
        //             }
        //         }
        //         // await YoutubeTranscript.fetchTranscript('https://youtu.be/KGMf314LUc0?si=HarBrICR-4lK-q7i').then((res)=>{
        //         //     console.log(res.reduce((r,b)=> r + " " + b.text,"").trim())
        //         //
        //         // }).catch(console.error);
        //     }}/>
        //     <Text>{process.env?.EXPO_PUBLIC_API_KEY}</Text>
        //     <ImagePickerExample image={image} setImage={setImage}/>
        //     {
        //         loading ? <LottieView
        //             autoPlay
        //             style={{
        //                 width: 200,
        //                 height: 200,
        //                 alignSelf: 'center'
        //             }}
        //             source={require('@/assets/images/lottie.json')}
        //             /> :
        //
        //         response && (
        //             <View>
        //                 <Typewriter text={response.choices[0].message.content} delay={1} infinite={false}/>
        //             </View>
        //         )
        //     }
        // </ScrollView>
        <Typewriter text={"response.choices[0].message.content"} delay={1} infinite={false}/>
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
                        'you are an assistant teacher that help students with their homework give explanations and answer questions if asked. provide links to helpful resources if needed.'
                },
                {
                    role: "user",
                    content: [
                        {
                            "type": "text",
                            "text": "explain the problem and give me helpful resources to solve it."
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
            max_tokens: 300
        }, {
            headers
        })
        .then((m) => {
            console.log(m.data)
            console.log(m.data.choices)
            return m.data;
        }).catch(error => {
            console.log(error)
            console.log(error.toJSON());
            if( error.response ){
                console.log(error.response.data); // => the response payload
            }
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
