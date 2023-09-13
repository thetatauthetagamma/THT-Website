import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypewriterProps {
  words: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ words }) => {
    return (
      <TypeAnimation
        sequence={words}
        wrapper="span"
        speed={40}
        repeat={Infinity}
      />
  );
};

export default Typewriter;
