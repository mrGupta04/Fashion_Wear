import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero section - full width on mobile */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <Hero />
      </div>
      
      {/* Container for other sections with normal padding */}
      <div className="container mx-auto px-4 sm:px-6">
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
       
      </div>
    </div>
  )
}

export default Home