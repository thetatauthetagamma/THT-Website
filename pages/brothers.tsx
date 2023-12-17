import { NextPage } from "next";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import Custom404 from "./404";
import DateTimePicker from 'react-datetime-picker';
import {google} from 'googleapis';
import Link from 'next/link';

const Brothers: NextPage = () => {

  const [accessToken, setAccessToken] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the access token when the component mounts
    const fetchAccessToken = async () => {
      try {
        const session = await supabase.auth.getSession();
        if (session) {
          const access_token = session.data.session?.access_token || ''
          setAccessToken(access_token);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccessToken();
  }, []);

  
  useEffect(() => {
    // Use the accessToken to make authenticated requests to the Google Calendar API
    // Fetch and set the events in the state.
  }, [accessToken]);

  
  return (
    <div className="flex md:flex-row flex-col flex-grow  border-b-2 border-[#a3000020]">
      <div className="md:border-r-2 md:border-b-0 border-r-0 border-b-2 border-[#a3000020] flex-col justify-center items-center lg:w-1/4">
        <div className="pt-4 pl-6 pr-6 pb-4">
        <ul className="space-y-2 font-bold space-5">
          <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow py-4 ">
                <Link legacyBehavior href="/brothers/pledgetracking" className="block p-2 rounded ">
                  <a >Pledge Tracking</a>
                </Link>
              </li>
              <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow py-4">
                <Link legacyBehavior href="/brothers/broresources" className="block p-2 rounded">
                  <a >Resources</a>
                </Link>
              </li>
              <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow py-4">
                <Link legacyBehavior href="/brothers/pledgetracking" className="block p-2 rounded ">
                  <a >Member Directory</a>
                </Link>
              </li>
          
        </ul>
        </div>
      </div>

      <div className="flex-grow">
      
        <div className="flex-grow h-full m-4">
          <iframe src="https://calendar.google.com/calendar/embed?src=umich.edu_4prg15q589p918cu4tc39v95ng%40group.calendar.google.com&ctz=America%2FDetroit" className="flex-grow h-5/6 w-full"></iframe>
        </div>
      </div>
    </div>
  );
};

export default function ProtectedDashboard() {

  const [isBrother, setIsBrother] = useState(false)
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
      if (userEmail) { // Check if userEmail is not empty
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
      {
        isBrother ? (<Brothers />) : (<Custom404 />)
      }
    </>
  )
}