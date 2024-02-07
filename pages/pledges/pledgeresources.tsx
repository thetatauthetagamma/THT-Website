import BroNavBar from "@/components/BroNavBar";
export default function BroResources() {

    return (
        <div className="flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]">

            <BroNavBar isPledge={true} />

            <ul className="space-y-2 font-bold flex-grow text-lg xs:max-sm:flex xs:max-sm:flex-col xs:max-sm:items-center pl-8">
                <h1 className="font-bold text-4xl py-4">Resources</h1>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded flex-grow ">
                    <a href="https://forms.gle/C7xfqhk55CshGDoL8" target="_blank" className="block p-2 rounded">📋 Attendance Form</a>
                </li>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://docs.google.com/document/d/13oaIc0KLx_hE8UgD6-_SRshsEdBLs4WQdnCiHfQG5Eg/edit?usp=sharing" target="_blank" className="block p-2 rounded">Pledge Syllabus</a>
                </li>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://docs.google.com/presentation/d/1vX3qW5g-GSDS04ySgomecV0PWgHH6EFjhZc1w-9L7fE/edit?usp=sharing" target="_blank" className="block p-2 rounded">Interview Etiquette</a>
                </li>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://docs.google.com/presentation/d/13-Z3G1J77Sioko0uZiF--tHvu0QU8VTQCg5Im0ugxLA/edit?usp=sharing" target="_blank" className="block p-2 rounded">Committee Sign Offs</a>
                </li>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://docs.google.com/presentation/d/19haJcwmTuelQ1tCbdNXA_h5NflmV0bVKsDYC49sSG9Y/edit?usp=sharing" target="_blank" className="block p-2 rounded">PD Sign Offs</a>
                </li>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://docs.google.com/presentation/d/1p51S16GOD4ASn8A_qYxx3eFeiMFzB6L5MJMkuqxNIoY/edit?usp=sharing" target="_blank" className="block p-2 rounded">Meeting #1 Slides</a>
                </li>
                <h1 className="font-bold text-4xl py-4">Action Required:</h1>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://docs.google.com/presentation/d/19_qhWGOjUbRCjJ3mUxFlKl462oEfRdPwgsYFMlrGcZg/edit?usp=sharing" target="_blank" className="block p-2 rounded">Make your Little Slides</a>
                </li>
                <li className="hover:bg-gray-200 transition-colors duration-300 rounded  flex-grow">
                    <a href="https://forms.gle/jgKCo9PzdUu1ACrdA" target="_blank" className="block p-2 rounded">Fill out Get to Know You Form</a>
                </li>

            </ul>
        </div>
    )
}
