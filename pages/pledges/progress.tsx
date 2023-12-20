import PledgeTilePledgeView from  '../../components/PledgeTilePledgeView'
import React, { useEffect, useState } from 'react';
import supabase from '../../supabase';
import BroNavBar from "@/components/BroNavBar";


export default function progress() {
  const [userEmail, setUserEmail] = useState('');
  const [pledgeUniqname, setPledgeUniqname] = useState('')
  
  
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession();
        if (session) {
          setUserEmail(session.data.session?.user.email || '')
          console.log(userEmail)
        
        console.log(pledgeUniqname)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSession();
  }, []);


  useEffect(() => {
    const fetchSession = async () => {
        const truncatedEmail: string = userEmail.slice(0, -10);
        setPledgeUniqname(truncatedEmail)
    };

    fetchSession();
  }, [userEmail]);


  return (
    <div className="flex md:flex-row flex-col flex-grow  border-b-2 border-[#a3000020]">
      <BroNavBar isPledge={true}/>
      <div className="flex-grow">
      
        <div className="flex-grow h-full m-4">
          <PledgeTilePledgeView pledge={userEmail.slice(0, -10)}/>
        </div>
      </div>
    </div>
  );
};