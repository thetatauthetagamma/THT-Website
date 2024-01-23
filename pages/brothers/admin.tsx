import BroNavBar from "@/components/BroNavBar";
import { useState, useEffect } from 'react';
import supabase from '@/supabase';

export default function BroResources() {
  const [userID, setUserID] = useState('');
  const [adminRole, setAdminRole] = useState('');
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession()
        if (session) {
          setUserID(session.data.session?.user.email || '')
        }
      } catch (error) { }
    }

    fetchSession()
  }, [])


  useEffect(() => {
    const fetchAdminRole = async () => {
      try {
        const { data, error } = await supabase
          .from('Brothers')
          .select('adminrole')
          .eq('email', userID)

        if (error) {
          throw error
        }
        if (data) {

          setAdminRole(data[0].adminrole);

        }
      } catch (error) { }
    }

    fetchAdminRole();
  }, [userID])

  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">

      <BroNavBar isPledge={false} />
      <div className="flex flex-col m-5">
        <h1 className="flex flex-center text-lg">As {adminRole}, you can do the following things:</h1>
        {adminRole == 'parent' && (
          <div>
            <h1> Set PD Sign Offs</h1>
            <h1> Set Committee Sign Offs</h1>
            <h1> Set Required Number of Academic Hours</h1>
            <h1> Set Required Number of Social Hours</h1>
          </div>
        )}
        {(adminRole == 'regent' || adminRole == 'scribe') && (

          <div>
            <h1> Initiate Pledges</h1>
            <h1> Update EBoard</h1>
          </div>
        )}
      </div>
    </div>
  )
}
