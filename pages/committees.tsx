import Pd from "public/committees/Pd.jpg"
import Academic from "../public/committees/Academic.jpg"
import RecSports from "../public/committees/RecSports.jpg"
import Marketing from "../public/committees/Marketing.jpeg"
import Social from "../public/committees/Social.jpg"
import Brohood from "../public/committees/BroHood.jpg"
import wellness from "../public/committees/wellness.jpeg"
import diversity from "../public/committees/diversity.jpeg"
import philanthropy from "../public/committees/philanthropy.jpg"
import Image from 'next/image';
import Head from 'next/head'
import frat from '../public/fratphoto.jpg'



export default function committees() {
  return (
    <div className='flex-grow flex-col'>
      <div className=' pb-4'>
        <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow pr-4 pl-4 md:pr-32 lg:pr-64 md:pl-32 lg:pl-64 md:pt-8 md:pb-8 pt-4 pb-4 ">
          <div className="flex flex-col w-full items-center">
            <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Professional Development</h1>
            <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
              The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
            </div>
          </div>
          <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[100%] height-auto"
            />

          </div>
        </div>
      </div>

      <div className=' pb-4'>
        <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow pr-4 pl-4 md:pr-32 lg:pr-64 md:pl-32 lg:pl-64 md:pt-8 md:pb-8 pt-4 pb-4 ">
          <div className="flex flex-col w-full items-center">
            <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Brotherhood</h1>
            <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
              The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
            </div>
          </div>
          <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[100%] height-auto"
            />

          </div>
        </div>
      </div>


      <div className=' pb-4'>
        <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow pr-4 pl-4 md:pr-32 lg:pr-64 md:pl-32 lg:pl-64 md:pt-8 md:pb-8 pt-4 pb-4 ">
          <div className="flex flex-col w-full items-center">
            <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Philanthropy</h1>
            <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
              The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
            </div>
          </div>
          <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[100%] height-auto"
            />

          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row ">
        <div className='flex flex-grow pb-4 md:w-1/2 '>
          <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow px-4 md:px-16 md:pt-8 md:pb-8 pt-4 pb-4 ">
            <div className="flex flex-col w-full items-center">
              <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Pledge</h1>
              <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
                The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
              </div>
            </div>
            <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

              <Image
                src={frat}
                alt="Full Fraternity Photo"
                className="w-[100%] height-auto"
              />

            </div>
          </div>
        </div>


        <div className='flex flex-grow pb-4 md:w-1/2 md:pl-4'>
          <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow px-4 md:px-16  md:pt-8 md:pb-8 pt-4 pb-4 ">
            <div className="flex flex-col w-full items-center">
              <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Academic</h1>
              <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
                The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
              </div>
            </div>
            <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

              <Image
                src={frat}
                alt="Full Fraternity Photo"
                className="w-[100%] height-auto"
              />

            </div>
          </div>
        </div>


      </div>




      <div className="flex flex-col md:flex-row ">
        <div className='flex flex-grow pb-4 md:w-1/2 '>
          <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow px-4 md:px-16 md:pt-8 md:pb-8 pt-4 pb-4 ">
            <div className="flex flex-col w-full items-center">
              <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Social Media</h1>
              <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
                The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
              </div>
            </div>
            <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

              <Image
                src={frat}
                alt="Full Fraternity Photo"
                className="w-[100%] height-auto"
              />

            </div>
          </div>
        </div>


        <div className='flex flex-grow pb-4 md:w-1/2 md:pl-4'>
          <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow px-4 md:px-16  md:pt-8 md:pb-8 pt-4 pb-4 ">
            <div className="flex flex-col w-full items-center">
              <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Social</h1>
              <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
                The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
              </div>
            </div>
            <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

              <Image
                src={frat}
                alt="Full Fraternity Photo"
                className="w-[100%] height-auto"
              />

            </div>
          </div>
        </div>


      </div>


      <div className="flex flex-col md:flex-row ">
        <div className='flex flex-grow pb-4 md:w-1/2 '>
          <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow px-4 md:px-16 md:pt-8 md:pb-8 pt-4 pb-4 ">
            <div className="flex flex-col w-full items-center">
              <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Corporate</h1>
              <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
                The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
              </div>
            </div>
            <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

              <Image
                src={frat}
                alt="Full Fraternity Photo"
                className="w-[100%] height-auto"
              />

            </div>
          </div>
        </div>


        <div className='flex flex-grow pb-4 md:w-1/2 md:pl-4'>
          <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow px-4 md:px-16  md:pt-8 md:pb-8 pt-4 pb-4 ">
            <div className="flex flex-col w-full items-center">
              <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Diversity</h1>
              <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
                The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
              </div>
            </div>
            <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

              <Image
                src={frat}
                alt="Full Fraternity Photo"
                className="w-[100%] height-auto"
              />

            </div>
          </div>
        </div>


      </div>




      <div className="flex flex-col md:flex-row ">
        <div className='flex flex-grow pb-4 md:w-1/2 '>
          <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow px-4 md:px-16 md:pt-8 md:pb-8 pt-4 pb-4 ">
            <div className="flex flex-col w-full items-center">
              <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Wellness</h1>
              <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
                The Brotherhood Committee is an integral part of our organization, dedicated to fostering a strong sense of unity among brothers. Through planned events and activities, the committee aims to bring our brothers together, encouraging meaningful connections and a supportive environment. By nurturing bonds and promoting solidarity, the Brotherhood Committee plays a vital role in cultivating a closely-knit and supportive community within Theta Tau.
              </div>
            </div>
            <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

              <Image
                src={frat}
                alt="Full Fraternity Photo"
                className="w-[100%] height-auto"
              />

            </div>
          </div>
        </div>


        <div className='flex flex-grow pb-4 md:w-1/2 md:pl-4'>
          <div className="flex flex-col md:flex-col bg-gray-100 justify-center flex-grow px-4 md:px-16  md:pt-8 md:pb-8 pt-4 pb-4 ">
            <div className="flex flex-col w-full items-center">
              <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Historian</h1>
              <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
              Historian committee is responsible for capturing all the fun and professional moments we have as a brotherhood. Whether it’s playing games at retreat or taking headshots, we are there to save the memory for current and future brothers to look back on. 
              </div>
            </div>
            <div className="w-full  flex flex-grow justify-center items-center pt-4 pb-4">

              <Image
                src={frat}
                alt="Full Fraternity Photo"
                className="w-[100%] height-auto"
              />

            </div>
          </div>
        </div>


      </div>

    </div>



  );
}