import BroNavBar from "@/components/BroNavBar";

export default function pledgecalendar() {
  
  return (
    <div className="flex md:flex-row flex-col flex-grow  border-b-2 border-[#a3000020]">
      <BroNavBar isPledge={true}/>
      <div className="flex-grow">
      
        <div className="flex-grow h-full m-4">
          <iframe src="https://calendar.google.com/calendar/embed?src=c_c0d546e16b95cbf7451eb35f5fde83a9bb9b56b22dae8ee2f69ff2f3a2b57937%40group.calendar.google.com&ctz=America%2FNew_York" className="flex-grow h-5/6 w-full"></iframe>
        </div>
      </div>
    </div>
  );
};
