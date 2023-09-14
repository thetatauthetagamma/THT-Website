import Link from 'next/link';
import React, {useState} from "react"
import Image from 'next/image';
import logo from 'images/tht-logo.png'


const Navbar = () => {
  return (
  <div>
      <nav className="flex flex-row border-b-2 border-red-800">
        
          <div className="justify-left">
              <Image
                  src={logo}
                  alt="Full Fraternity Photo"
                  className="w-14 pb-2 pt-2 pl-4 h-auto z-1"
              />
          </div>

          <div className="flex-grow">

          </div>

        <div>
          <ul className="flex md:flex-row flex-col md:justify-end py-4 gap-4 px-5 md:items-center justify-right text-right">
            <li className="mx-1">
              <Link legacyBehavior href="/">
                <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-xl ">Home</a>
              </Link>
            </li>
            <li className="mx-1">
              <Link legacyBehavior href="/members">
                <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-xl">Members</a>
              </Link>
            </li>
            <li className="mx-1">
              <Link legacyBehavior href="/rush">
                <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-xl">Rush</a>
              </Link>
            </li>
            <li className='mx-1'>
              <Link legacyBehavior href="/brothers">
                <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-xl">Brothers</a>
              </Link>
            </li>
          </ul>
        </div>
   
    </nav>
  </div>

  );
};

export default Navbar;
