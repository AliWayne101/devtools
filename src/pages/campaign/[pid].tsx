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
import { INotification } from '@/schemas/notifInfo'
import Toggle from '@/components/Toggle'
import { FaTrash } from 'react-icons/fa'

const Index = ({ userDetails }: Props) => {
  const router = useRouter();
  const { pid } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [mountDoc, setMountDoc] = useState<ICampaigns>();
  const [allNotifs, setAllNotifs] = useState<INotification[]>([]);

  useEffect(() => {
    if (pid) {
      axios.get(`/api/getcampaign?action=getcampaign&target=${pid}&userid=${userDetails._sysID}`)
        .then((response) => {
          if (response.data.exists) {
            setMountDoc(response.data.doc);
          } else {
            router.push('/dashboard');
          }
        })
        .catch(err => console.log);
    }
  }, [pid]);

  useEffect(() => {
    axios.get(`/api/notifications?action=getallnotifs&target=${pid}`)
      .then((response) => {
        if (response.data.exists) {
          setIsLoading(false);
          setAllNotifs(response.data.docs);
        }
      })
      .catch(err => console.log);
  }, [mountDoc]);

  const ChangeActive = (ID: string, newStatus: boolean) => {
    const newDocs: INotification[] = [];
    allNotifs.map((data) => {
      if (data._id === ID) {
        let currentNotif: INotification = allNotifs.find(({ _id }) => _id === ID)!;
        if (currentNotif)
          currentNotif.Active = newStatus;
        newDocs.push(currentNotif);
      } else
        newDocs.push(data);
    });
    setAllNotifs(newDocs);
    axios.get(`/api/notifications?action=setactivity&target=${ID}&newStatus=${newStatus}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(err => console.log);
  }

  const DeleteNotif = (ID: string, User: string) => {
    const newDocs: INotification[] = [];
    allNotifs.map((data) => {
      if (data._id !== ID)
        newDocs.push(data);
    });

    setAllNotifs(newDocs);
    axios.get(`/api/notifications?action=deletenotif&target=${ID}&user=${User}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(err => console.log);
  }

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
            <BiNetworkChart size={20} className='mr-2 mt-1' /> {mountDoc ? mountDoc.URL : "Loading.."}
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
                <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Trigger Delay</div>
                <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Duration</div>
                <div className='pt-4 pb-4 pl-2 pr-2'>Status</div>
                <div className='pt-4 pb-4 pl-2 pr-2'>Actions</div>
              </div>
              {allNotifs &&
                allNotifs.map((data, index) => (
                  <div className="w-full grid grid-cols-3 sm:grid-cols-5 font-fira text-[var(--slate)]" key={index}>
                    <div className='pt-4 pb-4 pl-3 pr-2'>{data.notifName}</div>
                    <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>{data.triggerValue} Seconds</div>
                    <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>{data.displayDuration} Seconds</div>
                    <div className='pt-4 pb-4 pl-2 pr-2'>
                      <span onClick={() => ChangeActive(data._id, !data.Active)} >
                        <Toggle isEnabled={data.Active} />
                      </span>
                    </div>
                    <div className='pt-4 pb-4 pl-2 pr-2'>
                      <span onClick={() => DeleteNotif(data._id, data.User)} className='cursor-pointer'><FaTrash size={16} title='Delete this notification' /></span>
                    </div>
                  </div>
                ))
              }
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