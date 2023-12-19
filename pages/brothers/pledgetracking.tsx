import { NextPage } from "next";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import PledgeTile from '../../components/PledgeTile'
import BroNavBar from "@/components/BroNavBar";

interface PledgeData {
  uniqname: string;
  firstname: string;
}

const PledgeTracking: NextPage = () => {
  const [pledges, setPledges] = useState<PledgeData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const { data, error } = await supabase.from('Pledges').select('uniqname, firstname');
        
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

    fetchPledges();
  }, []);

  const filteredPledges = searchQuery
    ? pledges.filter(
        pledge =>
          pledge.uniqname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pledge.firstname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pledges;

    return (
      <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">
        <BroNavBar />
        <div className="flex-grow">
          <div className="flex-grow h-full m-4">
            <h1 className="font-bold text-4xl pb-4">Pledge Progress</h1>
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by pledge first name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-800 rounded w-full mb-4"
            />
            <div style={{ maxHeight: '550px', overflowY: 'auto' }} >
              {filteredPledges.map((pledge) => (
                <div key={pledge.uniqname}>
                  <PledgeTile pledge={pledge.uniqname} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

const ProtectedDashboard: NextPage = () => {
  const [isBrother, setIsBrother] = useState(false);
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
      if (userEmail) {
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
      <PledgeTracking />
    </>
  );
};

export default ProtectedDashboard;
