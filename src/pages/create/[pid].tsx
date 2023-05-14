import Button from '@/components/Button'
import { ICampaigns } from '@/schemas/campaignInfo'
import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiNetworkChart } from 'react-icons/bi'
import { MdEmail } from 'react-icons/md'
import Creator from './Creator'
import { BsCurrencyDollar } from 'react-icons/bs'
import EC from './NotifType/EC'
import { defaultEmailData, defaultFlashData } from '@/Details'
import Flash from './NotifType/Flash'

const Create = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [selectedComp, setSelectedComp] = useState<JSX.Element>();
    const [isCompSelected, setIsCompSelected] = useState(false);
    const [startCreating, setStartCreating] = useState(false);
    const [currentCampaign, setCurrentCampaign] = useState<ICampaigns>();
    const [failCounts, setFailCounts] = useState(0);
    const [selectedTitle, setSelectedTitle] = useState("null");
    const { data: session } = useSession();
    const [curUserID, setCurUserID] = useState('');
    const weProvide = [
        {
            Icon: <MdEmail size={18} className='w-full block items-center text-[var(--light-slate)]' />,
            Title: "Email Collector",
            Description: "Easily collect emails and generate leads from your users.",
            Tag: "EmailCollector"
        }, {
            Icon: <BsCurrencyDollar size={18} className='w-full block items-center text-[var(--light-slate)]' />,
            Title: "Hot Sales",
            Description: "Display any information with clickable link",
            Tag: "HotSales"
        },

    ];

    useEffect(() => {
        getEmailInfo();
    }, [pid])

    const getEmailInfo = () => {
        if (session && session.user) {
            axios
                .get(`/api/getcampaign?action=getemail&target=${pid}&email=${session.user.email}`)
                .then((response) => {
                    if (response.data.exists) {
                        setCurrentCampaign(response.data.doc);
                        setCurUserID(response.data.user);
                    } else {
                        router.push('/dashboard');
                    }
                })
                .catch((err) => {
                    if (failCounts > 5) {
                        router.push('/dashboard');
                    } else {
                        const count = failCounts + 1;
                        setFailCounts(count);
                        getEmailInfo();
                    }
                });
        } else
            router.push('/dashboard');
    }

    const NotificationType = (_Tag: string) => {
        // const curComp = components[componentIndex[_Tag]];
        if (_Tag === "EmailCollector") {
            const component = <EC MountedData={defaultEmailData} ClosingButton={true} />
            setSelectedComp(component);
            setIsCompSelected(true);
            setSelectedTitle(_Tag);
        } else if (_Tag === "HotSales") {
            const component = <Flash MountedData={defaultFlashData} ClosingButton={true} />
            setSelectedComp(component);
            setIsCompSelected(true);
            setSelectedTitle(_Tag);
        }
    }

    const NotifCreated = (status: boolean) => {
        if (status)
            router.push(`/campaign/${pid}`);
    }

    return (
        <>
            <Head>
                <title>Create Notification - DevTools</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <Navbar />

            <div className='flex w-full bg-secondary mt-20'>
                <main className="w-full font-fira">
                    <div className="font-fira size-small text-[var(--slate)]">
                        <Link href={'/campaigns'} className='link'>Campaigns</Link> &gt; <Link href={`/campaign/${pid}`} className='link'>Campaign</Link> &gt; Create new notification
                    </div>
                    <div className="mainTitle mt-3 text-[var(--light-slate)] font-inter">Create a new notification</div>
                    <div className="text-[var(--slate)] flex">
                        <BiNetworkChart size={20} className='mr-2 mt-1' /> {currentCampaign ? currentCampaign.URL : "Loading.."} {startCreating && (<span className="ml-2 text-[var(--theme-color)]">{selectedTitle}</span>)}
                    </div>
                </main>
            </div>
            <main>

                {
                    startCreating ? (
                        <Creator campaignID={typeof pid === "string" ? pid : "null"} userID={curUserID} Tag={selectedTitle} onCompleted={NotifCreated} />
                    ) : (
                        isCompSelected ? (
                            <>
                                <div className='w-full flex justify-center mainTitle items-center mt-5 mb-5 font-inter text-[var(--light-slate)]'>
                                    Example
                                </div>
                                <div className='w-full flex justify-center items-center mt-5 mb-5'>
                                    {selectedComp}
                                </div>
                                <div className='w-full flex justify-center items-center text-center mt-5 mb-10'>
                                    <span onClick={() => setIsCompSelected(false)}><Button name='Go back' href='null' /></span><span onClick={() => setStartCreating(true)} className='ml-2'><Button name='Create' href='null' /></span>
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full mt-20 mb-20">
                                {weProvide.map((data, index) => (
                                    <div onClick={() => NotificationType(data.Tag)} className="justify-center text-center items-center bg-secondary pt-5 pb-5 service-grid" key={index}>
                                        {data.Icon}
                                        <div className="w-full p-3 block text-[var(--light-slate)]">{data.Title}</div>
                                        <div className="w-full p-3 block text-[var(--slate)]">{data.Description}</div>
                                    </div>
                                ))}
                            </div>
                        )
                    )
                }


                <Footer />
            </main>
        </>
    )
}

export default Create;