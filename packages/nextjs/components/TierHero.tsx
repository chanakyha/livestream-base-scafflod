import Image from 'next/image'
import React, { useState } from 'react'
import TierHeroText from '../public/tiertext.png'
import Newbie from '../public/newbie.png'
import Streamer from '../public/streamer.png'
import RisingStar from '../public/risingstar.png'
import Influencer from '../public/influencer.png'
import Celebrity from '../public/celebrity.png'

const TierHero = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const tiers = [
    { 
      image: Newbie, 
      title: "Newbie", 
      description: "New to the platform? Start your streaming journey with our Newbie tier! This tier is perfect for beginners who want to dip their toes into the world of live streaming. Enjoy basic features like live streaming, chat moderation, and access to a growing community of fellow streamers. As you gain experience and grow your audience, you can easily upgrade to higher tiers with more advanced features and benefits.",
      bgColor: "bg-[#00FF00]",
      textColor: "text-white"
    },
    { 
      image: Streamer, 
      title: "Streamer", 
      description: "The Streamer tier is designed for established streamers who want to take their live streams to the next level. Enjoy a suite of advanced features to engage your audience and grow your community. Benefit from higher revenue share, custom branding options, and priority customer support. As a Streamer, you'll have the tools and resources you need to create exceptional live streaming experiences.",
      bgColor: "bg-[#0000FF]",
      textColor: "text-white"
    },
    { 
      image: RisingStar, 
      title: "Rising Star", 
      description: "The Streamer tier is for seasoned broadcasters who want to maximize their potential. Enjoy enhanced features like higher revenue share, custom branding options, and priority support. As a Streamer, you'll have the tools to create exceptional live streaming experiences and build a dedicated community.",
      bgColor: "bg-[#FF4343]",
      textColor: "text-[#F2FF00]"
    },
    { 
      image: Influencer, 
      title: "Influencer", 
      description: "The Influencer tier is for top-tier streamers who command large and engaged audiences. Enjoy exclusive perks like higher revenue share, premium branding options, and dedicated account management. As an Influencer, you'll have the resources and support to elevate your live streaming career to new heights.",
      bgColor: "bg-gradient-to-r from-[#FF00B7] to-[#A48438]",
      textColor: "text-white"
    },
    { 
      image: Celebrity, 
      title: "Celebrity", 
      description: "The Celebrity tier is for renowned personalities who want to leverage the power of live streaming. As a Celebrity, you'll have the platform to connect with your fans directly and create unforgettable live streaming experiences.",
      bgColor: "bg-gradient-to-b from-[#FFFFFF] to-[#0000FF]",
      textColor: "text-white"
    },
  ];

  return (
    <div className='h-[94vh] w-full overflow-x-hidden bg-[url("../public/tiershero.png")] bg-cover bg-center'>
      <div className='flex flex-col gap-y-4 w-screen h-full justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
        <h1 className='text-white text-4xl font-bold text-center'>Streambase's Streamer Tier Scheme</h1>
        <Image src={TierHeroText} alt='Logo' width={1920} height={1080} className="w-1/2" />
        </div>
        <div className='flex flex-row gap-4 justify-center items-center mt-4'>
          {tiers.map((tier, index) => (
            <div key={index} className="cursor-pointer relative" onClick={() => setSelectedTier(tier.title)}>
              <Image
                src={tier.image}
                alt={tier.title}
                width={1920}
                height={1080}
                className="w-full h-56 transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedTier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${tiers.find(tier => tier.title === selectedTier)?.bgColor} rounded-lg p-8 max-w-md`}>
            <h2 className={`text-2xl font-bold mb-4 ${tiers.find(tier => tier.title === selectedTier)?.textColor}`}>
              {selectedTier}
            </h2>
            <p className={`mb-4 ${tiers.find(tier => tier.title === selectedTier)?.textColor}`}>
              {tiers.find(tier => tier.title === selectedTier)?.description}
            </p>
            <button
              onClick={() => setSelectedTier(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TierHero