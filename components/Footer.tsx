import Link from 'next/link';
import React, {useState, useEffect} from "react"
import Image from 'next/image';
import logo from 'images/tht-logo.png'
import ig from 'images/insta.png'
import linked from 'images/linked-in.png'
import tiktok from 'images/tiktok.png'

const Footer = () => {
    return(
        <div className='flex flex-col bg-gray-50 justify-center'>
            <div className='text-center text-sm px-4 py-4 pt-6 md:text-base font-semibold'>
            © 2023 Theta Tau - Theta Gamma. All Rights Reserved.
            </div>
            <div className='flex flex-row justify-center items-center pb-6'>
                <a href="https://www.instagram.com/thetatau_umich/" className="pr-2 pl-2" target="">
                    <Image src={ig} alt="Instagram" className='w-5 h-5 hover:bg-gray-200'></Image>
                </a>
                <a href="https://www.linkedin.com/company/thetatauthetagamma/" className="pr-2 pl-2" target="">
                    <Image src={linked} alt="Linked-in" className='w-5 h-5 hover:bg-gray-200'></Image>
                </a>
                <a href="https://www.tiktok.com/@thetatau_umich" className="pr-2 pl-2" target="">
                    <Image src={tiktok} alt="Tiktok" className='w-5 h-5 hover:bg-gray-200'></Image>
                </a>
            </div>
            
        </div>
    );
};

export default Footer;