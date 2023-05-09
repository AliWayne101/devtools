import Details from '@/sections/Dashboard/Details';
import LatestCampaigns from '@/sections/Dashboard/LatestCampaigns';
import Footer from '@/sections/Footer';
import Navbar from '@/sections/Navbar'
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export interface Props {
  _sysID: string
}

const Dashboard = ({ _sysID }: Props) => {
  return (
    <>
      <Navbar />
      <Details />
      <main>
        <LatestCampaigns sysID={_sysID} />
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
      },
      props: {}
    }
  }

  let _sysID = "null";
  if (session && session.user) {
    try {
      const response = await axios.get(`/api/userdetails?action=generateID&target=${session.user.email}`);
      if (response.data.exists) {
        if (response.data.confirmed)
          _sysID = response.data.sysID;
      } else {
        const resp2 = await axios.post(`/api/userdetails`, {
          Email: session.user.email,
          FullName: session.user.name,
        }
        );
        _sysID = resp2.data.sysID;
      }
    } catch (err) {
      console.log('Error');
      console.log(err);
    }
  }

  return {
    props: {
      _sysID
    }
  }
}