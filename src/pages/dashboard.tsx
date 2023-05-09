import { Web } from '@/Details';
import { ICampaigns } from '@/schemas/campaignInfo';
import Details from '@/sections/Dashboard/Details';
import LatestCampaigns from '@/sections/Dashboard/LatestCampaigns';
import Footer from '@/sections/Footer';
import Navbar from '@/sections/Navbar'
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export interface Props {
  userDetails: {
    _sysID: string,
    Membership: string,
  }
}

const Dashboard = ({ userDetails }: Props) => {

  const [TotalCampaigns, setTotalCampaigns] = useState<ICampaigns[]>([]);

  useEffect(() => {
    axios
      .get(`/api/getdashboard?action=allcampaigns&target=${userDetails._sysID}`)
      .then((response) => {
        if (response.data.found) {
          setTotalCampaigns(response.data.docs);
        } else {
          console.log(response.data.error);
        }
      })
      .catch(err => console.log)
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard - DevTools</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Navbar />
      <Details camps={TotalCampaigns.length} notifs={0} imps={0} />
      <main>
        <LatestCampaigns userDetails={userDetails} CampData={TotalCampaigns} />
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
  let membership = "Free";
  if (session && session.user) {
    try {
      const response = await axios.get(`${Web.Server}/api/userdetails?action=generateID&target=${session.user.email}`);
      if (response.data.exists) {
        if (response.data.confirmed)
          _sysID = response.data.sysID;
          membership = response.data.membership;
      } else {
        const resp2 = await axios.post(`${Web.Server}/api/userdetails`, {
          Email: session.user.email,
          FullName: session.user.name,
        }
        );
        _sysID = resp2.data.sysID;
        membership = response.data.membership;
      }
    } catch (err) {
      console.log('Error');
      console.log(err);
    }
  }

  return {
    props: {
      userDetails: {
        _sysID: _sysID,
        Membership: "Free"
      }
    }
  }
}