import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BiNetworkChart } from 'react-icons/bi'

const Create = () => {
    const router = useRouter();
    const { pid } = router.query;
  return (
    <>
      <Head>
        <title>Create Notification - DevTools</title>
      </Head>
      <Navbar />

      <div className='flex w-full bg-secondary mt-20'>
        <main className="w-full font-fira">
          <div className="font-fira size-small text-[var(--slate)]">
            <Link href={'/campaigns'} className='link'>Campaigns</Link> &gt; <Link href={`/campaign/${pid}`} className='link'>Campaign</Link> &gt; Create new notification
          </div>
          <div className="mainTitle mt-3 text-[var(--light-slate)] font-inter">Create a new notification</div>
          <div className="text-[var(--slate)] flex">
            <BiNetworkChart size={20} /> Loading..
          </div>
        </main>
      </div>
      <main>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full mt-20 mb-20">
            <div className="justify-center text-center items-center bg-secondary pt-5 pb-5">
                <div className="w-full p-3 block text-[var(--light-slate)]">Icon</div>
                <div className="w-full p-3 block text-[var(--light-slate)]">Icon</div>
                <div className="w-full p-3 block text-[var(--slate)]">Icon</div>
            </div>
        </div>

        <Footer />
      </main>
    </>
  )
}

export default Create