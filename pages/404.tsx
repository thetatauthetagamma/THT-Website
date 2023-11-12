import homepage from "../public/homepage.jpg";
import Image from "next/image";

export default function Custom404() {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${homepage})` }}
    >
      <h1 className='text-black text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl sm:text-lg font-bold pt-20 pb-20 pl-20 pr-20 text-center'>
        AHHHHHHHHHHHHHHHH!!!! ..... This page doesn't exist :)
      </h1>
      <Image className='px-10' src={homepage} alt="homepage" />
    </div>
  );
}