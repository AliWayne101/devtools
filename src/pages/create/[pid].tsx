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
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { BiNetworkChart } from 'react-icons/bi'
import { FaCog, FaPaintBrush } from 'react-icons/fa'
import { MdEmail, MdMonitor } from 'react-icons/md'
import { TbActivity } from 'react-icons/tb'


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

    const [activeIndex, setActiveIndex] = useState(0);

    const handleDivClick = (index: number) => {
        setActiveIndex(index);
    }

    const getDivClassname = (index: number) => {
        return `cursor-pointer p-3 flex ${activeIndex === index ? 'bg-gray-200 rounded rounded-[20px]' : 'text-[var(--slate)]'}`;
    }

    const [basicData, setBasicData] = useState({
        notifName: "My new notification",
        notifTitle: "Weekly newsletter",
        notifDesc: "We do not send out spam emails & you can unsubscribe at any point.",
        notifNPlaceholder: "Your name",
        notifEPlaceholder: "Your email",
        notifButton: "Sign me up",
        notifRedirect: ""
    });

    const updateBasic = (e: HTMLInputElement) => {
        setBasicData({
            ...basicData, [e.name]: e.value
        });
    }

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

    const NotificationType = (_Tag: string, Title: string) => {
        const curComp = components[componentIndex[_Tag]];
        setSelectedComp(curComp);
        setIsCompSelected(true);
        setSelectedTitle(Title);
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
                        <div className="w-full mb-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                <div className='mb-10 flex items-center'>
                                    <div className="mainTitle text-[var(--light-slate)] font-inter ml-2 ">Preview</div>
                                </div>
                                <div className="flex justify-end items-end mb-10">

                                    <div className="devToolsBox">
                                        <div className='dt_container_head'>
                                            <b>{basicData.notifTitle}</b>
                                            <span className='closingButton' title='Close'>X</span>
                                        </div>
                                        <div className='dt_container_body'>
                                            <p>{basicData.notifDesc}</p>
                                            <div className='dt_inline_input'>
                                                <input type="text" name="name" id="name" placeholder={basicData.notifNPlaceholder} />
                                                <input type="email" name="email" id="email" placeholder={basicData.notifEPlaceholder} />
                                            </div>
                                            <button className='dt_button'>{basicData.notifButton}</button>
                                            <div className='dt_copyright'>Powered by DevTools</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="mainTitle font-inter text-[var(--slate)]">
                                Settings
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                                <div className="col-span-1 mt-5 pb-5">
                                    <div className={getDivClassname(0)} onClick={() => handleDivClick(0)}>
                                        <FaCog size={20} className='mr-4 mt-1' /> Basic
                                    </div>
                                    <div className={getDivClassname(1)} onClick={() => handleDivClick(1)}>
                                        <TbActivity size={20} className='mr-4 mt-1' /> Triggers
                                    </div>
                                    <div className={getDivClassname(2)} onClick={() => handleDivClick(2)}>
                                        <MdMonitor size={20} className='mr-4 mt-1' /> Display
                                    </div>
                                    <div className={getDivClassname(3)} onClick={() => handleDivClick(3)}>
                                        <FaPaintBrush size={20} className='mr-4 mt-1' /> Customize
                                    </div>
                                    <div className={getDivClassname(4)} onClick={() => handleDivClick(4)}>
                                        <FaCog size={20} className='mr-4 mt-1' /> Data
                                    </div>
                                </div>
                                <div className="col-span-3 mt-5 size-body">
                                    {activeIndex === 0 ? (
                                        <>
                                        <div className="text-[var(--slate)] font-inter mt-1">
                                            <div>Notification</div>
                                            <input type="text" name="notifName" value={basicData.notifName} className="p-2 w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                                        </div>
                                        
                                        <div className="text-[var(--slate)] font-inter mt-3">
                                            <div>Title Message</div>
                                            <input type="text" name="notifTitle" value={basicData.notifTitle} className="p-2 w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                                        </div>
                                        
                                        <div className="text-[var(--slate)] font-inter mt-3">
                                            <div>Description Message</div>
                                            <input type="text" name="notifDesc" value={basicData.notifDesc} className="p-2 w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                                        </div>
                                        
                                        <div className="text-[var(--slate)] font-inter mt-3">
                                            <div>Name Placeholder</div>
                                            <input type="text" name="notifNPlaceholder" value={basicData.notifNPlaceholder} className="p-2 w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                                        </div>
                                        
                                        <div className="text-[var(--slate)] font-inter mt-3">
                                            <div>Email Placeholder</div>
                                            <input type="text" name="notifEPlaceholder" value={basicData.notifEPlaceholder} className="p-2 w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                                        </div>
                                        
                                        <div className="text-[var(--slate)] font-inter mt-3">
                                            <div>Button Text</div>
                                            <input type="text" name="notifButton" value={basicData.notifButton} className="p-2 w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                                        </div>
                                        
                                        <div className="text-[var(--slate)] font-inter mt-3">
                                            <div>Success Redirect (URL)</div>
                                            <input type="text" name="notifButton" value={basicData.notifButton} className="p-2 w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                                            <p className="font-small">the user will be redirected to after submitting the form. Leave empty to disable the function.</p>
                                        </div>
                                        
                                        <div className="mt-4">
                                            <span><Button name="Create" href="null" /></span>
                                        </div>
                                        </>
                                    ) : (
                                        <p>Or is it?.</p>
                                    )}
                                </div>
                            </div>

                        </div>
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
                                    <div onClick={() => NotificationType(data.Tag, data.Title)} className="justify-center text-center items-center bg-secondary pt-5 pb-5 service-grid" key={index}>
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