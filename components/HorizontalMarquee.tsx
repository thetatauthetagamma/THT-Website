import React from 'react';
import FastMarquee from 'react-fast-marquee';
import Image from 'next/image';

// Define the type for the 'images' prop
interface HorizontalMarqueeProps {
  images: string[]; // Assuming 'images' is an array of image file paths
}

const HorizontalMarquee: React.FC<HorizontalMarqueeProps> = ({ images }) => {
  return (
    <div className="w-auto h-[10em]">
      <h2 className="pb-8 text-lg sm:text-2lg md:text-1xl lg:text-3xl font-bold mt-2 text-[#8b0000] text-left">
        We Work Here
      </h2>
      <FastMarquee
        speed={60}
        delay={0}
        pauseOnHover
        direction="left"
        gradient={false}
        className="h-[8em] w-auto py-4"
      >
        {images.map((image, index) => (
          <div className="pl-4 pr-4" key={index}>
            <Image src={image} alt="companies" className="h-[8em] w-auto rounded-lg" />
          </div>
        ))}
      </FastMarquee>
    </div>
  );
};

export default HorizontalMarquee;
