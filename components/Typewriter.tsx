import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypewriterProps {
  words: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ words }) => {
  const sequenceWithDelays = words.flatMap((word, index) => [word, 750]);

  return (
    <TypeAnimation
      sequence={sequenceWithDelays}
      wrapper="span"
      speed={5}
      repeat={Infinity}
    />
  );
};

export default Typewriter;
