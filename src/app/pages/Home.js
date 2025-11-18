"use client"
// import HomeBanner from '@/components/Home/HomeBanner.js'
import NavbarTwo from '@/components/Layout/Navbar.js'
import React, { useState } from 'react'

import Footer from '@/components/Layout/Footer.js'
import HomeBanner from '@/components/Home/HomeBanner'
import ParallaxShowcase from '@/components/Home/ParallaxShowcase'
import DefineUsSection from '@/components/Home/DefineUsSection'

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      
      <div className=' font-onest lg:overflow-visible overflow-hidden'>
        <NavbarTwo />
        <HomeBanner />
        <ParallaxShowcase />
        <DefineUsSection />
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Home