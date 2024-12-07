'use client'

import Image from "next/image"
import HeroText from '../public/Redefine Live Streaming..png'
import HeroText2 from '../public/Level Up Your Live Stream.png'

const Hero = () => {
  return (
    <div className='flex justify-center items-center w-screen h-full bg-cover bg-center bg-[url("../public/Hero.png")]'>
    <div className='flex flex-col gap-y-4 justify-center items-center'>
      <Image src={HeroText} alt='Logo' width={1920} height={1080} className="w-full h-full" />
      <Image src={HeroText2} alt='Logo' width={1920} height={1080} className="w-2/3 h-full" />
    </div>

    </div>
  )
}

export default Hero