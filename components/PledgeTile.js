import React, { useEffect, useState } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import thtlogo from '../public/tht-logo.png'
import trash from '../public/trash-can.png'
import Image from 'next/image'
import supabase from '../supabase'

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from '@nextui-org/react'

const PledgeTile = ({ pledge, fetchPledges }) => {
  const [interviews, setInterviews] = useState(pledge.interviews)
  const [hasInterviewed, sethasInterviewed] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [pd, setPD] = useState(0)
  const [pdSOs, setpdSOs] = useState([])
  const [numCommitteeSOs, setnumCommitteeSOs] = useState(0)
  const [committeeSignOffs, SetCommitteeSignOffs] = useState([])
  const [completed, setCompleted] = useState(0)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [major, setMajor] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [year, setYear] = useState('')

  const [userID, setUserID] = useState('')

  const [socialHours, setSocialHours] = useState(0)
  const [academicHours, setAcademicHours] = useState(0)

  //used for committee sign off button:
  const [selectedCommittee, setSelectedCommittee] = useState('')
  const [selectedPDSO, setselectedPDSO] = useState('')

  const [isAdmin, setIsAdmin] = useState(false)

  const [editableFields, setEditableFields] = useState({
    academicHours: false,
    socialHours: false
  })



  //key = supabase column, value = display value
  const pdRequirementList = {
    resume: 'Resume and Cover Letter',
    interview: 'Mock Interview',
    careerChat: 'Career Coffee Chat',
    coResearch: 'Company Research',
    '4YrPlan': 'Four Year Class Plan',
    jobApp: 'Apply for a Job'
  }

  const committeeList = {
    brohood: 'Brotherhood',
    pd: 'PD',
    philanthropy: 'Philanthropy',
    recsports: 'Rec Sports',
    social: 'Social',
    diversity: 'Diversity',
    historian: 'Historian',
    corsec: 'CorSec'
  }
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession()
        if (session) {
          setUserID(session.data.session?.user.email || '')
        }
      } catch (error) {}
    }

    fetchSession()
  }, [])

  useEffect(() => {
    fetchPledgeDetails()
    checkBrotherInPledge()
  }, [userID, editableFields])

  useEffect(() => {
    const fetchAdminRole = async () => {
      try {
        const { data, error } = await supabase
          .from('Brothers')
          .select('adminrole')
          .eq('email', userID)

        if (error) {
          throw error
        }
        if (data) {
          if (data[0].adminrole == 'parent') {
            setIsAdmin(true)
          }
        }
      } catch (error) {}
    }
    fetchAdminRole()
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
        setAcademicHours(data[0].academicHours)
        setSocialHours(data[0].socialHours)
      } else {
      }
    } catch (error) {}
  }

  async function checkBrotherInPledge () {
    try {
      if (pledge) {
        const { data, error } = await supabase
          .from('Pledges')
          .select('uniqname, interviews')
          .eq('uniqname', pledge)
          .single()

        if (error) {
          throw error
        }

        if (data) {
          // Check if brotherID exists in the Interviews array
          const { uniqname, interviews } = data
          if (interviews && interviews.includes(userID)) {
            sethasInterviewed(true)
          } else {
          }
        } else {
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    const fetchPledgeImage = async () => {
      if (pledge) {
        const { data: ImageData, error } = await supabase.storage
          .from('pledges')
          .download(`${pledge}.jpeg`)

        if (!error) {
          setImageUrl(URL.createObjectURL(ImageData))
        }
      }
    }

    fetchPledgeImage()
  }, [])

  useEffect(() => {
    const calculateProgress = async () => {
      let interviewNum = interviews?.length
      if (interviewNum >= 30) {
        interviewNum = 30
      }
      setCompleted(
        Math.round(
          ((interviewNum + pd + numCommitteeSOs + socialHours + academicHours) *
            100) /
            74
        )
      )
    }

    calculateProgress()
  }, [interviews, pd, numCommitteeSOs])

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

        setnumCommitteeSOs(committeeSignOffCount)
      } else {
        console.log('error fetching data:', error)
      }
    }
    fetchCommitteeSignoffs()
  }, [selectedCommittee])

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

        setPD(pdSignOffCount)
      } else {
        console.log('error fetching data:', error)
      }
    }
    fetchPDSignoffs()
  }, [selectedPDSO])

  const handleCommitteeSignOffSubmit = async () => {
    try {
      // Make sure a committee is selected
      if (!selectedCommittee) {
        console.error('Please select a committee')
        return
      }

      // Update the selected committee sign-off value to true in Supabase
      const { error } = await supabase.from('CommitteeSignOffs').upsert(
        [
          {
            pledge,
            [selectedCommittee]: true
          }
        ],
        { onConflict: ['pledge'] }
      )

      if (error) {
        console.error('Error updating committee sign-off:', error.message)
      } else {
        const { data: existingPledgeData, error: existingPledgeError } =
          await supabase
            .from('CommitteeSignOffs')
            .select('brotherSO')
            .eq('pledge', pledge)
            .single()

        const currentCommitteeBros = existingPledgeData
          ? existingPledgeData.brotherSO || []
          : []

        const updatedCommitteeBros = [...currentCommitteeBros, userID]

        const { error } = await supabase.from('CommitteeSignOffs').upsert(
          [
            {
              pledge,
              brotherSO: updatedCommitteeBros
            }
          ],
          { onConflict: ['pledge'] }
        )
        window.alert(
          `You have signed off ${pledge} for their ${committeeList[selectedCommittee]} successfully.`
        )
        setSelectedCommittee('')
        // Optionally, you can refetch the committee sign-offs data here
      }
    } catch (error) {
      console.error('Error updating committee sign-off:', error.message)
    }
  }

  const handlePDSignOff = async () => {
    try {
      // Make sure a committee is selected
      if (!selectedPDSO) {
        console.error('Please select a committee')
        return
      }

      // Update the selected committee sign-off value to true in Supabase
      const { error } = await supabase.from('PDSignOffs').upsert(
        [
          {
            pledge,
            [selectedPDSO]: true
          }
        ],
        { onConflict: ['pledge'] }
      )

      if (error) {
        console.error('Error updating committee sign-off:', error.message)
      } else {
        const { data: existingPledgeData, error: existingPledgeError } =
          await supabase
            .from('PDSignOffs')
            .select('brotherSO')
            .eq('pledge', pledge)
            .single()

        const currentPDBrothers = existingPledgeData
          ? existingPledgeData.brotherSO || []
          : []

        const updatedPDBrothers = [...currentPDBrothers, userID]

        const { error } = await supabase.from('PDSignOffs').upsert(
          [
            {
              pledge,
              brotherSO: updatedPDBrothers
            }
          ],
          { onConflict: ['pledge'] }
        )

        window.alert(
          `You have signed off ${pledge} for their ${pdRequirementList[selectedPDSO]} activity successfully.`
        )
        setselectedPDSO('')

        // Optionally, you can refetch the committee sign-offs data here
      }
    } catch (error) {
      console.error('Error updating committee sign-off:', error.message)
    }
  }

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
      const updatedInterviews = currentInterviews.filter(
        item => item !== userID
      )

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
      sethasInterviewed(false)
    }
  }

  const handleSave = async () => {
    try {
      // Update the user's profile in Supabase with the new values
      const { data, error } = await supabase
        .from('Pledges')
        .update([
          {
            academicHours,
            socialHours
          }
        ])
        .eq('uniqname', pledge)

      if (!error) {
        console.log('Pledge hours updated successfully')
        // Optionally reset editableFields state to hide input fields
        setEditableFields({
          academicHours: false,
          socialHours: false
        })
      } else {
        console.error('Error updating profile:', error.message)
      }
    } catch (error) {
      console.error('Error updating profile:', error.message)
    }
  }

  const handleFieldEdit = () => {
    setEditableFields(prevFields => ({
      ...prevFields,
      academicHours: !prevFields.academicHours,
      socialHours: !prevFields.socialHours
    }))
    if (!editableFields.academicHours) {
      setAcademicHours(academicHours) // Use the initial state or fetch it from the server
    }

    if (!editableFields.socialHours) {
      setSocialHours(socialHours) // Use the initial state or fetch it from the server
    }
  }

  const handleDeletePledge = async () => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this pledge? All of their data will be deleted.'
    )

    // If the user confirms, proceed with deletion
    if (isConfirmed) {
      // Perform the Supabase deletion operation
      const { data, error } = await supabase
        .from('Pledges')
        .delete()
        .eq('uniqname', pledge)

      // Handle any errors or update UI accordingly
      if (error) {
        console.error('Error deleting pledge:', error.message)
      } else {
        fetchPledges()
      }
      const { data1, error1 } = await supabase
        .from('PDSignOffs')
        .delete()
        .eq('pledge', pledge)

      // Handle any errors or update UI accordingly
      if (error) {
        console.error('Error deleting pledge:', error1.message)
      } else {
      }
      const { data2, error2 } = await supabase
        .from('CommitteeSignOffs')
        .delete()
        .eq('pledge', pledge)

      // Handle any errors or update UI accordingly
      if (error) {
        console.error('Error deleting pledge:', error2.message)
      } else {
      }
    }
  }

  return (
    <div className='flex flex-col md:flex-row items-center bg-gray-100 p-2 rounded-2xl mb-4'>
      <div className='flex flex-col items-center md:w-3/12'>
        <div className='mb-2 w-40 h-40'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt='Pledge'
              className='rounded-full w-full h-full object-cover'
            />
          ) : (
            <Image
              src={thtlogo}
              alt='logo'
              className='rounded-full w-full h-full object-cover'
            />
          )}
        </div>

        <div className='text-center'>
          <p className='font-bold'>
            {firstname} {lastname}
          </p>
          <p>
            {year} | {pronouns} | {major}
          </p>
          {isAdmin && (
            <div className='flex flex-col md:flex-row items-center justify-evenly w-full'>
              {!Object.values(editableFields).some(field => field) ? (
                <button
                  className='font-bold m-2 text-md bg-[#8b000070] p-2 rounded-md text-center'
                  onClick={handleFieldEdit}
                >
                  Edit
                </button>
              ) : (
                <div className='flex flex-row m-2 items-center'>
                  <button
                    className='font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center h-10'
                    onClick={handleDeletePledge}
                  >
                    <Image
                      src={trash}
                      alt='logo'
                      className='rounded-full w-full h-full object-cover'
                    />
                  </button>
                  <button
                    className='font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center'
                    onClick={handleFieldEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className='font-bold text-md bg-[#8b000070] p-2 rounded-md text-center'
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col items-center w-9/12'>
        <div className='flex flex-col md:flex-row items-center justify-evenly w-full pb-2'>
          <div className='flex flex-col items-center p-2 '>
            <p className='text-sm font-bold mb-1'># of Interviews</p>
            <p className='text-sm'>{interviews?.length | 0}</p>
          </div>
          <div className='flex flex-col items-center md:border-x-2 border-black p-2'>
            <p className='text-sm text-center font-bold mb-1'>
              # of PD Activities
            </p>
            <p className='text-sm'>{pd}</p>
          </div>
          <div className='flex flex-col items-center p-2'>
            <p className='text-sm text-center font-bold mb-1'>
              # of Committee Signoffs
            </p>
            <p className='text-sm'>{numCommitteeSOs}</p>
          </div>
          <div className='flex flex-col items-center md:border-x-2 border-black p-2'>
            <p className='text-sm text-center font-bold mb-1'>
              # of Social Hours
            </p>
            <p className='text-sm'>
              {editableFields.socialHours && isAdmin ? (
                <input
                  type='text'
                  placeholder={socialHours}
                  value={socialHours}
                  onChange={e => setSocialHours(e.target.value)}
                  className='whitespace-nowrap w-30 text-center border-2 border-[#8b000070]'
                />
              ) : (
                `${socialHours}`
              )}
            </p>
          </div>
          <div className='flex flex-col items-center p-2'>
            <p className='text-sm text-center font-bold mb-1'>
              # of Academic Hours
            </p>
            <p className='text-sm'>
              {' '}
              <p className='text-sm'>
                {editableFields.academicHours && isAdmin ? (
                  <input
                    type='text'
                    placeholder={academicHours}
                    value={academicHours}
                    onChange={e => setAcademicHours(e.target.value)}
                    className='whitespace-nowrap w-30 text-center border-2 border-[#8b000070]'
                  />
                ) : (
                  `${academicHours}`
                )}
              </p>
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center w-full p-2'>
          <ProgressBar
            className='w-full'
            completed={completed}
            bgColor='#22c55e'
            height='40px'
          />
        </div>
        <div className='flex flex-col md:flex-row items-center m-4 w-full justify-evenly'>
          {/* Interview Button (to the left) */}
          <button
            onClick={handleInterviewClick}
            className={`flex-start ${
              hasInterviewed ? 'bg-green-500' : 'bg-red-500'
            } text-white py-2 px-2 rounded-md flex flex-col items-center m-2 justify-center md:w-1/4 hover:scale-105`}
          >
            <span>
              {hasInterviewed
                ? `${firstname} has interviewed me`
                : `${firstname} has not interviewed me`}
            </span>
          </button>

          {/* Centered Buttons (Committee Dropdown and Submit) */}
          <div className='flex items-center justify-center  m-2 md:w-1/3'>
            {/* Committee Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <button className='bg-gray-500 text-white p-2 rounded-md'>
                  {pdRequirementList[selectedPDSO] || 'Select PD Activity ▼'}
                </button>
              </DropdownTrigger>
              <DropdownMenu className='bg-gray-200 rounded-md'>
                <DropdownSection>
                  <DropdownItem
                    onClick={() => {
                      setselectedPDSO('coResearch')
                    }}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Company Research
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setselectedPDSO('resume')
                    }}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Resume and Cover Letter
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setselectedPDSO('jobApp')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Apply for a Job
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setselectedPDSO('careerChat')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Career Coffee Chat
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setselectedPDSO('interview')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Mock Interview
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setselectedPDSO('4YrPlan')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Four-Year Class Plan
                  </DropdownItem>
                  {/* Add other committees as needed */}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            {/* Submit Button */}
            <button
              onClick={handlePDSignOff}
              className='ml-2 bg-green-500 text-white py-2 px-4 rounded-md hover:scale-105'
            >
              Submit
            </button>
          </div>

          <div className='flex items-center justify-center m-2 md:w-1/3'>
            {/* Committee Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <button className='bg-gray-500 text-white p-2 rounded-md'>
                  {committeeList[selectedCommittee] || 'Select Committee ▼'}
                </button>
              </DropdownTrigger>
              <DropdownMenu className='bg-gray-200 rounded-md'>
                <DropdownSection>
                  <DropdownItem
                    onClick={() => setSelectedCommittee('brohood')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Brotherhood
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectedCommittee('pd')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    PD
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectedCommittee('philanthropy')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Philanthropy
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectedCommittee('recsports')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Rec Sports
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectedCommittee('social')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Social
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectedCommittee('diversity')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Diversity
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectedCommittee('historian')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    Historian
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectedCommittee('corsec')}
                    className='hover:bg-gray-300 cursor-pointer'
                  >
                    CorSec
                  </DropdownItem>
                  {/* Add other committees as needed */}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            {/* Submit Button */}
            <button
              onClick={handleCommitteeSignOffSubmit}
              className='ml-2 bg-green-500 text-white py-2 px-4 rounded-md hover:scale-105'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PledgeTile
