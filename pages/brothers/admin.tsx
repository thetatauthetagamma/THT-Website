import BroNavBar from "@/components/BroNavBar";
import { useState, useEffect } from 'react';
import supabase from '@/supabase';
interface RoleAssignments {
  [key: string]: string;
}

export default function BroResources() {
  const [userID, setUserID] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [roleAssignments, setRoleAssignments] = useState<RoleAssignments>({});
  const [pledges, setPledges] = useState<PledgeData[]>([]);
  const [rollEditingMode, setRollEditingMode] = useState<boolean>(false);
  const [eboardEditingMode, setEboardEditingMode] = useState<boolean>(false);
  const [eboardMembers, setEboardMembers] = useState<BrotherData[]>([]);
  const [newRoleNames, setNewRoleNames] = useState<{ [key: string]: string }>({});
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
  }

  const handleRoleNameChange = (role: string, newName: string) => {
    setNewRoleNames((prevNames) => ({
      ...prevNames,
      [role]: newName,
    }));
    console.log(newRoleNames)
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
        console.log(eboardMembers)
      }
    } catch (error) {
      console.error('Error fetching EBoard members:', error);
    }
  };
  const handleArchiveClasses = async () => {
    try {
      // Fetch all brothers
      const { data: allBrothers, error } = await supabase
        .from('Brothers')
        .select('userid, classes, archivedclasses');

      if (error) {
        throw error;
      }

      // Filter brothers who have classes in the classes column
      const brothersWithClasses = allBrothers.filter(brother => brother.classes && brother.classes.length > 0);

      // Update the archivedclasses column for each brother
      for (const brother of brothersWithClasses) {
        const updatedClasses = [...(brother.archivedclasses || []), ...(brother.classes || [])];

        // Update the archivedclasses column in the database
        await supabase
          .from('Brothers')
          .update({ archivedclasses: updatedClasses })
          .eq('userid', brother.userid);
      }

      console.log('Classes archived successfully');
    } catch (error) {
      console.error('Error archiving classes:', error);
    }
  };

  const handleEboardSubmit = async (adminRole: string) => {
    try {
      // Task 1: Add the adminRole to the newuserID
      const newMemberUpdate = { adminrole: adminRole };
      console.log(newRoleNames[adminRole]);
      await supabase
        .from('Brothers')
        .update([newMemberUpdate]) // Upsert to add or update based on userid
        .eq('userid', newRoleNames[adminRole]);

      // Task 2: Delete the adminRole from the current brother holding that role

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

    // If the user confirms, proceed with deletion
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
          adminrole: '', // Assign role numbers from state
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
    // Show a confirmation dialog
    // Perform the Supabase deletion operation
    const { data, error } = await supabase
      .from('Pledges')
      .delete()
      .eq('uniqname', uniqname)

    // Handle any errors or update UI accordingly
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


  const currentRegent = eboardMembers.find(member => member.adminrole === 'regent');
  const currentVice = eboardMembers.find(member => member.adminrole === 'vice');
  const currentScribe = eboardMembers.find(member => member.adminrole === 'scribe');
  const currentTreasurer = eboardMembers.find(member => member.adminrole === 'treasurer');
  const currentCorSec = eboardMembers.find(member => member.adminrole === 'corsec');

  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">

      <BroNavBar isPledge={false} />
      <div className="flex flex-col m-5">

        {adminRole == 'parent' && (
          <div>
            <h1 className="flex flex-center text-lg">As {adminRole}, you can do the following things:</h1>
            <h1> Set PD Sign Offs</h1>
            <h1> Set Committee Sign Offs</h1>
            <h1> Set Required Number of Academic Hours</h1>
            <h1> Set Required Number of Social Hours</h1>
          </div>
        )}
        {(adminRole === 'regent' || adminRole === 'scribe') && (
          <div className="flex flex-col">

            <h1 className="flex flex-center text-4xl">Thank you for your service brother {adminRole} 🫡</h1>
            <h1 className="flex flex-center text-lg my-2">As {adminRole}, you can do the following things:</h1>
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
                <div className='flex flex-col md:flex-row flex-center justify-start mx-auto'> {/* Added mx-auto for centering */}
                  <h1 className='text-lg font-bold text-center'>Update Eboard and Committee Heads (Update yourself last!):</h1>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  {eboardPositions.map(({ role, label }) => (
                    <div key={role} className='flex flex-col items-center'>
                      <p>
                        Current {label}: {eboardMembers.find(member => member.adminrole === role) ?
                          `${eboardMembers.find(member => member.adminrole === role)?.firstname} ${eboardMembers.find(member => member.adminrole === role)?.lastname}` :
                          'No one found'
                        }
                      </p>
                      <div className='flex flex-row'>
                        <div className="flex w-64">
                          <input
                            type="text"
                            placeholder={`Input new ${role} uniqname`}
                            className="whitespace-nowrap text-center border-2 border-[#8b000070] w-full my-2"
                            onChange={(e) => handleRoleNameChange(role, e.target.value)}
                          />
                        </div>
                        <button onClick={() => handleEboardSubmit(role)} className="font-bold mr-2 text-md bg-[#8b000070] self-center rounded-md text-center w-24 mx-1">Submit</button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mx-auto"> {/* Added mx-auto for centering */}
                    <button onClick={handleCancelEBoard} className="font-bold mr-2 text-md bg-red-400 p-1 rounded-md text-center w-36 mt-2">Done Updating</button>
                  </div>
                </div>





              </div>
            ) : (
              <button onClick={handleUpdateEboard} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center my-2 w-48">Update EBoard</button>
            )}

          </div>
        )}
        {(adminRole == 'academic' || adminRole == 'webHead') && (

          <div className='flex flex-col'>
            <h1 className="flex flex-center text-4xl">Hi Kohl</h1>
            <h1 className="flex flex-center text-lg my-2">As Academic Head, you can do the following things:</h1>
            <button onClick={handleArchiveClasses} className="font-bold mr-2 text-md bg-[#8b000070] p-2 rounded-md text-center">Archive Classes</button>
          </div>
        )}
        {(adminRole == 'treasurer') && (

          <h1 className="flex flex-center text-4xl">Thank you for handling our money</h1>
        )}
        {(adminRole == 'corsec') && (

          <h1 className="flex flex-center text-4xl">Thank you for being a fire Cor Sec </h1>
        )}
        {(adminRole == 'vice') && (

          <h1 className="flex flex-center text-4xl">You're slaying as vice</h1>
        )}
      </div>
    </div>
  )
}
