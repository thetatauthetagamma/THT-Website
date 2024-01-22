import BroNavBar from "@/components/BroNavBar";
export default function BroResources() {

  return (
    <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">
    
    <BroNavBar isPledge={false}/>
    
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
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeXFsB9u0jzLG83rmDiPWynPQgRHBgk6V1hTC6a8fi6iW2aJw/viewform" target="_blank" className="block p-2 rounded">📝 Risk Manager Feedback Form</a>
          </li>
          <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSf0r2ESFIBakxZSL_dCAV9CrAQjwo0KUrG-Ac_lBvRHZyzc_w/viewform" target="_blank" className="block p-2 rounded">👶 Pledge Feedback Form</a>
          </li>
          <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfBGJTqwIAoKUeJt81nheVrPapZNrJUBBFC3wyxrbhrKGLVTA/viewform" target="_blank" className="block p-2 rounded">🚑 Brother of Concern (Risk) Form</a>
          </li>
          <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSds1eiHaU_qxOcZpDUExtrCbg2dIBpXpxeC-H6VhKwYgzKwng/viewform" target="_blank" className="block p-2 rounded">💰 Reimbursement Form</a>
          </li>
    </ul>
</div>
  )
}
