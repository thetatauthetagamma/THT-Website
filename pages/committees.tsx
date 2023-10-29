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
      
      <div className="flex flex-col md:flex-row bg-gray-50 justify-center flex-grow pr-6 pl-6 md:pr-40 md:pl-40 md:pt-8 md:pb-8 pt-4 pb-4 border-b-2 border-[#8b000050]">
        <div className="flex flex-col w-full md:w-[50%]">
           <h1 className="pt-4 pb-4 text-2xl md:text-4xl font-bold md:text-left text-center text-[#8b0000]" >Professional Development</h1>
           <div className="flex flex-col md:flex-row  md:text-md text-sm pt-4 pb-4">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
           incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
           exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
           dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum.
          </div>
        </div>
        <div className="w-full md:w-[50%] flex flex-grow justify-center items-center pt-4 pb-4">
          
            <Image
              src={frat}
              alt="Full Fraternity Photo"
              className="w-[80%] height-auto"
            />
          
        </div>
      </div>

      
        
    </div>
  );
}