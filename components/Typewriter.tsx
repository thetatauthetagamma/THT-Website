import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypewriterProps {
  words: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ words }) => {
  const sequenceWithDelays = words.flatMap((word, index) => {
    // Add a delay after each word except for the last one
    return index === words.length - 1 ? [word] : [word, 750];
  });

  return (
    <TypeAnimation
      sequence={sequenceWithDelays}
      wrapper="span"
      speed={1}
      repeat={Infinity}
    />
  );
};

export default Typewriter;






