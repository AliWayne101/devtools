import { Web } from '@/Details';
import Loading from '@/components/Loading';
import { ICampaigns } from '@/schemas/campaignInfo';
import { INotification } from '@/schemas/notifInfo';
import Details from '@/sections/Dashboard/Details';
import LatestCampaigns from '@/sections/Dashboard/LatestCampaigns';
import Footer from '@/sections/Footer';
import Navbar from '@/sections/Navbar'
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export interface Props {
  userDetails: {
    _sysID: string,
    Membership: string,
    TotalImps: number,
  }
}

const Dashboard = ({ userDetails }: Props) => {

  const [TotalCampaigns, setTotalCampaigns] = useState<ICampaigns[]>([]);
  const [TotalNotifs, setTotalNotifs] = useState<INotification[]>([]);
  const [TotalImpression, setTotalImpression] = useState(userDetails.TotalImps ? userDetails.TotalImps : 0);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    axios
      .get(`/api/getdashboard?action=allcampaigns&target=${userDetails._sysID}`)
      .then((response) => {
        if (response.data.found) {
          setTotalCampaigns(response.data.docs);
          setIsLoading(false);
        } else {
          console.log(response.data.error);
        }
      })
      .catch(err => console.log)

    axios
      .get(`/api/notifications?action=getsomenotifs&target=${userDetails._sysID}`)
      .then((response) => {
        if (response.data.exists) {
          setTotalNotifs(response.data.docs);
        } else {
          console.log(response.data.error);
        }
      })
      .catch(err => console.log)


  }, []);

  useEffect(() => {

  }, [TotalNotifs])

  return (
    <>
      <Head>
        <title>Dashboard - DevTools</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <Navbar />
      {isLoading === false && (
        <Details camps={TotalCampaigns.length} notifs={TotalNotifs.length} imps={TotalImpression} userDetails={userDetails} />
      )}
      <main>
        <div className="mainTitle font-fira text-[var(--light-slate)] mb-5">
          Hello, <span className="text-[var(--theme-color)]">{session?.user?.name}</span>
        </div>
        {isLoading ? <Loading /> : (
          <LatestCampaigns userDetails={userDetails} CampData={TotalCampaigns} Show={5} NotifData={TotalNotifs.slice(0, 5)} />
        )}

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
  let totalImps = 0;
  if (session && session.user) {
    try {
      const response = await axios.get(`${Web.Server}/api/userdetails?action=generateID&target=${session.user.email}`);
      if (response.data.exists) {
        console.log(response.data);
        if (response.data.confirmed) {
          _sysID = response.data.sysID;
          membership = response.data.membership;
          totalImps = response.data.monthlyImps;
        }
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
        Membership: membership,
        TotalImps: totalImps
      }
    }
  }
}