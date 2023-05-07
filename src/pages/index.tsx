import Demo from '@/sections/Demo'
import Footer from '@/sections/Footer'
import Hero from '@/sections/Hero'
import Integration from '@/sections/Integration'
import Navbar from '@/sections/Navbar'
import Setup from '@/sections/Setup'
import Showcase from '@/sections/Showcase'
import React from 'react'

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Setup />
      </main>
      <Integration />
      <main>
        <Demo />
      </main>
      <Showcase />
      <main>
        <Footer />
      </main>
    </>
  )
}

export default Index