import { useState, useEffect, FC } from 'react';
import {Text} from 'tamagui';
interface TypewriterProps {
  text: string;
  delay: number;
  infinite: boolean;
}

const Typewriter: FC<TypewriterProps> = ({ text, delay, infinite }) => {
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
      <Text>{currentText}</Text>
  );
}

export {Typewriter};