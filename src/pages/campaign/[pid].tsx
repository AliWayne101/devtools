import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { BiNetworkChart } from 'react-icons/bi'

const Index = () => {
  return (
    <>
      <Head>
        <title>Campaign - DevTools</title>
      </Head>
      <Navbar />

      <div className='flex w-full bg-secondary mt-20'>
        <main className="w-full font-fira">
          <div className="font-fira size-small text-[var(--slate)]">
            <Link href={'/campaigns'} className='link'>Campaigns</Link> &gt; Campaign
          </div>
          <div className="mainTitle mt-3 text-[var(--light-slate)] font-inter">Register</div>
          <div className="text-[var(--slate)] flex">
            <BiNetworkChart size={20} /> Example.com
          </div>
        </main>
      </div>
      <main>
        <Footer />
      </main>
    </>
  )
}

export default Index