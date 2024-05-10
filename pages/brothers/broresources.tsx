import BroNavBar from "@/components/BroNavBar";
export default function BroResources() {
//TODO: Make it so that web head can add and edit resources from front end. 
  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">

      <BroNavBar isPledge={false} />
      
      <ul className="space-y-2 font-bold flex-grow text-lg xs:max-sm:flex xs:max-sm:flex-col xs:max-sm:items-center pl-8">
        <h1 className="font-bold text-4xl py-4">Resources</h1>
        <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow ">
          <a href="https://forms.gle/VrZxKVSzAc7pptTE8" target="_blank" className="block p-2 rounded">📋 Attendance Form</a>
        </li>
        <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
          <a href=" https://docs.google.com/forms/d/e/1FAIpQLSdFCHBSwdWgQliH_z6gM-R6jQhPOskvFPMUY8Z2fCRSBKBxWw/viewform?usp=sharing" target="_blank" className="block p-2 rounded">📝 Fraternity Feedback Form</a>
        </li>
        <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSe_SpgUfDcuH66jb0k2LSvd-MhODkzh1E5W06d6cnGJLnawHw/viewform?usp=sharing" target="_blank" className="block p-2 rounded">📝 EBoard Feedback Form</a>
        </li>
        <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
          <a href="https://forms.gle/47TSuNtB1nvTs5EV6" target="_blank" className="block p-2 rounded">📝 Risk Manager Form W24</a>
        </li>
        <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
          <a href="https://forms.gle/WHV8KnQhjjPirD8y7" target="_blank" className="block p-2 rounded">👶 Pledge Feedback Form</a>
        </li>
        <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScS3-CQhBsk0XD6uiIKDjx-UwVx9wGbKxPwEmvWGOqH4ilPfQ/viewform?usp=sf_link" target="_blank" className="block p-2 rounded">💰 Reimbursement Form</a>
        </li>
      </ul>
    </div>
  )
}
