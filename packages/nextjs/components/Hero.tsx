"use client";

import Image from "next/image";

const HeroText2 = "/Level Up Your Live Stream.png";
const HeroText = "/Redefine Live Streaming..png";
const StartNow = "/Stream Now.png";

const Hero = () => {
  return (
    <div className='flex justify-center items-center w-screen h-full bg-cover bg-center bg-[url("../public/Hero.png")]'>
      <div className="flex flex-col gap-y-16 justify-center items-center">
        <div className="flex flex-col gap-y-4 justify-center items-center">
          <Image src={HeroText} alt="Logo" width={1920} height={1080} className="w-full h-full" />
          <Image src={HeroText2} alt="Logo" width={1920} height={1080} className="w-2/3 h-full" />
        </div>
        <button
          className="bg-[#00FF00] text-black rounded-lg w-48 h-8 px-4 flex items-center justify-center hover:bg-white"
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          <Image src={StartNow} alt="Logo" width={1920} height={1080} className="w-40 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
