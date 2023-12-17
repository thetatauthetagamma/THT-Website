import { NextPage } from "next";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import Custom404 from "../404";
import DateTimePicker from 'react-datetime-picker';
import {google} from 'googleapis';
import Link from 'next/link';
import PledgeTile from '../../components/PledgeTile'


const PledgeTracking: NextPage = () => {
  const [pledges, setPledges] = useState(['']);
  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const { data, error } = await supabase.from('Pledges').select('uniqname');
        console.log(data);
        
        if (error) {
          throw error;
        }

        if (data) {
          const uniqnames = data.map((item) => item.uniqname);
          setPledges(uniqnames);
          console.log(uniqnames);
        }
      } catch (error) {
        console.error('Error fetching pledges:');
      }
    };

    fetchPledges();
  }, []);
  
  
  return (

    <div className="flex md:flex-row flex-col flex-grow  border-b-2 border-[#a3000020]">
    <div className="md:border-r-2 md:border-b-0 border-r-0 border-b-2 border-[#a3000020] flex-col justify-center items-center lg:w-1/4">
      <div className="pt-4 pl-6 pr-6 pb-4">
      <ul className="space-y-2 font-bold space-5">
          <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow py-4">
                <Link legacyBehavior href="/brothers/pledgetracking" className="block p-2 rounded ">
                  <a >Pledge Tracking</a>
                </Link>
              </li>
              <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow py-4">
                <Link legacyBehavior href="/brothers/broresources" className="block p-2 rounded">
                  <a >Resources</a>
                </Link>
              </li>
              <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow py-4">
                <Link legacyBehavior href="/brothers/pledgetracking" className="block p-2 rounded ">
                  <a >Member Directory</a>
                </Link>
              </li>
          
        </ul>
      </div>
    </div>

    <div className="flex-grow">
    
      <div className="flex-grow h-full m-4">
        <h1 className= "font-bold text-4xl pb-4">Pledge Progress</h1>
      <div>
      {pledges.map((uniqname) => (
        <div key={uniqname}>
          <PledgeTile pledge={uniqname} />
        </div>
      ))}
    </div>
      </div>
    </div>
  </div>
   
  )
}


export default function ProtectedDashboard() {

  const [isBrother, setIsBrother] = useState(false)
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession();
        if (session) {
          console.log(session)
          setUserEmail(session.data.session?.user.email || '')
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const checkIfBrother = async () => {
      if (userEmail) { // Check if userEmail is not empty
        const { data, error } = await supabase.from('Brothers').select('*').eq('email', userEmail);
        if (data?.length === 1 && !error) {
          setIsBrother(true);
        }
        console.log(data);
      }
    }
  
    checkIfBrother();
  }, [userEmail]);
  

  return (
    <>
      {
        isBrother ? (<PledgeTracking />) : (<Custom404 />)
      }
    </>
  )
}