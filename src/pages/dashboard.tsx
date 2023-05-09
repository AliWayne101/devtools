import Details from '@/sections/Dashboard/Details';
import LatestCampaigns from '@/sections/Dashboard/LatestCampaigns';
import Footer from '@/sections/Footer';
import Navbar from '@/sections/Navbar'
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import React from 'react'

interface Props {
  session: Session | null
}

const Dashboard = ({session}: Props) => {
  console.log(`Dashboard: ${session}`);
  console.info(session);
  
  return (
    <>
        <Navbar />
        <Details />
        <main>
          <LatestCampaigns />
          <Footer />
        </main>
    </>
  )
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}