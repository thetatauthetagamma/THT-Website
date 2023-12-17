import { NextPage } from "next";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import Custom404 from "../404";
import DateTimePicker from 'react-datetime-picker';
import {google} from 'googleapis';
import Link from 'next/link';
import PledgeTile from '../../components/PledgeTile'
const PledgeTracking: NextPage = () => {


  

  return (
    <div>
      <PledgeTile pledge="hari"></PledgeTile>
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