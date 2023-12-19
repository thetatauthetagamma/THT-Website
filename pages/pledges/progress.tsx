import PledgeNavBar from "@/components/PledgeNavBar";
import PledgeTilePledgeView from  '../../components/PledgeTilePledgeView'


export default function pledgecalendar() {
  
  return (
    <div className="flex md:flex-row flex-col flex-grow  border-b-2 border-[#a3000020]">
      <PledgeNavBar/>
      <div className="flex-grow">
      
        <div className="flex-grow h-full m-4">
          <PledgeTilePledgeView pledge="kate"/>
        </div>
      </div>
    </div>
  );
};
