import Image from 'next/image';
import gear from 'images/theta-tau-gear.png'
import React from 'react';
import HorizontalMarquee from '../components/HorizontalMarquee';

export default function members() {
    return (
      <div className='flex-grow flex-col'>
        <div className="bg-gray-50 flex flex-grow flex-col pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-left text-center text-[#8b0000]" >Executive Board</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
            
            <div className='flex-col text-center w-120 h-180 md:pb-0 pb-4'>
              <Image
                src={gear}
                alt="Gear icon"
                className='w-full h-full'
              />
              <h1 className="font-semibold" >Kirsten Knowles</h1>
              <h1 className="md:text-xs" >Regent</h1>
            </div>

            <div className='flex-col text-center w-120 h-180 md:pb-0 pb-4'>
              <Image
                src={gear}
                alt="Gear icon"
                className='w-full h-full'
              />
              <h1 className="font-semibold" >Sarah Douglas</h1>
              <h1 className=" md:text-xs" >Vice Regent</h1>
            </div>

            <div className='flex-col text-center w-120 h-180 md:pb-0 pb-4'>
              <Image
                src={gear}
                alt="Gear icon"
                className='w-full h-full'
              />
              <h1 className="font-semibold" >Kate McGraw</h1>
              <h1 className=" md:text-xs" >Scribe</h1>
            </div>

            <div className='flex-col text-center w-120 h-180 md:pb-0 pb-4'>
              <Image
                src={gear}
                alt="Gear icon"
                className='w-full h-full'
              />
              <h1 className="font-semibold" >Casey Kousoulas</h1>
              <h1 className="md:text-xs" >Treasurer</h1>
            </div>

            <div className='flex-col text-center w-120 h-180'>
                <Image
                  src={gear}
                  alt="Gear icon"
                  className='w-full h-full'
                />
                <h1 className="font-semibold" >Katie Bailey</h1>
                <h1 className="md:text-xs" >Corresponding Secretary</h1>
              </div>

           </div>
        </div>

        <div className="bg-white flex flex-grow flex-col pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2  text-[#8b0000] md:text-right text-center" >Brothers</h1>
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


           <div className='font-semibold pt-8 text-left flex flex-col'>
              <div className='pb-4 text-lg sm:text-2lg md:text-1xl lg:text-3xl font-bold mt-2  text-[#8b0000] text-left'>
                Theta Tau is
              </div>
              <div className="pt-4 pb-4">
                first and foremost a <b>brotherhood</b> of
                engineers. Being a brother of Theta Tau means that you
                have a community of brilliant men AND women not only on
                campus, but across the country that will see you as
                family. Being a brother means you hold a strong
                connection to a broad network of other engineers - a
                network that permeates through your academic,
                professional, and social life.
              </div>
              <div className="pt-4 pb-4">
                This network is a support structure that you can rely on
                in the face of struggles that you will face in your
                college career. Being a brother means being part of a
                community that you can depend on beyond the campus and
                throughout your life. Being a brother means building
                deep relationships with a diverse group of people who
                hold vast reservoir of insight and experience in many
                areas of life. The wealth of these experiences enrich
                your life and teach you lessons that you can't learn
                from the classroom or even a job. Being a brother means
                building a college experience that is incredibly unique
                and valuable.
              </div>
              <div className="pt-4 pb-4">
                When you ask someone why they joined Theta Tau,
                you'll probably get a diverse set of answers. Some
                join because they seek professional growth. Others
                join to meet more engineers in their major and
                across disciplines. Some are attracted to networking
                opportunities, or have heard that Theta Tau is the
                oldest and largest Professional Engineering
                Fraternity in the country.
              </div>
              <div className="pt-4 pb-4">
                However, when you ask someone why they stayed, and
                continue to participate in the Fraternity, you'll
                likely ever hear one answer. <b>It's the people</b>.
                Among all other things, it's the people, their
                values and their culture that make your college
                experience, and what you will remember years after
                you graduate. And this is especially true with Theta
                Gamma Chapter, which is made of some of the most
                diverse and extraordinary engineers you will ever
                meet. These people are going places.
              </div>
           </div>
        </div>




        <div className='pr-6 pl-6 md:pl-40 md:pr-40 pb-20'>
          <HorizontalMarquee />
        </div>
       





        <div className="bg-gray-50 flex flex-grow flex-col pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2  md:text-left text-center text-[#8b0000]" >Contact Us</h1>
           <div className="contact-info-content py-4 pt-4">
            <div className="info">
                <div className = "flex flex-col">
                    <a href="mailto:tht-eboard@umich.edu" className= "hover:text-gray-400   text-sm md:text-base font-semibold pb-4"> Executive Board  </a>
                    <a href="mailto:tht-regents@umich.edu" className= "hover:text-gray-400   text-sm md:text-base font-semibold pb-4"> Regent & Vice Regent  </a>
                    <a href="mailto:tht-corsec@umich.edu" className= "hover:text-gray-400   text-sm  md:text-base font-semibold pb-4"> Alumni & Interchapter Relations  </a>
                    <a href="mailto:tht-corporate@umich.edu" className= "hover:text-gray-400  text-sm  md:text-base font-semibold pb-4"> Cooporate & Sponsorship Events </a>
                </div>
            </div>
        </div>
        </div>
        
      </div>
    )
}