import BroNavBar from "@/components/BroNavBar";
import { useState, useEffect } from 'react';
import supabase from '@/supabase';

export default function BroResources() {
  const [userID, setUserID] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [roleAssignments, setRoleAssignments] = useState({});
  const [pledges, setPledges] = useState<PledgeData[]>([]);
  const [editingMode, setEditingMode] = useState<boolean>(false);

  interface PledgeData {
    uniqname: string;
    firstname: string;
    lastname: string;
    major: string;
    year: number;
    pronouns: string;
    email: string;
    phone: string;
    linkedin: string;
    roll: string;
  }
  interface BrotherData {
    userid: string;
    firstname: string;
    lastname: string;
    major: string;
    year: number;
    pronouns: string;
    email: string;
    phone: string;
    linkedin: string;
    roll: string; 
  }
  
  useEffect(() => {
    
    fetchPledges();
  }, []);

  const fetchPledges = async () => {
    try {
      const { data, error } = await supabase.from('Pledges').select('uniqname, firstname, lastname, major, year, pronouns, email, phone, linkedin');

      if (error) {
        throw error;
      }

      if (data) {
        setPledges(data as PledgeData[]);
      }
    } catch (error) {
      console.error('Error fetching pledges:', error);
    }
  };

  const handleInitiatePledges = () => {
    setEditingMode(true);
  };

  const handleCancel = () => {
    setEditingMode(false);
  };

  const handleSubmit = async () => {
    try {
      const brothersData: BrotherData[] = pledges
        .filter(pledge => pledge.roll) // Filter pledges with role numbers
        .map(pledge => ({
          userid: pledge.uniqname,
          firstname: pledge.firstname,
          lastname: pledge.lastname,
          major: pledge.major,
          year: pledge.year,
          pronouns: pledge.pronouns,
          email: pledge.email,
          phone: pledge.phone,
          linkedin: pledge.linkedin,
          roll: '', // Assign role numbers here or retrieve from the input field
        }));

      const { data, error } = await supabase.from('Brothers').upsert(brothersData, { onConflict: ['userid'] });

      if (error) {
        throw error;
      }

      console.log('Brothers added successfully:', data);
    } catch (error) {
      console.error('Error adding brothers:', error);
    } finally {
      setEditingMode(false);
    }
  };


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
        {(adminRole === 'regent' || adminRole === 'scribe') && (
        <div>
           {editingMode ? (
              <div>
                {pledges.map(pledge => (
                  <div key={pledge.uniqname} className="flex flex-row m-4">
                    <p className="m-2">{`${pledge.firstname} ${pledge.lastname}`}</p>
                    <input
                      type="text"
                      placeholder="Assign Role Number"
                      className ="whitespace-nowrap w-30 text-center border-2 border-[#8b000070]"
                    />
                  </div>
                ))}
                <button onClick={handleCancel} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center">Cancel</button>
                <button onClick={handleSubmit} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center">Submit</button>
              </div>
            ) : (
              <button onClick={handleInitiatePledges} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center">Initiate Pledges</button>
            )}
          <h1> Update EBoard</h1>
        </div>
      )}
        {(adminRole == 'academic' || adminRole == 'webHead') && (

          <div>
            <h1>Archive Classes</h1>
          </div>
        )}
      </div>
    </div>
  )
}
