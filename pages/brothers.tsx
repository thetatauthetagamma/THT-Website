import BroNavBar from "@/components/BroNavBar";

export default function brothers() {
  
  return (
    <div className="flex md:flex-row flex-col flex-grow  border-b-2 border-[#a3000020]">
      <BroNavBar isPledge={true}/>
      <div className="flex-grow">
      
        <div className="flex-grow h-full m-4">
          <iframe src="https://calendar.google.com/calendar/embed?src=umich.edu_4prg15q589p918cu4tc39v95ng%40group.calendar.google.com&ctz=America%2FDetroit" className="flex-grow h-5/6 w-full"></iframe>
        </div>
      </div>
    </div>
  );
};
