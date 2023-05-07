import Hero from '@/sections/Hero'
import Navbar from '@/sections/Navbar'
import Setup from '@/sections/Setup'
import React from 'react'

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Setup />

      </main>
    </>

  )
}

export default Index