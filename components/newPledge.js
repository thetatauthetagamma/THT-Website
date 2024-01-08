import React, { useEffect, useState } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import thtlogo from '../public/tht-logo.png'
import Image from 'next/image'
import supabase from '../supabase'
import plus from '../public/plus.jpeg'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from '@nextui-org/react'

const NewPledgeTile = () => {
  const [imageUrl, setImageUrl] = useState('')

  const [pd, setPD] = useState(0)
  const [committeeSO, setCommitteeSO] = useState(0)
  const [completed, setCompleted] = useState(0)

  const [firstname, setFirstname] = useState('First Name')
  const [lastname, setLastname] = useState('Last Name')
  const [major, setMajor] = useState('Major')
  const [pronouns, setPronouns] = useState('Pronouns')
  const [year, setYear] = useState('Grad Year')

  const [userID, setUserID] = useState('')

  const [socialHours, setSocialHours] = useState(0);
  const [academicHours, setAcademicHours] = useState(0);


  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editableFields, setEditableFields] = useState({
    uniqname: false,
    firstname: false,
    lastname: false,
    year: false,
    pronouns:false,
    major: false,
    imageUrl: false,
  });


  //key = supabase column, value = display value
 
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

 

  const handleCreatePledge = async () => {
    try {
      // Send a request to create a new pledge with the provided uniqname
      const { data, error } = await supabase
        .from('Pledges')
        .insert([{ uniqname: newPledgeUniqname, firstname: newPledgeFirst, lastname:newPledgeLast,
        pronouns: newPledgePronouns }]);

      // If successful, update the state to include the new pledge
      if (data) setPledges([...pledges, { uniqname: newPledgeUniqname, firstname: '' }]);

      // Reset the newPledgeUniqname state
      setNewPledgeUniqname('');
      setNewPledgeFirst('');
      setNewPledgeLast('');
      setNewPledgePronouns('');
    } catch (error) {
      console.error(error);
      // Handle errors if needed
    }
  };

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
        if(data[0].adminrole == 'parent'){
          setIsAdmin(true);
        }
    }
  } catch (error) {}
    }
    fetchAdminRole()
  }, [userID])


  





 



  const handleSave = async () => {
    try {
      // Update the user's profile in Supabase with the new values
      const { data, error } = await supabase
        .from('Pledges')
        .update([
          {
            academicHours,
            socialHours,
          },
        ])
        .eq('uniqname', pledge);
  
      if (!error) {
        console.log('Pledge hours updated successfully');
        // Optionally reset editableFields state to hide input fields
        setEditableFields({
          academicHours: false,
          socialHours: false
        });
  

      } 
     
      else {
        console.error('Error updating profile:', error.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };



  const handleFieldEdit = () => {
    
    setEditableFields((prevFields) => ({
      ...prevFields,
      firstname: !prevFields.firstname,
      lastname: !prevFields.lastname,
      year: !prevFields.year,
      major: !prevFields.major,
      phone: !prevFields.phone,
      linkedin: !prevFields.linkedin,
      imageUrl: !prevFields.imageUrl,
      currentClasses: !prevFields.currentClasses
    }));
    if (!editableFields.academicHours) {
      setAcademicHours(academicHours); // Use the initial state or fetch it from the server
    }
  
    if (!editableFields.socialHours) {
      setSocialHours(socialHours); // Use the initial state or fetch it from the server
    }
    setEditMode(!editMode);
  };




  
  return (
    <div className='bg-gray-100 p-2 rounded-2xl mb-4'>
     {editMode? ( 
     <div className = 'w-full flex flex-col md:flex-row items-center'>
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
        <div className='text-center w-full'>
          <div className = "flex md:flex-row flex-col items-center w-full px-2 mr-4">
          <div className='text-md  text-center md:mr-2 w-1/2'>
                {editableFields.firstname? (
                  <input
                    type='text'
                    placeholder={firstname}
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className='whitespace-nowrap  text-center border-2 border-[#8b000070]'
                  />
                ) : (
                  `${firstname}`
                )}
              </div>
              <div className='text-md text-center md:mr-2 w-1/2'>
                {editableFields.lastname? (
                  <input
                    type='text'
                    placeholder={lastname}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className='whitespace-nowrap  text-center border-2 border-[#8b000070]'
                  />
                ) : (
                  `${firstname}`
                )}
              </div>
          </div>
          
          <p>
            {year} | {pronouns} | {major}
          </p>
          <div className='flex flex-col md:flex-row items-center justify-evenly w-full'>
                
              
                  <div className='flex flex-row m-2 items-center'>
                    <button className='font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center' onClick={handleFieldEdit}>
                      Cancel
                    </button>
                    <button className='font-bold text-md bg-[#8b000070] p-2 rounded-md text-center' onClick={handleSave}>
                      Create Pledge 
                    </button>
                  </div>
              
              </div>

        </div>
      </div>
      <div className='flex flex-col items-center w-9/12'>
      <div className='flex flex-col md:flex-row items-center justify-evenly w-full pb-2'>
        <div className='flex flex-col items-center p-2 '>
          <p className='text-sm font-bold mb-1'># of Interviews</p>
          <p className='text-sm'>{ 0}</p>
        </div>
        <div className='flex flex-col items-center md:border-x-2 border-black p-2'>
          <p className='text-sm text-center font-bold mb-1'># of PD Activities</p>
          <p className='text-sm'>{0}</p>
        </div>
        <div className='flex flex-col items-center p-2'>
          <p className='text-sm text-center font-bold mb-1'># of Committee Signoffs</p>
          <p className='text-sm'>{0}</p>
        </div>
        <div className='flex flex-col items-center md:border-x-2 border-black p-2'>
          <p className='text-sm text-center font-bold mb-1'># of Social Hours</p>
          <p className='text-sm'>
         0
          </p>
        </div>
        <div className='flex flex-col items-center p-2'>
          <p className='text-sm text-center font-bold mb-1'># of Academic Hours</p>
          <p className='text-sm'>      <p className='text-sm'>
         0
          </p></p>
        </div>
      </div>
        <div className='flex flex-col items-center w-full p-2'>
          <ProgressBar
            className='w-full'
            completed={0}
            bgColor='#22c55e'
            height='40px'
          />
        </div>
        <div className='flex flex-col md:flex-row items-center m-4 w-full justify-evenly'>
          {/* Interview Button (to the left) */}
        
          <div className='flex items-center justify-center  m-2 md:w-1/3'>
           
           
          </div>

          <div className='flex items-center justify-center m-2 md:w-1/3'>
            {/* Committee Dropdown */}
            

            {/* Submit Button */}
           
          </div>


        </div>
      </div>
      </div>) : (

    
<div
onClick={() => handleFieldEdit()}
className="cursor-pointer"
>
<div className='mb-2 w-40 h-40'>

            <Image
              src={plus}
              alt='logo'
              className='rounded-full w-full h-full object-cover'
            />
      
        </div>
</div>)}

    
    </div>
  )
}

export default NewPledgeTile








/*          {isAdmin && (
            <div>
              
              <div className='flex flex-col md:flex-row items-center bg-gray-100 p-2 rounded-2xl mb-4'>
              {editMode ? (
                  // Render form fields in edit mode
                  <div>
                    <label>New Pledge Uniqname:</label>
                    <input
                      type="text"
                      value={newPledgeUniqname}
                      onChange={(e) => setNewPledgeUniqname(e.target.value)}
                    />
               
                    <label>New Pledge First Name:</label>
                    <input
                      type="text"
                      value={newPledgeFirst}
                      onChange={(e) => setNewPledgeFirst(e.target.value)}
                    />
                    <label>New Pledge Last Name:</label>
                    <input
                      type="text"
                      value={newPledgeLast}
                      onChange={(e) => setNewPledgeLast(e.target.value)}
                    />
                    <label>New Pledge Pronouns:</label>
                    <input
                      type="text"
                      value={newPledgePronouns}
                      onChange={(e) => setNewPledgePronouns(e.target.value)}
                    />
                    <button onClick={handleCreatePledge}>Create Pledge</button>
                  </div>
                ) : (
                  // Render the plus sign image to toggle edit mode
                  <div
                    onClick={() => setEditMode(true)}
                    className="cursor-pointer"
                  >
                    <Image
                      src={plus}
                      alt='logo'
                      className='rounded-full w-16 h-16 object-cover'
                    />
                  </div>
                )}
              
              </div>
            </div>
            )} */