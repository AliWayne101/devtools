import Button from '@/components/Button'
import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiNetworkChart } from 'react-icons/bi'
import { Props } from '../dashboard'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Web } from '@/Details'
import axios from 'axios'
import Loading from '@/components/Loading'
import { ICampaigns } from '@/schemas/campaignInfo'

const Index = ({ userDetails }: Props) => {
  const router = useRouter();
  const { pid } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [mountDoc, setMountDoc] = useState<ICampaigns>();
  
  useEffect(() => {
    if (pid) {
      axios.get(`/api/getcampaign?action=getcampaign&target=${pid}&userid=${userDetails._sysID}`)
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          setMountDoc(response.data.doc);
          if (response.data.exists) {
            setIsLoading(false);
            setMountDoc(response.data.doc);
          } else {
            //router.push('/dashboard');
            console.log('Not found');
          }
        })
        .catch(err => console.log);
    }
  }, [pid]);

  return (
    <>
      <Head>
        <title>Campaign - DevTools</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <Navbar />

      <div className='flex w-full bg-secondary mt-20'>
        <main className="w-full font-fira">
          <div className="font-fira size-small text-[var(--slate)]">
            <Link href={'/campaigns'} className='link'>Campaigns</Link> &gt; Campaign
          </div>
          <div className="mainTitle mt-3 text-[var(--light-slate)] font-inter">{mountDoc ? mountDoc.Name : "Loading.."}</div>
          <div className="text-[var(--slate)] flex">
            <BiNetworkChart size={20} /> {mountDoc ? mountDoc.URL : "Loading.."}
          </div>
        </main>
      </div>
      <main>

        <div className="flex justify-between mt-10">
          <div className='flex inter subTitle text-[var(--slate)]'>
            Notifications
          </div>
          <span><Button name={'Create Notification'} href={`/create/${pid}`} /></span>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px] mb-20">
              <div className="w-full grid grid-cols-3 sm:grid-cols-5 font-fira text-[var(--light-slate)]">
                <div className='pt-4 pb-4 pl-3 pr-2'>Name</div>
                <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Trigger</div>
                <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Duration</div>
                <div className='pt-4 pb-4 pl-2 pr-2'>Status</div>
                <div className='pt-4 pb-4 pl-2 pr-2'>Actions</div>
              </div>
              <div className="w-full grid grid-cols-3 sm:grid-cols-5 font-fira text-[var(--slate)]">

              </div>
            </div>
          </>
        )}

        <Footer />
      </main>
    </>
  )
}

export default Index;

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
        Membership: membership
      }
    }
  }
}