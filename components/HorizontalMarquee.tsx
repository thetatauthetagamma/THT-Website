// src/components/HorizontalMarquee.tsx
import React from 'react';
import FastMarquee from 'react-fast-marquee';
import Image from 'next/image';

import image1 from 'images/companies/1.jpg';
import image2 from 'images/companies/2.jpg';
import image3 from 'images/companies/3.jpg';
import image4 from 'images/companies/4.jpg';
import image5 from 'images/companies/5.jpg';
import image6 from 'images/companies/6.jpg';
import image7 from 'images/companies/7.jpg';
import image8 from 'images/companies/8.jpg';
import image9 from 'images/companies/9.jpg';
import image10 from 'images/companies/10.jpg';
import image11 from 'images/companies/11.jpg';
import image12 from 'images/companies/12.jpg';
import image13 from 'images/companies/13.jpg';
import image14 from 'images/companies/14.jpg';
import image15 from 'images/companies/15.jpg';
import image16 from 'images/companies/16.jpg';
import image17 from 'images/companies/17.jpg';
import image18 from 'images/companies/18.jpg';
import image19 from 'images/companies/19.jpg';
import image20 from 'images/companies/20.jpg';



const HorizontalMarquee = () => {
    const firstrow = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10 , image11, image12, image13, image14, image15, image16, image17, image18, image19, image20];
  
      return (
        <div className="w-auto h-[10em]">
          <h2 className = "pb-8 text-lg sm:text-2lg md:text-1xl lg:text-3xl font-bold mt-2  text-[#8b0000] text-left"> We Work Here </h2>
          <FastMarquee
            speed={60}
            delay={0}
            pauseOnHover
            direction="left"
            gradient={false}
            className= "h-[8em] w-auto py-4"
            >
            {firstrow.map((image) => (
              <Image src={image} alt="companies" className="h-[8em] w-auto rounded-lg"></Image>
            ))}
          </FastMarquee>
          </div>
        );
     
    };
  
  export default HorizontalMarquee;