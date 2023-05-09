import { Web } from '@/Details';
import { ICampaigns } from '@/schemas/campaignInfo';
import Details from '@/sections/Dashboard/Details';
import LatestCampaigns from '@/sections/Dashboard/LatestCampaigns';
import Footer from '@/sections/Footer';
import Navbar from '@/sections/Navbar'
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Head } from 'next/document';
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
    const target = encodeURIComponent(session.user.email + "");
    try {
      const response = await axios.get(`${Web.Server}/api/userdetails?action=generateID&target=${target}`);
      console.log('Checking first response..');
      console.log(response.data);
      if (response.data.exists) {
        if (response.data.confirmed)
          _sysID = response.data.sysID;
          membership = response.data.membership;
      } else {
        console.log('Registering new data..');
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