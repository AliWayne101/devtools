import Details from '@/sections/Dashboard/Details';
import LatestCampaigns from '@/sections/Dashboard/LatestCampaigns';
import Footer from '@/sections/Footer';
import Navbar from '@/sections/Navbar'
import React from 'react'

const Dashboard = () => {
  return (
    <>
        <Navbar />
        <Details />
        <main>
          <LatestCampaigns session={null} />
          <Footer />
        </main>
    </>
  )
}

export default Dashboard;