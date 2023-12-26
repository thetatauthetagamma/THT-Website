import React, { useEffect, useState } from 'react';
import BroNavBar from '@/components/BroNavBar';
import MemberTile from '@/components/MemberTile';
import supabase from '../../supabase';
import Cookies from 'js-cookie';

export default function MemberDirectory() {
  const [brothers, setBrothers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isPledge, setIsPledge] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserEmail(Cookies.get('userEmail'));
  
    const fetchData = async () => {
      try {
        const [pledgeData, brothersData] = await Promise.all([
          supabase.from('Pledges').select('*').eq('email', userEmail),
          supabase.from('Brothers').select('*')
        ]);
  
        if (pledgeData.data?.length === 1 && !pledgeData.error) {
          setIsPledge(true);
        }
  
        if (brothersData.error) {
          throw brothersData.error;
        }
  
        if (brothersData.data) {
          const sortedData = brothersData.data.sort((a, b) => b.roll - a.roll);
          setBrothers(sortedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [userEmail]);
  

  const filteredBrothers = searchQuery
    ? brothers.filter(
        (brother) =>
          (brother.userid &&
            brother.userid.toLowerCase().includes(searchQuery.toLowerCase())) ||
          brother.firstname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : brothers;

    const majorFilteredBrothers = selectedMajor
    ? filteredBrothers.filter((brother) => {
        if (brother.major) {
          const normalizedMajor = brother.major.toLowerCase();
          const normalizedSelectedMajor = selectedMajor.toLowerCase();
  
          // Check for exact match for "CE" or "CEE"
          if (normalizedSelectedMajor === 'ce' && normalizedMajor === 'ce') {
            return true;
          } else if (normalizedSelectedMajor === 'ce' && normalizedMajor === 'cee') {
            return false;
          }
  
          return normalizedMajor.includes(normalizedSelectedMajor);
        }
  
        return false;
      }) 
    : filteredBrothers;

  const majors = ['Mech E', 'CS', 'CE', 'EE' , 'CEE', 'Chem E', 'Aero', 'Math', 'IOE', 'NAME', 'MSE'];

  if (loading) {
    return null; // Return nothing or a loading indicator
  }


  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">

      {isPledge ? <BroNavBar isPledge={true} /> : <BroNavBar isPledge={false} />  }
      <div className="flex-grow">
        <div className="flex-grow h-full m-4">
          <h1 className="font-bold text-4xl xs:max-sm:text-center pb-4">Our Brothers</h1>
          <div className='flex flex-col md:flex-row items-center md:item-center md:justify-start'>
            <input
              type="text"
              placeholder="Search by brother first name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-800 rounded w-full md:w-1/2 mb-4 md:mr-8"
            />
            <div className="mb-4 md:w-1/4">
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="p-2 border border-gray-800 rounded w-full"
              >
                <option value="">All Majors</option>
                {majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Display Brothers */}
          <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
            {majorFilteredBrothers.map((brother) => (
              <div key={brother.userid}>
                <MemberTile
                  userid={brother.userid}
                  firstname={brother.firstname}
                  lastname={brother.lastname}
                  year={brother.year}
                  major={brother.major}
                  roll={brother.roll}
                  linkedin={brother.linkedin}
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
