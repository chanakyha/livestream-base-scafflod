import Image from 'next/image'
import React from 'react'
import StartNow from '../public/typo.png'
import Marquee from "react-fast-marquee";

const Banner = () => {
  return (
    <>
      <Marquee direction="right" speed={50} gradient={false} >
        {/* Create an array of 10 elements to repeat the image */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className='flex items-center justify-center h-10 bg-[#00FF00]'>
            <Image src={StartNow} alt='Logo' width={1920} height={1080} className="w-48 h-4 px-4" />
          </div>
        ))}
      </Marquee>
    </>
  )
}

export default Banner