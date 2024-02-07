import React, { useEffect, useState } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import thtlogo from '../public/tht-logo.png'
import Image from 'next/image'
import supabase from '../supabase'
import moment from 'moment-timezone'
const PledgeTilePledgeView = ({ pledge }) => {
  //array of brother emails who pledge has interviewed:
  const [interviews, setInterviews] = useState(pledge.interviews)
  //array of brother firstname lastname who pledge has interviewed:
  const [interviewedBrothers, setInterviewedBrothers] = useState([])
  const [numInterviews, setNumInterviews] = useState(0)
  //number of pd requirements completed:
  const [pd, setPD] = useState(0)
  //array of pd sign offs key/val pairs where key corresponds to key of pdRequirementsList and value is bool:
  const [pdSOs, setpdSOs] = useState([])
  //number of committee sign offs
  const [numCommitteeSOs, setnumCommitteeSOs] = useState(0)
  //array of committee sign offs key/val pairs where key corresponds to key of committeeList and value is bool:
  const [committeeSignOffs, SetCommitteeSignOffs] = useState([])

  const [firstname, setFirstname] = useState('')

  const [userID, setUserID] = useState('')

  const [socialHours, setSocialHours] = useState(0)
  const [academicHours, setAcademicHours] = useState(0)

  const [countdown, setCountdown] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //key = supabase column, value = display value
  const pdRequirementList = {
    resume: 'Resume and Cover Letter',
    interview: 'Mock Interview',
    coResearch: 'Company Research',
    '4YrPlan': 'Four Year Class Plan',
    jobApp: 'Apply for a Job',
    linkedin: 'LinkedIn',
    alumPanel: 'Alumni Panel'
  }

  const committeeList = {
    apparel: 'Apparel',
    pd: 'PD',
    philanthropy: 'Philanthropy',
    recsports: 'Rec Sports',
    social: 'Social',
    diversity: 'Diversity',
    historian: 'Historian',
    web: 'Web',
    corsec: 'CorSec',
    socialMedia: 'Social Media'
  }
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession()
        if (session) {
          setUserID(session.data.session?.user.email || '')
        }
      } catch (error) {
        setUserID('')
      }
    }

    fetchSession()
  }, [userID])



  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().tz('America/Detroit').startOf('day')
      const eventDate = moment
        .tz('2024-04-14', 'YYYY-MM-DD', 'America/Detroit')
        .startOf('day')

      const remainingTime = eventDate.diff(now, 'days') // diff in days

      setCountdown(remainingTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  async function fetchInterviewedBrothers () {
    try {
      const { data, error } = await supabase
        .from('Brothers')
        .select('firstname, lastname')
        .in('email', interviews)
      if (error) throw error
      if (data) {
        setInterviewedBrothers(data)
        setNumInterviews(data.length)
      }

    } catch (error) {
      console.error('Error fetching interviewed brothers:', error)
    }
  }

  useEffect(() => {
    fetchInterviewedBrothers()
  }, [interviews, userID])

  useEffect(() => {
    fetchPledgeDetails()
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
        setInterviews(data[0].interviews)
        if (interviews) {
          setNumInterviews(data[0].interviews.length)
        }
        setAcademicHours(data[0].academicHours)
        setSocialHours(data[0].socialHours)
      } else {
      }
    } catch (error) {}
  }

  //gets the committee sign offs
  useEffect(() => {
    const fetchCommitteeSignoffs = async () => {
      const { data, error } = await supabase
        .from('CommitteeSignOffs')
        .select('*')
        .eq('pledge', pledge)

      if (data && data.length > 0) {
        const committeeSignOffCount = Object.values(data[0]).filter(
          value => value == true
        ).length
        SetCommitteeSignOffs(data)
        setnumCommitteeSOs(committeeSignOffCount)
      } else {
        console.log('error fetching data:', error)
      }
    }

    fetchCommitteeSignoffs()
  }, [userID])
  //gets the pd sign offs
  useEffect(() => {
    const fetchPDSignoffs = async () => {
      const { data, error } = await supabase
        .from('PDSignOffs')
        .select('*')
        .eq('pledge', pledge)
      if (data && data.length > 0) {
        const pdSignOffCount = Object.values(data[0]).filter(
          value => value == true
        ).length
        setpdSOs(data)
        setPD(pdSignOffCount)
      } else {
        console.log('error fetching data:', error)
      }
    }
    fetchPDSignoffs()
  }, [userID])

  return (
    <div className=' bg-gray-100 p-2 rounded-2xl mb-4 px-4 flex flex-col items-start flex-start'>
      <div className='flex font-bold text-4xl lg:text-6xl py-4'>
        Welcome {firstname}!
      </div>
      <div className='flex flex-wrap font-bold md:text-xl lg:text-4xl pb-4 text-xl'>
        You have
        <div className='inline-flex border-2 border-[#8b0000] rounded px-2 ml-2 mr-2'>
          {countdown}
        </div>
        days until pledge requirements are due.
      </div>

      <div className='pb-6 w-full'>
        <div className='text-lg'>
          {numInterviews == 0 || interviews.length <= 30 ? (
            <>
              You have completed {numInterviews} interviews. You have{' '}
              {30 - numInterviews} interviews remaining.
            </>
          ) : (
            <>
              You have completed {interviews?.length} interviews. You have 0
              interviews remaining.
            </>
          )}
        </div>
        <ProgressBar
          className='w-full py-2'
          completed={Math.round(((numInterviews | 0) * 100) / 30)}
          bgColor='#22c55e'
          height='40px'
        />
        <div>Brothers Interviewed:</div>
        <div className='flex flex-wrap gap-2'>
          {interviewedBrothers.map((brother, idx) => (
            <div
              key={idx}
              className='border-2 border-gray-400 rounded p-1 mt-2 text-center transition-transform transform-gpu hover:scale-105 hover:border-[#8b0000]'
            >
              {brother.firstname} {brother.lastname}
            </div>
          ))}
        </div>
      </div>
      <div className='pb-6 w-full border-t-2 border-[#a3000020] pt-1'>
        <div className='text-lg'>
          You have completed {numCommitteeSOs} committee sign offs. You have{' '}
          {10 - numCommitteeSOs} sign offs remaining.
        </div>

        <ProgressBar
          className='w-full py-2'
          completed={Math.round((numCommitteeSOs * 100) / 10)}
          bgColor='#22c55e'
          height='40px'
        />
        <div className='pt-2'>
          {' '}
          Sign Offs:
          <div className=''>
            {Object.keys(committeeList).map(key => (
              <div key={key} className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={committeeSignOffs[0]?.[key]}
                  readOnly
                  className='rounded accent-[#8b0000] p-2'
                />
                <label>{committeeList[key]}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full pb-6 border-t-2 border-[#a3000020] pt-1'>
        <div className='text-lg '>
          You have completed {pd} professional development sign offs. You have{' '}
          {7 - pd} sign offs remaining.
        </div>
        <ProgressBar
          className='w-full py-2'
          completed={Math.round((pd * 100) / 7)}
          bgColor='#22c55e'
          height='40px'
        />
        <div className='pt-2'>
          {' '}
          Sign Offs:
          <div className=''>
            {Object.keys(pdRequirementList).map(key => (
              <div key={key} className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={pdSOs[0]?.[key]}
                  readOnly
                  className='rounded accent-[#8b0000] p-2'
                />
                <label>{pdRequirementList[key]}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full pb-6 border-t-2 border-[#a3000020] pt-1'>
        <div className='text-lg '>
          You have completed {socialHours} social hours and {academicHours}{' '}
          academic hours. You have {40 - socialHours - academicHours} hours
          remaining.
        </div>
        <ProgressBar
          className='w-full py-2'
          completed={Math.round(((academicHours + socialHours) * 100) / 40)}
          bgColor='#22c55e'
          height='40px'
        />
      </div>
    </div>
  )
}

export default PledgeTilePledgeView
