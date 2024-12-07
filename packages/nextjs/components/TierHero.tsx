import Image from 'next/image'
import React from 'react'
import TierHeroText from '../public/tiertext.png'


const TierHero = () => {
  return (
    <div className='h-4/5 w-full overflow-x-hidden bg-[url("../public/tiershero.png")] bg-cover bg-center'>
        <div className='flex flex-col w-screen h-full justify-center items-center'>
            <h1 className='text-white text-4xl font-bold text-center'>Streambase's Streamer Tier Scheme</h1>
            <Image src={TierHeroText} alt='Logo' width={1920} height={1080} className="w-1/2" />
            {/* <div className='flex flex-row gap-4'>
                <h1 className='text-white text-2xl font-bold text-center'>NEWBIE</h1>
                <h1 className='text-white text-2xl font-bold text-center'>STREAMER</h1>
                <h1 className='text-white text-2xl font-bold text-center'>RISING STAR</h1>
                <h1 className='text-white text-2xl font-bold text-center'>INFLUENCER</h1>
                <h1 className='text-white text-2xl font-bold text-center'>CELEBRITY</h1>
            </div> */}
        </div>
        </div>
  )
}

export default TierHero