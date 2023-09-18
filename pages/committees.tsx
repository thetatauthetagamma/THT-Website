import Pd from "images/committees/Pd.jpg"
import Academic from "../images/committees/Academic.jpg"
import RecSports from "../images/committees/RecSports.jpg"
import Marketing from "../images/committees/Marketing.jpeg"
import Social from "../images/committees/Social.jpg"
import Brohood from "../images/committees/BroHood.jpg"
import wellness from "../images/committees/wellness.jpeg"
import diversity from "../images/committees/diversity.jpeg"
import philanthropy from "../images/committees/philanthropy.jpg"
import Image from 'next/image';
import Head from 'next/head'
import frat from '../public/fratphoto.jpg'



export default function committees() {
  return (
    <div className='flex-grow flex-col'>
      
      <div className="flex flex-row bg-gray-50 flex-grow pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div className="flex flex-col w-[50%]">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-left text-center text-[#8b0000]" >Professional Development</h1>
           <div className="flex flex-col md:flex-row  md:text-md text-sm md:pt-8 pt-4 pb-4">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
           incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
           exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
           dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum.
          </div>
        </div>
        <div className="w-[50%] flex flex-grow justify-end items-center">
          <div className="">
            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[500px] height-auto"
            />
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-grow flex-row pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div>
            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[400px] h-[400px] rounded-full"
            />

        </div>
        <div className="flex flex-grow flex-col">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-right text-center text-[#8b0000]" >Corporate</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
          </div>
        </div>
        
      </div>


      <div className="bg-gray-50 flex flex-grow flex-row pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div className="flex flex-grow flex-col">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-left text-center text-[#8b0000]" >Philanthropy</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
          </div>
        </div>
        <div>
          <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[400px] h-[400px] rounded-full"
            />
        </div>
      </div>

      <div className="bg-white flex flex-grow flex-row pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div>
            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[400px] h-[400px] rounded-full"
            />

        </div>
        <div className="flex flex-grow flex-col">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-right text-center text-[#8b0000]" >Diversity</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
          </div>
        </div>
        
      </div>

      <div className="bg-gray-50 flex flex-grow flex-row pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div className="flex flex-grow flex-col">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-left text-center text-[#8b0000]" >Wellness</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
          </div>
        </div>
        <div>
        <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[400px] h-[400px] rounded-full"
            />
        </div>
      </div>
      
      <div className="bg-white flex flex-grow flex-row pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div>
            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[400px] h-[400px] rounded-full"
            />

        </div>
        <div className="flex flex-grow flex-col">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-right text-center text-[#8b0000]" >Brotherhood</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
          </div>
        </div> 
        
      </div>      
      
      <div className="bg-gray-50 flex flex-grow flex-row pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div className="flex flex-grow flex-col">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-left text-center text-[#8b0000]" >Fundraising</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
          </div>
        </div>
        <div>
          <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[400px] h-[400px] rounded-full"
            />
        </div>
      </div>

      <div className="bg-white flex flex-grow flex-row pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div>
            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[400px] h-[400px] rounded-full"
            />

        </div>
        <div className="flex flex-grow flex-col">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-right text-center text-[#8b0000]" >Recreational Sports</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">
          </div>
        </div>
        
      </div>


      <div className="flex flex-row flex-grow bg-gray-50 pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4">
        <div className="flex flex-grow flex-col">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold mt-2 md:text-left text-center text-[#8b0000]" >Website</h1>
           <div className="flex flex-col md:flex-row items-center justify-around md:text-md text-sm  md:pt-8 pt-4 pb-4  top-0">

          </div>
        </div>
        <div>
         <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[400px] h-[400px] rounded-full"
            />
        </div>
      </div>
        
    </div>
  );
}