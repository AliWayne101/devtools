import Demo from '@/sections/Demo'
import Footer from '@/sections/Footer'
import Hero from '@/sections/Hero'
import Integration from '@/sections/Integration'
import Navbar from '@/sections/Navbar'
import Setup from '@/sections/Setup'
import Showcase from '@/sections/Showcase'
import Head from 'next/head'
import React from 'react'

const Index = () => {
  return (
    <>
      <Head>
        <title>DevTools</title>
        <meta name="description" content='Looking for an easy way to add notification widgets to your website without any coding skills? Our one-click notification widgets are designed just for you! Our user-friendly interface makes it easy to install and customize your notifications, giving you the power to engage with your audience in a whole new way. Try it today and take your website to the next level!' />
        <meta name="author" content='Ali Wains' />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
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