import BroNavBar from "@/components/BroNavBar";
import { useState, useEffect } from 'react';
import supabase from '@/supabase';
import Select from 'react-select';

interface RoleAssignments {
  [key: string]: string;
}

export default function Admin() {
  const [userID, setUserID] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [roleAssignments, setRoleAssignments] = useState<RoleAssignments>({});
  const [pledges, setPledges] = useState<PledgeData[]>([]);
  const [rollEditingMode, setRollEditingMode] = useState<boolean>(false);
  const [eboardEditingMode, setEboardEditingMode] = useState<boolean>(false);
  const [eboardMembers, setEboardMembers] = useState<BrotherData[]>([]);
  const [newRoleNames, setNewRoleNames] = useState<{ [key: string]: string }>({});
  const [searchResults, setSearchResults] = useState<BrotherData[]>([]);
  const [selectedBrother, setSelectedBrother] = useState<{ [key: string]: string }>({});
  const [selectedRole, setSelectedRole] = useState<string>('');
  const eboardPositions = [
    { role: "regent", label: "Regent" },
    { role: "vice", label: "Vice Regent" },
    { role: "scribe", label: "Scribe" },
    { role: "treasurer", label: "Treasurer" },
    { role: "corsec", label: "Corsec" },
  ];
  
  interface PledgeData {
    uniqname: string;
    firstname: string;
    lastname: string;
    major: string;
    year: number;
    pronouns: string;
    email: string;
    phone: string;
    linkedin: string;
    roll: string;
    classes: string[];
    archivedclasses: string[];
  }

  interface BrotherData {
    userid: string;
    firstname: string;
    lastname: string;
    major: string;
    year: number;
    pronouns: string;
    email: string;
    phone: string;
    linkedin: string;
    roll: string;
    adminrole: string;
    classes: string[];
    archivedclasses: string[];
  }

  const handleRoleNameChange = (role: string, newName: string) => {
    setNewRoleNames((prevNames) => ({
      ...prevNames,
      [role]: newName,
    }));
    console.log(newRoleNames);
  };

  const fetchEboardMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('Brothers')
        .select('userid, firstname, lastname, adminrole')
        .in('adminrole', ['regent', 'vice', 'scribe', 'treasurer', 'corsec', 'parents', 'academic']);

      if (error) {
        throw error;
      }

      if (data) {
        setEboardMembers(data as BrotherData[]);
        console.log(eboardMembers);
      }
    } catch (error) {
      console.error('Error fetching EBoard members:', error);
    }
  };

  const handleArchiveClasses = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to archive all of the current classes? Please only do this at the end of a semester.'
    );

    if (isConfirmed) {
      try {
        const { data: allBrothers, error: brothersError } = await supabase
          .from('Brothers')
          .select('userid, classes, archivedclasses');

        if (brothersError) {
          throw brothersError;
        }

        for (const brother of allBrothers) {
          if (brother.classes && brother.classes.length > 0) {
            const updatedClasses = [...(brother.archivedclasses || []), ...brother.classes];

            await supabase
              .from('Brothers')
              .update({
                classes: [],
                archivedclasses: updatedClasses
              })
              .eq('userid', brother.userid);
          }
        }

        console.log('Brother classes archived successfully');

        const { data: allPledges, error: pledgeError } = await supabase
          .from('Pledges')
          .select('uniqname, classes, archivedclasses');

        if (pledgeError) {
          throw pledgeError;
        }

        for (const pledge of allPledges) {
          if (pledge.classes && pledge.classes.length > 0) {
            const updatedClasses = [...(pledge.archivedclasses || []), ...pledge.classes];

            await supabase
              .from('Pledges')
              .update({
                classes: [],
                archivedclasses: updatedClasses
              })
              .eq('uniqname', pledge.uniqname);
          }
        }

        console.log('Pledge classes archived successfully');

      } catch (error) {
        console.error('Error archiving classes:', error);
      }
    }
  };

  const handleSearchChange = async (inputValue: string) => {
    if (inputValue.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('Brothers')
        .select('userid, firstname, lastname')
        .or(`firstname.ilike.%${inputValue}%,lastname.ilike.%${inputValue}%`);

      if (error) {
        throw error;
      }

      if (data) {
        setSearchResults(data as BrotherData[]);
      }
    } catch (error) {
      console.error('Error searching brothers:', error);
    }
  };

  const handleInputChange = (newValue: string, role: string) => {
    handleSearchChange(newValue);
  };

  const handleSelectChange = (selectedOption: any, role: string) => {
    setSelectedBrother((prevSelected) => ({
      ...prevSelected,
      [role]: selectedOption ? selectedOption.value : ''
    }));
    setNewRoleNames((prevNames) => ({
      ...prevNames,
      [role]: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleEboardSubmit = async (adminRole: string) => {
    try {
      const newMemberUpdate = { adminrole: adminRole };
      console.log(newRoleNames[adminRole]);
      await supabase
        .from('Brothers')
        .update([newMemberUpdate])
        .eq('userid', newRoleNames[adminRole]);

      for (const member of eboardMembers) {
        if (member.adminrole === adminRole && (member.userid != newRoleNames[adminRole])) {
          await supabase
            .from('Brothers')
            .update({ adminrole: null })
            .eq('userid', member.userid);
        }
      }
      fetchEboardMembers();

      console.log('EBoard updated successfully');
    } catch (error) {
      console.error('Error updating EBoard:', error);
    }
  };

  useEffect(() => {
    fetchPledges();
    fetchEboardMembers();
  }, []);

  const handleRoleNumberChange = (uniqname: string, roleNumber: string) => {
    setRoleAssignments((prevAssignments) => ({
      ...prevAssignments,
      [uniqname]: roleNumber,
    }));
    console.log(roleAssignments);
  };

  const fetchPledges = async () => {
    try {
      const { data, error } = await supabase.from('Pledges').select('uniqname, firstname, lastname, major, year, pronouns, email, phone, linkedin');

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

  const handleInitiatePledges = () => {
    setRollEditingMode(true);
  };

  const handleCancel = () => {
    setRollEditingMode(false);
  };
  const handleCancelEBoard = () => {
    setEboardEditingMode(false);
  };
  const handleUpdateEboard = () => {
    setEboardEditingMode(true);
  }

  const handleSubmit = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to initiate these pledges? All of their pledging data will be deleted and they will be added to the brother database.'
    )

    if (isConfirmed) {
      try {
        const assignedPledges = pledges.filter((pledge) => roleAssignments[pledge.uniqname]);

        const brothersData: BrotherData[] = assignedPledges.map((pledge) => ({
          userid: pledge.uniqname,
          firstname: pledge.firstname,
          lastname: pledge.lastname,
          major: pledge.major,
          year: pledge.year,
          pronouns: pledge.pronouns,
          email: pledge.email,
          phone: pledge.phone,
          linkedin: pledge.linkedin,
          roll: roleAssignments[pledge.uniqname],
          adminrole: '',
          classes: pledge.classes,
          archivedclasses: pledge.archivedclasses,
        }));

        const { data, error } = await supabase.from('Brothers').upsert(brothersData);

        if (error) {
          throw error;
        }

        console.log('Brothers added successfully:', data);
        for (const pledge of assignedPledges) {
          await handleDeletePledge(pledge.uniqname);
        }
      } catch (error) {
        console.error('Error adding brothers:', error);
      } finally {
        setRollEditingMode(false);
      }
    }
  };

  const handleDeletePledge = async (uniqname: string) => {
    const { data, error } = await supabase
      .from('Pledges')
      .delete()
      .eq('uniqname', uniqname)

    if (error) {
      console.error('Error deleting pledge:', error.message)
    } else {
      fetchPledges()
    }
    await supabase
      .from('PDSignOffs')
      .delete()
      .eq('pledge', uniqname)
    await supabase
      .from('CommitteeSignOffs')
      .delete()
      .eq('pledge', uniqname)
  }

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession()
        if (session) {
          setUserID(session.data.session?.user.email || '')
        }
      } catch (error) { }
    }

    fetchSession()
  }, [])

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
          setAdminRole(data[0].adminrole);
        }
      } catch (error) { }
    }

    fetchAdminRole();
  }, [userID])

  const handleRoleChange = (selectedOption: any) => {
    setSelectedRole(selectedOption ? selectedOption.value : '');
  };

  const currentMember = eboardMembers.find(member => member.adminrole === selectedRole);

  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020] ">
      <BroNavBar isPledge={false} />
      
      <div className="flex lg:flex-row m-5 flex-col md:w-3/4">
        {adminRole == 'parent' || adminRole === 'web' && (
          <div className='bg-gray-100 rounded-md p-2 m-2 lg:w-1/3 min-h-1/2'>
            <h1 className="flex flex-center text-lg my-2 font-bold">Pledge Settings</h1>
            <h1> Set PD Sign Offs</h1>
            <h1> Set Committee Sign Offs</h1>
            <h1> Set Required Number of Academic Hours</h1>
            <h1> Set Required Number of Social Hours</h1>
          </div>
        )}
        {(adminRole === 'regent' || adminRole === 'scribe' || adminRole === 'web') && (
          <div className="flex flex-col bg-gray-100 rounded-md p-2 m-2 lg:w-1/3 min-h-1/2">
            <h1 className="flex flex-center text-lg my-2 font-bold">Update Statuses</h1>
            {rollEditingMode ? (
              <div className="bg-[#fff0f0] p-4 rounded-md flex flex-col m-2 items-center">
                <h1 className='text-lg font-bold'>Assign pledges roll numbers:</h1>
                {pledges.map(pledge => (
                  <div key={pledge.uniqname} className="flex flex-col sm:flex-row m-4 w-full justify-center">
                    <p className="m-2 whitespace-nowrap text-end">{`${pledge.firstname} ${pledge.lastname}`}</p>
                    <div className="flex self-center">
                      <input
                        type="text"
                        placeholder="Assign Roll Number"
                        className="whitespace-nowrap text-center border-2 border-[#8b000070]"
                        onChange={(e) => handleRoleNumberChange(pledge.uniqname, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <div className='flex flex-row'>
                  <button onClick={handleCancel} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center w-24 m-2">Cancel</button>
                  <button onClick={handleSubmit} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center w-24 m-2">Submit</button>
                </div>
              </div>
            ) : (
              <button onClick={handleInitiatePledges} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center my-2 w-48">Initiate Pledges</button>
            )}
            {eboardEditingMode ? (
              <div className='bg-[#fff0f0] p-4 rounded-md flex flex-col m-2'>
                <div className='flex flex-col'>
                  <h1 className='text-lg font-bold text-left mb-4'>Update Eboard and Committee Heads (Update yourself last!):</h1>
                </div>
                <div className='flex flex-col'>
                  <div className='mb-4'>
                    <Select
                      options={eboardPositions.map(({ role, label }) => ({
                        value: role,
                        label: label
                      }))}
                      onChange={handleRoleChange}
                      placeholder='Select role to update'
                      isClearable
                    />
                  </div>
                  {selectedRole && (
                    <div className='flex flex-col mb-4'>
                      <p className='mb-1'>
                        Current {eboardPositions.find(pos => pos.role === selectedRole)?.label}: {currentMember ?
                          `${currentMember.firstname} ${currentMember.lastname}` :
                          'No one found'
                        }
                      </p>
                      <div className='flex xl:flex-row lg:flex-col flex-row items-center'>
                        <div className="flex w-64 mr-2">
                          <Select
                            className=""
                            options={searchResults.map(brother => ({
                              value: brother.userid,
                              label: `${brother.firstname} ${brother.lastname}`
                            }))}
                            onInputChange={(newValue) => handleInputChange(newValue, selectedRole)}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, selectedRole)}
                            placeholder={`Search for new ${eboardPositions.find(pos => pos.role === selectedRole)?.label} by first name.`}
                            isClearable
                          />
                        </div>
                        <button onClick={() => handleEboardSubmit(selectedRole)} className="font-bold text-md bg-[#8b000070] p-2 rounded-md text-center w-24">Submit</button>
                      </div>
                    </div>
                  )}
                  <div className="text-left">
                    <button onClick={handleCancelEBoard} className="font-bold text-md bg-red-400 p-2 rounded-md text-center w-48 mt-2">Done Updating</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={handleUpdateEboard} className="font-bold text-md bg-[#8b000070] p-2 rounded-md text-center my-2 w-48">Update EBoard</button>
            )}
          </div>
        )}
        {(adminRole == 'academic' || adminRole == 'web') && (
          <div className='flex flex-col bg-gray-100 rounded-md p-2 m-2 lg:w-1/3 min-h-1/2'>
            <h1 className="flex flex-center text-lg my-2 font-bold">Misc Settings</h1>
            <button onClick={handleArchiveClasses} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center">Archive Classes</button>
          </div>
        )}
      </div>
    </div>
  )
}
