import { useState } from 'react';
import Select from 'react-select';

interface BrotherData {
  userid: string;
  firstname: string;
  lastname: string;
  adminrole: string;
}

interface Props {
  eboardPositions: { role: string; label: string }[];
  eboardMembers: BrotherData[];
  searchResults: BrotherData[];
  handleSearch: (query: string) => void;
  handleUpdate: (role: string, userId: string) => void;
}

export default function EboardUpdate({
  eboardPositions,
  eboardMembers,
  searchResults,
  handleSearch,
  handleUpdate,
}: Props) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedBrother, setSelectedBrother] = useState<string>('');

  const currentMember = eboardMembers.find((member) => member.adminrole === selectedRole);

  return (
    <div className="bg-[#fff0f0] p-4 rounded-md flex flex-col m-2">
      <h1 className="text-lg font-bold">Update Eboard:</h1>
      <Select
        options={eboardPositions.map(({ role, label }) => ({ value: role, label }))}
        onChange={(option) => setSelectedRole(option?.value || '')}
        placeholder="Select role"
        isClearable
      />
      {selectedRole && (
        <div>
          <p>Current {selectedRole}: {currentMember?.firstname || 'None'}</p>
          <Select
            options={searchResults.map(({ userid, firstname, lastname }) => ({
              value: userid,
              label: `${firstname} ${lastname}`,
            }))}
            onInputChange={handleSearch}
            onChange={(option) => setSelectedBrother(option?.value || '')}
            placeholder="Search Brothers"
          />
          <button onClick={() => handleUpdate(selectedRole, selectedBrother)} className="bg-[#8b000070] p-2 rounded-md">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
