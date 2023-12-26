import BroNavBar from '@/components/BroNavBar'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import supabase from '@/supabase';
import ClassMemberTile from '@/components/ClassMemberTile';


export default function StudyBuddySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isPledge, setIsPledge] = useState('');
  const [brothers, setBrothers] = useState([]);

  useEffect(() => {
    setUserEmail(Cookies.get('userEmail'));

    const checkIfPledge = async () => {
      const { data, error } = await supabase.from('Pledges').select('*').eq('email', userEmail);
      if (data?.length === 1 && !error) {
        setIsPledge(true);
      }
    };

    checkIfPledge();
  }, [userEmail]);

  useEffect(() => {
    const fetchBrothers = async () => {
      try {
        const { data, error } = await supabase.from('Brothers').select('*');

        if (error) {
          throw error;
        }

        if (data) {
          // Assuming 'roll' is a number field in your database
          const sortedData = data.sort((a, b) => b.roll - a.roll);
          setBrothers(sortedData);
        }
      } catch (error) {
        console.error('Error fetching brothers:', error);
      }
    };

    fetchBrothers();
  }, []);

  const filteredBrothers = brothers.filter((brother) => {
    if (brother.classes && brother.major) {
      return (
        brother.classes.some((className) =>
          className.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        brother.major.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });

  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">
      {isPledge ? <BroNavBar isPledge={true} /> : <BroNavBar isPledge={false} />}

      <div className="flex-grow">
        <div className="flex-grow h-full m-4">
          <h1 className="font-bold text-4xl xs:max-sm:text-center pb-4">Find Study Buddies</h1>
          <input
            type="text"
            placeholder="Search by Class Name or Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-800 rounded w-full mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBrothers.map((brother) => (
              <div key={brother.userid}>
                <ClassMemberTile
                  userid={brother.userid}
                  firstname={brother.firstname}
                  lastname={brother.lastname}
                  email={brother.email}
                  phone={brother.phone}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
