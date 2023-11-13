import Image from 'next/image';
import gear from '../public/theta-tau-gear.png'
import React from 'react';
import HorizontalMarquee from '../components/HorizontalMarquee';
import KatieBailey from '../public/eboard/KatieBailey.jpeg';
import SarahDouglas from '../public/eboard/SarahDouglas.jpg';
import Casey from '../public/eboard/casey.jpg';
import KateMcGraw from '../public/eboard/kateM.jpg';
import Kirsten from '../public/eboard/kirsten.jpeg';
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

const firstrow = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10 , image11, image12, image13, image14, image15, image16, image17, image18, image19, image20];

export default function members() {
    return (
      <div className='flex-grow flex-col'>
        <div className="bg-gray-50 flex flex-grow flex-col pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4 border-b-2 border-[#8b000050]">
           <h1 className="pt-4 pb-4 text-3xl md:text-4xl font-bold mt-2 text-center text-[#8b0000]" >Executive Board</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
            
            <div className='flex-col text-center md:w-1/5 w-3/4 md:pb-0 pb-4 pr-1 pr-3 pl-3 md:self-start'>
              <Image
                src={Kirsten}
                alt="Gear icon"
                className='w-full h-full rounded-full'
              />
              <h1 className="font-semibold text-lg pt-4" >Kirsten Knowles</h1>
              <h1 className="md:text-lg text-md" >Regent</h1>
            </div>

            <div className='flex-col text-center md:w-1/5 w-3/4 md:pb-0 pb-4 pr-3 pl-3 md:self-start'>
              <Image
                src={SarahDouglas}
                alt="Gear icon"
                className='w-full h-full rounded-full'
              />
              <h1 className="font-semibold md:text-lg text-md pt-4" >Sarah Douglas</h1>
              <h1 className=" md:text-lg sm:text-sm text-md" >Vice Regent</h1>
            </div>

            <div className='flex-col text-center md:w-1/5 w-3/4 md:pb-0 pb-4 pr-3 pl-3 md:self-start'>
              <Image
                src={KateMcGraw}
                alt="Gear icon"
                className='w-full h-full rounded-full'
              />
              <h1 className="font-semibold md:text-lg text-md pt-4" >Kate McGraw</h1>
              <h1 className="md:text-lg text-md" >Scribe</h1>
            </div>

            <div className='flex-col text-center md:w-1/5 w-3/4 md:pb-0 pb-4  pr-3 pl-3 md:self-start'>
              <Image
                src={Casey}
                alt="Gear icon"
                className='w-full h-full rounded-full'
              />
              <h1 className="font-semibold md:text-lg text-md pt-4" >Casey Kousoulas</h1>
              <h1 className="md:text-lg text-md" >Treasurer</h1>
            </div>

            <div className='flex-col text-center md:w-1/5 w-3/4 pr-3 pl-3 md:self-start'>
                <Image
                  src={KatieBailey}
                  alt="Gear icon"
                  className='w-full h-full rounded-full'
                />
                <h1 className="font-semibold md:text-lg text-md pt-4" >Katie Bailey</h1>
                <h1 className="md:text-lg text-md" >Corresponding Secretary</h1>
              </div>

           </div>
        </div>

        <div className="bg-white flex flex-grow flex-col pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
           <h1 className="pt-4 pb-4 text-3xl md:text-4xl font-bold mt-2  text-[#8b0000] text-center" >Brothers</h1>
           <div className='flex flex-row md:pt-8 pt-4 justify-around items-center'>
            <div className='flex flex-col text-center'>
              <div className='font-bold text-[#8b0000] text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                70+
              </div>
              <div className='font-semibold text-[#8b000098] md:text-lg text-[15px]'>
                Active Members
              </div>

            </div>
            <div className='flex flex-col text-center'>
              <div className='font-bold text-[#8b0000] text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                15+
              </div>
              <div className='font-semibold text-[#8b000098] md:text-lg text-[15px]'>
                Different Majors
              </div>
              
            </div>
            <div className='flex flex-col text-center'>
              <div className='font-bold text-[#8b0000] text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                100%
              </div>
              <div className='font-semibold text-[#8b000098] md:text-lg text-[15px]'>
                Employment Rate
              </div>
            </div>
           </div>


           <div className='pt-8 text-left flex flex-col '>
              <div className='pb-4 text-3xl font-semibold mt-2  text-[#8b0000] text-left'>
                Theta Tau is
              </div>
              <div className="pt-4 pb-4 text-lg">
                first and foremost a brotherhood of engineers. 
                Being a brother of Theta Tau means that you have a community 
                of brilliant men AND women not only on campus, but across the 
                country that will see you as family. Being a brother means you 
                hold a strong connection to a broad network of other engineers - 
                a network that permeates through your academic, professional, and social life.
              </div>
              <div className="pt-4 pb-4 text-lg">
                This network is a support structure that you can rely on in the face of 
                struggles that you will face in your college career. Being a brother 
                means being part of a community that you can depend on beyond the campus 
                and throughout your life. Being a brother means building deep relationships 
                with a diverse group of people who hold vast reservoirs of insight and experience 
                in many areas of life. The wealth of these experiences enriches your life and 
                teaches you lessons that you can't learn from the classroom or even a job. 
                Being a brother means building a college experience that is incredibly 
                unique and valuable.
              </div>
              <div className="pt-4 pb-4 text-lg">
                When you ask someone why they joined Theta Tau, you'll probably get a 
                diverse set of answers. Some join because they seek professional growth. 
                Others join to meet more engineers in their major and across disciplines. 
                Some are attracted to networking opportunities or have heard that Theta Tau 
                is the oldest and largest Professional Engineering Fraternity in the country.
              </div>
              <div className="pt-4 pb-4 text-lg">
              However, when you ask someone why they stayed, and continue to participate 
              in the Fraternity, you'll likely never hear one answer. It's the people. 
              Among all other things, it's the people, their values, and their culture 
              that make your college experience, and what you will remember years after 
              you graduate. This is especially true with Theta Gamma Chapter, which is 
              made up of some of the most diverse and extraordinary engineers you will 
              ever meet. These people are going places.
              </div>
           </div>
        </div>




        <div className='pr-6 pl-6 md:pl-40 md:pr-40 pb-20 border-b-2 border-[#8b000050]'>
          <HorizontalMarquee images={firstrow}/>
        </div>
       





        
        
      </div>
    )
}