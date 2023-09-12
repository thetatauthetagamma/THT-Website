import React from 'react';
import Typed from 'react-typed';

interface TypewriterProps {
  words: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ words }) => {
    const typedStyle = {
        color: 'yellow', // Set the color to yellow
      };
    return (
    <Typed
        className = "text-yellow-300"
      strings={words}
      
      typeSpeed={80} // Adjust the typing speed as needed
      backSpeed={20} // Adjust the backspacing speed as needed
      loop
    />
  );
};

export default Typewriter;
