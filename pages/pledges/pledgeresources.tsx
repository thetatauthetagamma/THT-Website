import BroNavBar from "@/components/BroNavBar";
export default function BroResources() {
//TODO: Make it so that parents can add and edit resources that are displayed.
    return (
        <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">

            <BroNavBar isPledge={true} />

            <ul className="space-y-2 font-bold flex-grow text-lg xs:max-sm:flex xs:max-sm:flex-col xs:max-sm:items-center pl-8">
                <h1 className="font-bold text-4xl py-4">Resources</h1>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://docs.google.com/document/d/13oaIc0KLx_hE8UgD6-_SRshsEdBLs4WQdnCiHfQG5Eg/edit?usp=sharing" target="_blank" className="block p-2 rounded">Pledge Syllabus</a>
                </li>
                <h1 className="font-bold text-4xl py-4">Action Required:</h1>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://cmt.thetatau.org/forms/pledgeform_full/" target="_blank" className="block p-2 rounded">Fill out Nationals Form</a>
                </li>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://forms.gle/8RxdPNuPPDEgDa4Z9" target="_blank" className="block p-2 rounded">Weekly Checkin</a>
                </li>

            </ul>
        </div>
    )
}
