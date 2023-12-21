import React, { useEffect, useState } from 'react'
import supabase from '@/supabase'
import thtlogo from '../../public/tht-logo.png'
import Image from 'next/image'
import BroNavBar from '@/components/BroNavBar'
import { useRouter } from 'next/router'

export default function Profile () {
  const router = useRouter()
  const [currentEmail, setCurrentEmail] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [year, setYear] = useState('')
  const [major, setMajor] = useState('')
  const [roll, setRoll] = useState('')
  const [phone, setPhone] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [userid, setUserid] = useState('')
  const [isEditable, setIsEditable] = useState('')

  const [editableFields, setEditableFields] = useState({
    firstname: false,
    lastname: false,
    year: false,
    major: false,
    roll: false,
    phone: false,
    linkedin: false
  })

  useEffect(() => {
    const fetchUnique = async () => {
      const queryParams = router.query
      console.log(queryParams.profile)
      setUserid(queryParams.profile)
    }

    fetchUnique()
  }, [router.query.profile])

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession()
        if (session) {
          setCurrentEmail(session.data.session?.user.email || '')
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchBrotherData = async () => {
      const { data, error } = await supabase
        .from('Brothers')
        .select('*')
        .eq('userid', userid)

      if (data?.length === 1 && !error) {
        setUserid(data[0].userid)
        setFirstname(data[0].firstname)
        setLastname(data[0].lastname)
        setYear(data[0].year)
        setMajor(data[0].major)
        setRoll(data[0].roll)
        setPhone(data[0].phone)
        setLinkedin(data[0].linkedin)
        setEmail(data[0].email)
      }
    }

    fetchBrotherData()
    fetchSession()
  }, [userid, currentEmail])

  useEffect(() => {
    const fetchPledgeImage = async () => {
      if (userid) {
        const { data: ImageData, error } = await supabase.storage
          .from('brothers')
          .download(`${userid}.jpeg`)

        if (!error) {
          setImageUrl(URL.createObjectURL(ImageData))
        }
      }
    }

    fetchPledgeImage()
  }, [userid])

  useEffect(() => {
    const isEditAble = async () => {
      console.log(currentEmail)
      if (userid == currentEmail.slice(0, -10)) {
        setIsEditable(true)
      } else {
        setIsEditable(false)
      }
    }

    isEditAble()
  }, [userid, currentEmail])

  const handleFieldEdit = () => {
    setEditableFields(prevFields => ({
      ...prevFields,
      firstname: !prevFields.firstname,
      lastname: !prevFields.lastname,
      year: !prevFields.year,
      major: !prevFields.major,
      phone: !prevFields.phone,
      linkedin: !prevFields.linkedin
    }))
  }

  const handleSave = async () => {
    try {
      // Update the user's profile in Supabase with the new values
      const { data, error } = await supabase
        .from('Brothers')
        .update([
          {
            firstname,
            lastname,
            year,
            major,
            phone,
            linkedin: linkedin
          }
        ])
        .eq('email', email)

      if (!error) {
        console.log('Profile updated successfully')
        // Optionally reset editableFields state to hide input fields
        setEditableFields({
          firstname: false,
          lastname: false,
          year: false,
          major: false,
          phone: false,
          linkedin: false
        })
      } else {
        console.error('Error updating profile:', error.message)
      }
    } catch (error) {
      console.error('Error updating profile:', error.message)
    }
  }

  return (
    <div className='flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]'>
      <BroNavBar isPledge={false} />
      <div className='flex-grow'>
        <div className='flex flex-col items-center bg-gray-100 p-2 mb-4 h-full'>
          <div className='flex flex-col items-center w-full'>
            {imageUrl ? (
              <div className='mb-2 w-40 h-40'>
                <img
                  src={imageUrl}
                  alt='Pledge'
                  className='rounded-full w-full h-full object-cover'
                />
              </div>
            ) : (
              <div className='mb-2 w-32 h-34'>
                <Image
                  src={thtlogo}
                  alt='logo'
                  className='rounded-full w-full h-full object-cover'
                />
              </div>
            )}
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col items-center justify-evenly w-full pb-2'>
              <div className='flex flex-col md:flex-row items-center mb-4'>
                <div className='text-2xl font-bold text-center md:mr-2'>
                  {editableFields.firstname && isEditable ? (
                    <input
                      type='text'
                      placeholder={firstname}
                      value={firstname}
                      onChange={e => setFirstname(e.target.value)}
                      className='whitespace-nowrap w-30 text-center border-2 border-[#8b000070]'
                    />
                  ) : (
                    `${firstname}`
                  )}
                </div>
                <div className='text-2xl font-bold text-center'>
                  {editableFields.lastname && isEditable ? (
                    <input
                      type='text'
                      placeholder={lastname}
                      value={lastname}
                      onChange={e => setlastname(e.target.value)}
                      className='whitespace-nowrap w-30 text-center border-2 border-[#8b000070]'
                    />
                  ) : (
                    `${lastname}`
                  )}
                </div>
              </div>
              <div className='flex flex-col items-center justify-evenly w-full'>
                <div className='flex flex-row items-center justify-evenly w-1/3'>
                  {year ? (
                    <div className='text-xl'>
                      <p className='text-lg font-semibold mb-1 whitespace-nowrap text-center '>
                        Year
                      </p>
                      {editableFields.year && isEditable ? (
                        <input
                          type='text'
                          placeholder={`${year}`}
                          value={year}
                          onChange={e => setYear(e.target.value)}
                          className='whitespace-nowrap w-30 text-center border-2 border-[#8b000070]'
                        />
                      ) : (
                        `${year}`
                      )}
                    </div>
                  ) : (
                    <div className='text-xl'>year</div>
                  )}
                  {major ? (
                    <div className='text-xl'>
                      <p className='text-lg font-semibold mb-1 whitespace-nowrap text-center '>
                        Major
                      </p>
                      {editableFields.major && isEditable ? (
                        <input
                          type='text'
                          placeholder={`${major}`}
                          value={major}
                          onChange={e => setMajor(e.target.value)}
                          className='whitespace-nowrap w-30 text-center border-2 border-[#8b000070]'
                        />
                      ) : (
                        `${major}`
                      )}
                    </div>
                  ) : (
                    <div className='text-xl'>major</div>
                  )}
                </div>

                <div className='flex flex-col items-center p-2'>
                  <p className='text-lg font-semibold mb-1'>Roll</p>
                  <p className='text-lg'>{roll}</p>
                </div>
                <div className='flex flex-col items-center p-2'>
                  <p className='text-lg font-semibold mb-1'>Email</p>
                  <p className='text-lg'>{email}</p>
                </div>

                <div className='flex flex-col items-center p-2 w-full'>
                  <p className='text-lg font-semibold mb-1 whitespace-nowrap '>
                    Phone Number
                  </p>
                  {editableFields.phone && isEditable ? (
                    <input
                      type='text'
                      placeholder={phone || '(xxx)-xxx-xxxx'}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className='whitespace-nowrap w-30 text-center border-2 border-[#8b000070]'
                    />
                  ) : (
                    <p className='text-lg whitespace-nowrap'>
                      {phone || '(xxx)-xxx-xxxx'}
                    </p>
                  )}
                </div>
                <div className='flex flex-col items-center p-2 w-full'>
                  <p className='text-lg font-semibold mb-1'>LinkedIn URL</p>
                  {editableFields.linkedin && isEditable ? (
                    <input
                      type='text'
                      placeholder={linkedin}
                      value={linkedin}
                      onChange={e => setLinkedin(e.target.value)}
                      className='whitespace-nowrap w-4/12 border-2 border-[#8b000070]'
                    />
                  ) : (
                    <p className='text-lg text-center whitespace-nowrap'>
                      {linkedin}
                    </p>
                  )}
                </div>
              </div>
              {isEditable && (
                <div className='flex flex-col md:flex-row items-center justify-evenly w-full'>
                  {!Object.values(editableFields).some(field => field) ? (
                    <button
                      className='font-bold m-2 text-md bg-[#8b000070] p-2 rounded-md text-center mb-4'
                      onClick={handleFieldEdit}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className='flex flex-row m-2 items-center'>
                      <button
                        className='font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center mb-4'
                        onClick={handleFieldEdit}
                      >
                        Cancel
                      </button>
                      <button
                        className='font-bold text-md bg-[#8b000070] p-2 rounded-md text-center mb-4'
                        onClick={handleSave}
                      >
                        Save Profile
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
