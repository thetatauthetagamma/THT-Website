import React, { useEffect, useState } from 'react';
import BroNavBar from '@/components/BroNavBar';
import MemberTile from '@/components/MemberTile';
import supabase from '../../supabase';

export default function MemberDirectory() {
  const [brothers, setBrothers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">
      <BroNavBar />
      <div className="flex-grow">
        <div className="flex-grow h-full m-4">
          <h1 className="font-bold text-4xl pb-4">Our Brothers</h1>
          <input
            type="text"
            placeholder="Search by brother first name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-800 rounded w-full mb-4"
          />
          <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
            {filteredBrothers.map((brother) => (
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
