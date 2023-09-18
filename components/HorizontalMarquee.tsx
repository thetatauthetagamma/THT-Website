// src/components/HorizontalMarquee.tsx
import React from 'react';
import FastMarquee from 'react-fast-marquee';
import Image from 'next/image';

import image1 from '../public/companies/1.jpg';
import image2 from '../public/companies/2.jpg';
import image3 from '../public/companies/3.jpg';
import image4 from '../public/companies/4.jpg';
import image5 from '../public/companies/5.jpg';
import image6 from '../public/companies/6.jpg';
import image7 from '../public/companies/7.jpg';
import image8 from '../public/companies/8.jpg';
import image9 from '../public/companies/9.jpg';
import image10 from '../public/companies/10.jpg';
import image11 from '../public/companies/11.jpg';
import image12 from '../public/companies/12.jpg';
import image13 from '../public/companies/13.jpg';
import image14 from '../public/companies/14.jpg';
import image15 from '../public/companies/15.jpg';
import image16 from '../public/companies/16.jpg';
import image17 from '../public/companies/17.jpg';
import image18 from '../public/companies/18.jpg';
import image19 from '../public/companies/19.jpg';
import image20 from '../public/companies/20.jpg';



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
            
            {firstrow.map((image, index) => (
              <div className='pl-4 pr-4' key={index}>
                <Image src={image} alt="companies" className="h-[8em] w-auto rounded-lg" />
              </div>
            ))}
          </FastMarquee>
          </div>
        );
     
    };
  
  export default HorizontalMarquee;