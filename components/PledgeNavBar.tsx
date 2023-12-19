import React from 'react'
import Link from 'next/link';


export default function PledgeNavBar() {
  return (
    <div className="md:border-r-2 md:border-b-0 border-r-0 border-b-2 border-[#a3000020] flex-col justify-center items-center lg:w-1/4">
      <div className="pt-4 pl-6 pr-6 pb-4">
        <ul className="space-y-2 font-bold space-5">
            <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
              <Link legacyBehavior href="/pledges/pledgecalendar" className="block p-2 rounded ">
                <a >Calendar</a>
              </Link>
            </li>
            <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
              <Link legacyBehavior href="/pledges/progress" className="block p-2 rounded ">
                <a >Your Progress</a>
              </Link>
            </li>
            <li className="hover:bg-[#8b000070] transition-colors duration-300 rounded flex-grow py-4 pl-2">
              <Link legacyBehavior href="/brothers/memberdirectory" className="block p-2 rounded ">
                <a >Member Directory</a>
              </Link>
            </li>
            
        </ul>
      </div>
    </div>
  )
}
