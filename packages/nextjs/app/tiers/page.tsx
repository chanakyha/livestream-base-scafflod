'use client'
import React from 'react'
import Banner from '~~/components/Banner'
import TierHero from '~~/components/TierHero'

const page = () => {
  return (
    <main className="h-screen w-full overflow-x-hidden">
    <TierHero />
    <Banner />
    </main>
  )
}

export default page