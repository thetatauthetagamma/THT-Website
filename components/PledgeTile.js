import React, { useEffect, useState } from 'react'
import Image from 'next/legacy/image'
import thtlogo from '../public/tht-logo.png'

import supabase from '../supabase'
import Router from 'next/router'

const PledgeTile = ({ pledge }) => {
  const [interviews, setInterviews] = useState(pledge.interviews)
  const [hasInterviewed, sethasInterviewed] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

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
          console.log(userID);
        }
       
      } catch (error) {
        console.log(error);
      }
      
    }

    fetchSession()
  }, [])

  useEffect(() => {
    fetchPledgeDetails()
    console.log('fetching pledge details')
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
        console.log(data)

        setFirstname(data[0].firstname)
        console.log(firstname)
        setLastname(data[0].lastname)
        console.log(lastname)
        setMajor(data[0].major)
        setPronouns(data[0].pronouns)
        setYear(data[0].year)
        setInterviews(data[0].interviews)
      } else {
        console.log(`Pledge with uniqname ${pledgeName} not found`)
      }
    } catch (error) {
      console.error('Error fetching pledge details:', error.message)
    }
  }

  
  async function checkBrotherInPledge() {
    try {
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
        console.log(userID);
        if (interviews && interviews.includes(userID)) {
          console.log(`${userID} is in the Interviews array for ${uniqname}`);
          sethasInterviewed(true);
        } else {
          console.log(`${userID} is not in the Interviews array for ${uniqname}`);
        }
      } else {
        console.log(`Pledge with uniqname ${pledge} not found`);
      }
    } catch (error) {
      console.error('Error checking brother in pledge:', error.message);
    }
  }

  useEffect(() => {
    const fetchPledgeImage = async () => {
      console.log('looking for image')

      const { data: ImageData, error } = await supabase.storage
        .from('pledges')
        .download(pledge)

      if (error) {
        console.log(error)
      } else {
        setImageUrl(URL.createObjectURL(ImageData))
      }
    }

    fetchPledgeImage()
  }, [])

  const handleInterviewClick = async () => {

    console.log(userID);

    
    const { data: existingPledgeData, error: existingPledgeError } =
      await supabase
        .from('Pledges')
        .select('interviews')
        .eq('uniqname', pledge)
        .single()
    const currentInterviews = existingPledgeData
      ? existingPledgeData.interviews || []
      : []
      console.log(userID);
    if (!currentInterviews.includes(userID) && !hasInterviewed) {

      // Add the loggedInBrotherId to the Interviews array
      const updatedInterviews = [...currentInterviews, userID]
      console.log(updatedInterviews)
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
        console.log(`Added ${userID} to the Interviews array for ${pledge}`)
      }
    } else {
      console.log(`${userID} is already in the Interviews array for ${pledge} Now removing.`)
      const updatedInterviews = currentInterviews.filter(item => item !== userID);
      console.log('Updated Interviews:', updatedInterviews);
  
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
    <div className='flex felx-row'>
      <div className='flex flex-col items-center pr-5'>
        <div className='mb-2 w-16 flex-start'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt='Pledge'
              className='rounded-lg w-4 h-auto'
            />
          ) : (
            <Image
              src={thtlogo}
              alt='Pledge'
              className='rounded-lg w-4 h-auto'
            />
          )}
        </div>
        <div className='text-center'>
          <p className='font-bold'>
            {firstname} {lastname}
          </p>
          <p>
            {year} | {pronouns}
          </p>
          <p>{major}</p>
        </div>
      </div>
      <div className='flex flex-col pl-10 pt-8'>
        <div>Number of Interviews: {interviews?.length}/30</div>
        <div>PD Requirements: </div>
        <div>Committee Sign offs: </div>
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
  <div className="text-sm mt-1">(Click to change)</div>

</button>
      </div>
    </div>
  )
}

export default PledgeTile
