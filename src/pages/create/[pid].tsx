import components, { componentIndex } from '@/NotifPreviews'
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


const Create = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [selectedComp, setSelectedComp] = useState<JSX.Element>();
    const [isCompSelected, setIsCompSelected] = useState(false);
    const [startCreating, setStartCreating] = useState(false);
    const [currentCampaign, setCurrentCampaign] = useState<ICampaigns>();
    const { data: session } = useSession();
    const weProvide = [
        {
            Icon: <MdEmail size={18} className='w-full block items-center text-[var(--light-slate)]' />,
            Title: "Email Collector",
            Description: "Easily collect emails and generate leads from your users.",
            Tag: "EmailCollector"
        }, {
            Icon: <MdEmail size={18} className='w-full block items-center text-[var(--light-slate)]' />,
            Title: "Email Collector",
            Description: "Easily collect emails and generate leads from your users.",
            Tag: "EmailCollector"
        }, {
            Icon: <MdEmail size={18} className='w-full block items-center text-[var(--light-slate)]' />,
            Title: "Email Collector",
            Description: "Easily collect emails and generate leads from your users.",
            Tag: "EmailCollector"
        },

    ];

    useEffect(() => {
        axios
            .get(`/api/getcampaign?action=getemail&target=${pid}`)
            .then((response) => {
                if (response.data.exists) {
                    if (session && session.user) {
                        if (response.data.email !== session.user.email)
                            router.push('/dashboard');
                        else
                            setCurrentCampaign(response.data.doc);
                    } else
                        router.push('/dashboard');
                } else
                    router.push('/dashboard');
            })
            .catch((err) => {
                router.push('/dashboard');
            })
    }, [pid])

    const NotificationType = (_Tag: string) => {
        const curComp = components[componentIndex[_Tag]];
        setSelectedComp(curComp);
        setIsCompSelected(true);
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
                        <BiNetworkChart size={20} /> {currentCampaign ? currentCampaign.URL : "Loading.."}
                    </div>
                </main>
            </div>
            <main>

                {
                    startCreating ? (
                        <div></div>
                    ) : (
                        isCompSelected ? (
                            <>
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


interface DocProps {
    userEmail: string
}