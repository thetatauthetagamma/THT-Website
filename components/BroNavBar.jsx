import React from 'react'
import Link from 'next/link';
import { useState, useEffect} from 'react';
import supabase from '@/supabase';


export default function BroNavBar({isPledge}) {
  const [userEmail, setUserEmail] = useState();
  const [userid, setuserid] = useState();
  const [firstname, setFirstname] = useState();

  const getGreeting = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return 'Good morning';
    } else if (currentTime >= 12 && currentTime < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession();
        if (session) {
          setUserEmail(session.data.session?.user.email || '');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const checkIfBrother = async () => {
      const { data, error } = await supabase
        .from('Brothers')
        .select('*')
        .eq('email', userEmail);
      if (data?.length === 1 && !error) {
        setFirstname(data[0].firstname);
        setuserid(userEmail.slice(0, -10)); // Move the setuserid here
      }
    };

    const isPledge = async () => {
      const { data, error } = await supabase
        .from('Pledges')
        .select('*')
        .eq('email', userEmail);
      if (data?.length === 1 && !error) {
        setFirstname(data[0].firstname);
      }
    };

    isPledge();
    checkIfBrother();
  }, [userEmail]);

  return (
    <div className="md:border-r-2 md:border-b-0 border-r-0 border-b-2 border-[#a3000020] flex-col justify-center items-center lg:w-1/4">
      <div className="pt-4 pl-6 pr-6 pb-4">
        <p className="font-bold text-xl bg-[#8b000070] p-4 rounded-md text-center mb-4">{getGreeting()}, {firstname}!</p>

          {
            isPledge? (    
              <ul className="space-y-2 font-bold space-5">
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href="/pledges/pledgecalendar" className="block p-2 rounded ">
                  <a >Calendar</a>
                </Link>
              </li>
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href="/pledges/progress" className="block p-2 rounded ">
                  <a >Your Progress</a>
                </Link>
              </li>
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href="/brothers/memberdirectory" className="block p-2 rounded ">
                  <a >Member Directory</a>
                </Link>
              </li> 
             </ul>
          )
          :
          (
            <ul className="space-y-2 font-bold space-5">
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href="/brothers" className="block p-2 rounded ">
                  <a >Calendar</a>
                </Link>
              </li>
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href={`/brothers/${userid}`} className="block p-2 rounded">
                    <a>My Profile</a>
                </Link>
              </li>
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href="/brothers/pledgetracking" className="block p-2 rounded ">
                  <a >Pledge Tracking</a>
                </Link>
              </li>
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href="/brothers/broresources" className="block p-2 rounded">
                  <a >Resources</a>
                </Link>
              </li>
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href="/brothers/memberdirectory" className="block p-2 rounded ">
                  <a >Member Directory</a>
                </Link>
              </li>
              <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
                <Link legacyBehavior href="/brothers/studybuddysearch" className="block p-2 rounded ">
                  <a> Study Buddy 🔎</a>
                </Link>
              </li>
              </ul>
          )
        }
      </div>
    </div>
  )
}
