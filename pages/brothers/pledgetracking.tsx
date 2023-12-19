import { NextPage } from "next";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import PledgeTile from '../../components/PledgeTile'
import BroNavBar from "@/components/BroNavBar";

interface PledgeData {
  uniqname: string;
  firstname: string;
}

import React from 'react'

export default function pledgetracking() {

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
