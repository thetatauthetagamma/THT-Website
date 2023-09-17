import Link from 'next/link';
import React, {useState, useEffect} from "react"
import Image from 'next/image';
import logo from 'images/tht-logo.png'
import cheveron from 'images/chevron.png'



const Navbar = () => {
  
    navState: Boolean;
    
    const [navState, setNavState] = useState('hidden')
    const [navState1, setNavState1] = useState('')
    
  

    const toggleMenuOn = () => {
      setNavState(navState => '');
      setNavState1(navState1 => 'hidden');
      console.log(navState);
    }

    const toggleMenuOff = () => {
      setNavState(navState => 'hidden');
      setNavState1(navState1 => '');
      console.log(navState);
    }

  
  return (
  <div className='bg-white'>
      
      
      
      <nav className="flex flex-row border-b-2 border-red-800">
        
        <div className="justify-left">
          <Image
            src={logo}
            alt="THT Logo"
            className="w-12 md:w-14 pb-2 pt-2 pl-2 h-auto z-1"
          />
        </div>

        <div className="flex-grow">

        </div>

        <script src="js/Navbar.js"></script>

        <div className='pr-6 pt-4 pb-4 justify-end items-center'>
          <button id='hamburger-button' className='text-3xl md:hidden cursor-pointer' onClick={toggleMenuOn}>
              &#9776;
          </button>
        </div>

        <div>
          <section className='hidden md:block space-x-8'>
            <ul className="flex flex-row justify-end py-6">
              <li className="mx-1">
                <Link legacyBehavior href="/">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg ">Home</a>
                </Link>
              </li>
              <li className="mx-1">
                <Link legacyBehavior href="/committees">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg ">Committees</a>
                </Link>
              </li>
              <li className="mx-1">
                <Link legacyBehavior href="/members">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg">Members</a>
                  
                </Link>
              </li>
              <li className="mx-1">
                <Link legacyBehavior href="/rush">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg">Rush </a>
                </Link>
              </li>
              <li className='mx-1'>
                <Link legacyBehavior href="/brothers">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg">Brothers</a>
                </Link>
              </li>
              
            </ul>
          </section>
        </div>
      </nav>
      

    
    <div className={navState}>
    <section id="mobile-menu" className={'bg-white top-0 w-full h-full absolute flex bg-white text-5xl flex-col justify-content-center origin-top animate-open-menu'} onClick={toggleMenuOff}>
        <button className='text-6xl self-end px-6 pt-2'>
          &times;
        </button>
        
        <nav aria-label='mobile'>
          <ul className="flex-grow flex-col justify-right px-6 text-right">
              <li className="mx-1">
                <Link legacyBehavior href="/">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg ">Home</a>
                </Link>
              </li>
              <li className="mx-1">
                <Link legacyBehavior href="/committees">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg ">Committees</a>
                </Link>
              </li>
              <li className="mx-1">
                <Link legacyBehavior href="/members">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg">Members</a>
                </Link>
              </li>
              <li className="mx-1">
                <Link legacyBehavior href="/rush">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg">Rush</a>
                </Link>
              </li>
              <li className='mx-1 pb-6'>
                <Link legacyBehavior href="/brothers">
                  <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-lg">Brothers</a>
                </Link>
              </li>
            </ul>
        </nav>
    </section>
    </div>

  </div>

  );
};

export default Navbar;