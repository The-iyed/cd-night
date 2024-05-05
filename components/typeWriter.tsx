import { useState, useEffect, FC } from 'react';
import {Text} from 'tamagui';
import {StyleSheet} from 'react-native';
import {Katex} from './Katex';

interface TypewriterProps {
  text: string;
  delay: number;
  infinite: boolean;
}

const Typewriter: FC<TypewriterProps> = ({ text, delay, infinite }) => {
  // const [currentText, setCurrentText] = useState<string>('');
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  //
  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //
  //   if (currentIndex <= text.length) {
  //     timeout = setTimeout(() => {
  //       setCurrentText(prevText => prevText + text[currentIndex]);
  //       setCurrentIndex(prevIndex => prevIndex + 1);
  //     }, delay);
  //
  //   } else if (infinite) { // ADD THIS CHECK
  //     setCurrentIndex(0);
  //     setCurrentText('');
  //   }
  //
  //   return () => clearTimeout(timeout);
  // }, [currentIndex, delay, infinite, text]);
  // console.log(currentText);
  const inlineText = 'inline text';
  const [loaded, setLoaded] = useState(false);
  const [expression, setExpression] = useState(
      `\\text{${inlineText} }c=\\pm\\sqrt{a^2 + b^2}`
  );
  setTimeout(
      () =>
          setExpression(
              `\\text{${inlineText} }d=\\pm\\sqrt{a^2 + b^2}\\text{ still}`
          ),
      2000
  );

  return (
      <Katex
          expression={expression}
          style={styles.katex}
          inlineStyle={inlineStyle}
          displayMode={false}
          throwOnError={false}
          errorColor="#f00"
          macros={{}}
          colorIsTextColor={false}
          onLoad={() => setLoaded(true)}
          onError={() => console.error('Error')}
      />
  );
}

export {Typewriter};

const inlineStyle = `
html, body {
  display: flex;
  background-color: #fafafa;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.katex {
  font-size: 4em;
  margin: 0;
  display: flex;
}
`;
const styles = StyleSheet.create({
  katex: {
    flex: 1,
  }
});