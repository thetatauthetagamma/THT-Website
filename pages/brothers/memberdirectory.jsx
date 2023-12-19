import React, { useEffect, useState } from 'react';
import BroNavBar from '@/components/BroNavBar';
import MemberTile from '@/components/MemberTile';
import supabase from '../../supabase';

export default function MemberDirectory() {
  const [brothers, setBrothers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState(''); // Add state for selected major

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

  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">
      <BroNavBar />
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
                className="p-4 border border-gray-800 rounded w-full"
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
