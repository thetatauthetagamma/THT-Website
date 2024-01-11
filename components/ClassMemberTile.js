import React from 'react'
import thtlogo from '../public/tht-logo.png'
import Image from 'next/image'
import { useEffect, useState } from "react";
import supabase from '../supabase';
import linkdenLogo from '../public/linked-in.svg'
import { Router , useRouter} from 'next/router';


export default function ClassMemberTile({userid, firstname, lastname, phone, email}) {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        const fetchPledgeImage = async () => {
          if (userid) {
            const { data: ImageData, error } = await supabase.storage
              .from('brothers')
              .download(`${userid}.jpeg`)
        
            if (!error) {
              setImageUrl(URL.createObjectURL(ImageData))
            }
          }
        }
    
        fetchPledgeImage()
    }, [])

    function handleClick()
    {
      router.push(`/members/${userid}`);
    }

  return (
    <div onClick={handleClick} className='flex flex-col items-center bg-gray-100 p-2 rounded-2xl mb-4'>
      <div  className='flex flex-col items-center w-3/12'>
          {imageUrl ? (
            <div className='mb-2 w-40 h-40'>
            <img
              src={imageUrl}
              alt='Pledge'
              className='rounded-full w-full h-full object-cover'
            />
            </div>
          ) : (
            <div className='mb-2 w-30 h-40'>
            <Image
              src={thtlogo}
              alt='logo'
              className='rounded-full w-full h-full object-cover'
            />
            </div>
          )}
      </div>
    <div className='flex flex-col items-center w-9/12'>
      <div className='flex flex-col items-center justify-evenly w-full pb-2'> 
            <div className='flex flex-col items-center mb-4'>
                <div className='text-2xl font-bold text-center'>
                    {firstname}
                </div>
                <div className='text-2xl font-bold text-center'>
                    {lastname}
                </div>
            </div>
            <div className='flex flex-col items-center justify-evenly w-full'>
                <div className='flex flex-col items-center p-2'>
                <p className='text-lg font-semibold mb-1'>Phone Number:</p>
                {
                  phone ? (<p className='text-lg'>{phone}</p>) : (<p className='text-lg'>(xxx)-xxx-xxxx</p>)
                }
                </div>
                <div className='flex flex-col items-center p-2'>
                <p className='text-lg font-semibold mb-1'>Email:</p>
                <p className='text-lg'>{email}</p>
                </div>
        </div>
      </div>
    </div>
</div>
  )
}
