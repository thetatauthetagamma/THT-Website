export default function members() {
    return (
      <div className='bg-gray-50 flex-grow'>
        <div>
           <h1 className=" pl-10 pt-4 pb-4 text-lg sm:text-1xl md:text-2xl lg:text-4xl font-bold mt-2  text-[#8b0000]" >Contact Us</h1>
        </div>
        <div className="contact-info-content px-5 py-4 pl-10">
            <div className="info">
                <div className = "flex flex-col">
                    <a href="mailto:tht-regents@umich.edu" className= "hover-3-description  text-sm md:text-base font-semibold pb-4"> Regent & Vice Regent  </a>
                    <a href="mailto:tht-eboard@umich.edu" className= "hover-3-description  text-sm md:text-base font-semibold pb-4"> Executive Board  </a>
                    <a href="mailto:tht-corsec@umich.edu" className= "hover-3-description  text-sm  md:text-base font-semibold pb-4"> Alumni & Interchapter Relations  </a>
                    <a href="mailto:tht-corporate@umich.edu" className= "hover-3-description  text-sm  md:text-base font-semibold pb-4"> Cooporate & Sponsorship Events </a>
                </div>
            </div>
        </div>
      </div>
    )
}