import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import thtlogo from '../public/tht-logo.png'
import Image from 'next/image'
import supabase from '../supabase'

const PledgeTile = ({ pledge }) => {
  const [interviews, setInterviews] = useState(pledge.interviews)
  const [hasInterviewed, sethasInterviewed] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [pd, setPD] = useState(0);
  const [committeeSO, setCommitteeSO] = useState(0);
  const [completed , setCompleted] = useState(0);

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [major, setMajor] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [year, setYear] = useState('')

  const [accessToken, setAccessToken] = useState('')
  const [events, setEvents] = useState([])
  const [pledgeName, setPledgeName] = useState('')
  const [userID, setUserID] = useState('')

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession()
        if (session) {
          setUserID(session.data.session?.user.email || '')
        }
       
      } catch (error) {
      }
      
    }

    fetchSession()
  }, [])

  useEffect(() => {
    fetchPledgeDetails()
    checkBrotherInPledge();
  }, [userID])

  async function fetchPledgeDetails () {
    try {
      const { data, error } = await supabase
        .from('Pledges')
        .select('*')
        .eq('uniqname', pledge)

      if (error) {
        throw error
      }

      if (data) {

        setFirstname(data[0].firstname)
        setLastname(data[0].lastname)
        setMajor(data[0].major)
        setPronouns(data[0].pronouns)
        setYear(data[0].year)
        setInterviews(data[0].interviews)
        setCommitteeSO(data[0].CommitteeSO)
        setPD(data[0].PD)
      } else {
      }
    } catch (error) {
    }
  }

  
  async function checkBrotherInPledge() {
    try {
      if(pledge)
      {
        const { data, error } = await supabase
          .from('Pledges')
          .select('uniqname, interviews')
          .eq('uniqname', pledge)
          .single();
    
        if (error) {
          throw error;
        }
    
        if (data) {
          // Check if brotherID exists in the Interviews array
          const { uniqname, interviews } = data;
          if (interviews && interviews.includes(userID)) {
            sethasInterviewed(true);
          } else {
          }
        } else {
        }
    }
    } catch (error) {
    }
  }

  useEffect(() => {
    const fetchPledgeImage = async () => {

    
      if(pledge)
      {
        const { data: ImageData, error } = await supabase.storage
        .from('pledges')
        .download(`${pledge}.jpeg`)

        console.log(`${pledge}.jpeg`)
        
        if(!error){
          setImageUrl(URL.createObjectURL(ImageData))
          console.log(URL.createObjectURL(ImageData))
        }
      }
    }

    fetchPledgeImage()
  }, [])

  useEffect(() => {
    const calculateProgress = async () => {
        setCompleted(Math.round((interviews?.length + pd + committeeSO) * 100 /44))
    }

    calculateProgress()
  }, [interviews, pd, committeeSO])

  const handleInterviewClick = async () => {
    const { data: existingPledgeData, error: existingPledgeError } =
      await supabase
        .from('Pledges')
        .select('interviews')
        .eq('uniqname', pledge)
        .single()
    const currentInterviews = existingPledgeData
      ? existingPledgeData.interviews || []
      : []
    if (!currentInterviews.includes(userID) && !hasInterviewed) {

      // Add the loggedInBrotherId to the Interviews array
      const updatedInterviews = [...currentInterviews, userID]
      // Update the "Interviews" array in the corresponding "Pledges" row
      const { data: updatedPledgeData, error: updatePledgeError } =
        await supabase.from('Pledges').upsert(
          [
            {
              uniqname: pledge,
              interviews: updatedInterviews
            }
          ],
          { onConflict: ['uniqname'] }
        )
      setInterviews(updatedInterviews)
      sethasInterviewed(true)
      if (updatePledgeError) {
        console.error(
          'Error updating Interviews array:',
          updatePledgeError.message
        )
      } else {
      }
    } else {
      const updatedInterviews = currentInterviews.filter(item => item !== userID);
  
      // Update the "Interviews" array in the corresponding "Pledges" row
      const { data: updatedPledgeData, error: updatePledgeError } =
        await supabase.from('Pledges').upsert(
          [
            {
              uniqname: pledge,
              interviews: updatedInterviews
            }
          ],
          { onConflict: ['uniqname'] }
        );
  
      setInterviews(updatedInterviews);
      sethasInterviewed(false);
    }
  }

  return (
    <div className='flex flex-row items-center bg-gray-100 p-2 rounded-2xl mb-4'>
      <div className='flex flex-col items-center w-3/12'>
        <div className='mb-2 w-40 h-40'>
          {imageUrl ?
           (<img
              src={imageUrl}
              alt='Pledge'
              className='rounded-full w-full h-full object-cover'
            />
           )
           :
           (
            <Image
            src={thtlogo}
            alt='logo'
            className='rounded-full w-full h-full object-cover'
            />
           )
          }
        </div>
        <div className='text-center'>
          <p className='font-bold'>
            {firstname} {lastname}
          </p>
          <p>
            {year} | {pronouns} | {major}
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center w-9/12'>
        <div className='flex flex-row items-center justify-evenly w-full'>
          <div className='flex flex-col items-center'>
            <p className='text-lg font-semibold mb-1'># of Interviews Done</p>
            <p className='text-lg font-bold'>{interviews?.length}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-lg font-semibold mb-1'># of PD Requirements Done</p>
            <p className='text-lg font-bold'>{pd}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-lg font-semibold mb-1'># of Committee Signoffs Done</p>
            <p className='text-lg font-bold'>{committeeSO}</p>
          </div>
        </div>
        <div className='flex flex-col items-center w-full p-2'>
          <ProgressBar className='w-full' completed={completed} bgColor='#22c55e' height='40px' />
        </div>
        <div className='flex flex-col items-center mt-4'>
          <button
            onClick={handleInterviewClick}
            className={`mt-2 ${
              hasInterviewed ? 'bg-green-500' : 'bg-red-500'
            } text-white py-2 px-4 rounded-md flex flex-col items-center justify-center`}
          >
            <span>
              {hasInterviewed
                ? `${firstname} has interviewed me`
                : `${firstname} has not interviewed me`}
            </span>
            <div className='text-sm mt-1'>(Click to change)</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PledgeTile;
