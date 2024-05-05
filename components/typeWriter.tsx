import {useState, useEffect, FC} from 'react';
import {Text} from 'tamagui';
import {View} from 'react-native';

interface TypewriterProps {
    text: string;
    delay: number;
    infinite: boolean;
}

const Typewriter: FC<TypewriterProps> = ({text, delay, infinite}) => {
    const [currentText, setCurrentText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (currentIndex <= text.length) {
            timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

        } else if (infinite) { // ADD THIS CHECK
            setCurrentIndex(0);
            setCurrentText('');
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);
    return (
        <View style={{ backgroundColor : '#fafafa' , borderRadius : 5 , padding : 5 , marginTop : 20}}>
            <Text style={{paddingTop: 10,color:"#000"}}>{currentText}</Text>
        </View>
    );
}

export {Typewriter};