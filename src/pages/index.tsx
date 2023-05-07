import Hero from '@/sections/Hero'
import Integration from '@/sections/Integration'
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
      <Integration />
    </>

  )
}

export default Index