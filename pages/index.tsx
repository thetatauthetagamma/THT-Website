import Head from 'next/head'
import Typewriter from '@/components/Typewriter';


// import Brotherhood from '../components/Brotherhood'

export default function Home() {
  const words = ["brotherhood", "philanthropy organization", "professional community", "society of engineers", "family", ];

  return (
    <div className='flex flex-col flex-grow h-full'>
      <Head>
        <title>Theta Tau Theta Gamma</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.png" />
      </Head>

      <div className='bg-gray-50  border-b-2 border-[#8b000050]'>
          
          <div className="bg-tht-main bg-cover flex w-full z-0 ">
            
            
            
              <div className="bg-[#8b000070] inset-0 flex flex-col flex-grow justify-center text-white w-full h-[200px] md:h-[600px] z-2">
                <div className='justify-center items-center text-center'>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold  mt-2" >THETA TAU</h1>
                  <h1 className="text-1xl sm:text-2xl md:text-3xl lg:text-5xl font-bold " >THETA GAMMA</h1>
                </div>
                <h2 className="text-md sm:text-lg md:text-1xl lg:text-2xl font-semibold mt-2 text-center pl-6 pr-6" >
                  More than a fraternity, we are a{' '}
                  <Typewriter words={words} />
                </h2>
              </div>
        
           
          </div>
          
        
      

        <div className="text-base sm:text-base md:text-lg lg:text-xl px-4 pr-6 pl-6 md:pr-40 md:pl-40 text-center py-4 font-semibold z-3 pt-8">
          <p>
            Theta Tau is Professional Engineering Fraternity. As a group, we are dedicated to the professional and social development of our members into professionals that will enter the industry as strong, contributing members.
            Our chapter is known as Theta Gamma Chapter and is one of the largest chapters in the Country.
          </p>
        </div>

        <div className="text-base sm:text-base md:text-lg lg:text-xl px-4 text-center pb-8 pr-6 pl-6 md:pr-40 md:pl-40  font-semibold z-3 mt-2">
        <p>Theta Tau is made up of smart, driven engineers who come
                          from a diverse range of backgrounds and majors. Our
                          chapter holds events weekly designed to instill a
                          brotherhood among our members and develop ourselves as
                          well as our college and University.</p>
        </div>

  

      </div>


      <div className="bg-gray-50 flex flex-grow flex-col pr-6 pl-6 md:pr-40 md:pl-40 md:pt-4 pt-2">
           <h1 className="pt-4 pb-2 text-2xl md:text-4xl font-bold  md:text-left text-center text-[#8b0000]" >Contact Us</h1>
           <div className="contact-info-content py-4">
            <div className="info">
                <div className = "flex flex-col">
                    <a href="mailto:tht-eboard@umich.edu" className= "hover:text-gray-400   text-sm md:text-base font-semibold pb-4"> Executive Board  </a>
                    <a href="mailto:tht-regents@umich.edu" className= "hover:text-gray-400   text-sm md:text-base font-semibold pb-4"> Regent & Vice Regent  </a>
                    <a href="mailto:tht-corsec@umich.edu" className= "hover:text-gray-400   text-sm  md:text-base font-semibold pb-4"> Alumni & Interchapter Relations  </a>
                    <a href="mailto:tht-corporate@umich.edu" className= "hover:text-gray-400  text-sm  md:text-base font-semibold"> Cooporate & Sponsorship Events </a>
                </div>
            </div>
        </div>
        </div>
      
    
    
    </div>

  );
}
