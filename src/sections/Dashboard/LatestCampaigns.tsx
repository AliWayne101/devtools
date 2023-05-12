import Button from '@/components/Button'
import Toggle from '@/components/Toggle'
import React, { useEffect, useState, useRef } from 'react'
import { FaCode, FaSignature, FaTrash } from 'react-icons/fa'
import { BiNetworkChart } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import { ICampaigns } from '@/schemas/campaignInfo'
import Link from 'next/link'
import mongoose from 'mongoose'
import axios from 'axios'
import { Tier, iTier } from '@/Details'
import Loading from '@/components/Loading'
import { RiEdit2Fill } from 'react-icons/ri'
import { Web } from '@/Details'
import { INotification } from '@/schemas/notifInfo'

const LatestCampaigns = ({ userDetails, CampData, Show, NotifData }: {
    userDetails: {
        _sysID: string,
        Membership: string,
    },
    CampData: ICampaigns[],
    Show: number,
    NotifData: INotification[]
}) => {
    const [writeCampaign, setWriteCampaign] = useState(false);
    const [addWebDetails, setAddWebDetails] = useState({
        Name: "",
        URL: "",
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [recentCampaigns, setRecentCampaigns] = useState<ICampaigns[]>(CampData);
    const [recentNotifications, setRecentNotifications] = useState<INotification[]>(NotifData);
    const [membership, setMembership] = useState<iTier>();
    const [isCreatingCamp, setIsCreatingCamp] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [curCampAddr, setCurCampAddr] = useState("");
    const { data: session } = useSession();

    const copyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const _tier = Tier.find(({ Membership }) => Membership === userDetails.Membership);
        setMembership(_tier);
    }, [userDetails.Membership])

    useEffect(() => {
        setRecentCampaigns(CampData);
        setRecentNotifications(NotifData);
    }, [CampData])

    const DeleteCampaign = (UserID: string, CampaignID: string) => {
        if (UserID.length === 32 && CampaignID.length === 10) {
            setIsCreatingCamp(true);
            setWriteCampaign(true);
            axios
                .get(`/api/getdashboard?action=deletecampaign&target=${CampaignID}&userid=${UserID}`)
                .then((response) => {
                    if (response.data.deleted) {
                        refreshCampaignData();
                    } else {
                        console.log(response.data);
                    }
                })
                .catch(err => console.log);
        }
    }
    const InstallCampaign = (UserID: string, CampaignID: string) => {
        if (UserID.length === 32 && CampaignID.length === 10) {
            setCurCampAddr(CampaignID);
            setShowModal(true);
        }
    }
    const EditCampaign = (UserID: string, CampaignID: string) => {
        if (UserID.length === 32 && CampaignID.length === 10) {
            //Create a component, similar to adding new campaign and fill all values using useStateHooks
        }
    }

    const refreshCampaignData = () => {
        axios
            .get(`/api/getdashboard?action=allcampaigns&target=${userDetails._sysID}`)
            .then((response) => {
                if (response.data.found) {
                    setRecentCampaigns(response.data.docs);
                }
                setIsCreatingCamp(false);
                setWriteCampaign(false);
            })
            .catch(err => console.log);
    }

    const AddWebsite = () => {
        if (session && session.user) {
            if (addWebDetails.Name.length > 0 && addWebDetails.URL.length > 0) {
                if (addWebDetails.URL.includes('.')) {
                    setIsCreatingCamp(true);
                    axios
                        .get(`/api/getdashboard?action=addcampaign&target=${addWebDetails.URL}&campname=${addWebDetails.Name}&user=${userDetails._sysID}&email=${session.user.email}`)
                        .then((response) => {
                            if (response.data.created) {
                                refreshCampaignData();
                            } else {
                                console.log(response.data);
                            }
                        })
                        .catch(err => console.log);
                } else
                    setErrorMsg('Invalid website address');
            } else
                setErrorMsg('Please make sure all the fields are filled.');
        } else
            setErrorMsg('Please try again..');
    }

    const handleChange = (e: HTMLInputElement) => {
        setAddWebDetails({
            ...addWebDetails, [e.name]: e.value
        })
    }

    const changeStatus = async (status: boolean, _URL: string) => {
        const newState = status === true ? false : true;
        const newDocs: ICampaigns[] = [];
        let targetID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
        recentCampaigns.map((doc) => {
            if (doc.URL !== _URL) {
                newDocs.push(doc);
            } else {
                const mockDoc: ICampaigns = {
                    _id: doc._id,
                    Name: doc.Name,
                    URL: doc.URL,
                    Tstamp: doc.Tstamp,
                    isActive: newState,
                    User: doc.User,
                    selfID: doc.selfID,
                    Email: session?.user?.email || "email"
                }
                newDocs.push(mockDoc);
                targetID = doc._id;
            }
        });
        setRecentCampaigns(newDocs);

        const addr = `/api/getdashboard?action=changestatus&target=${JSON.stringify(targetID)}&nstate=${newState}`;
        axios.get(addr).then((e) => { console.log(e.data) }).catch(e => console.log);
    }

    const CopyText = async () => {
        try {
            await navigator.clipboard.writeText(copyRef.current?.innerText || '');
            console.log('Text has been copied');
        } catch (err) {
            console.log(err);
        }
    }


    const ChangeActive = (ID: string, newStatus: boolean) => {
        const newDocs: INotification[] = [];
        recentNotifications.map((data) => {
            if (data._id === ID) {
                let currentNotif: INotification = recentNotifications.find(({ _id }) => _id === ID)!;
                if (currentNotif)
                    currentNotif.Active = newStatus;
                newDocs.push(currentNotif);
            } else
                newDocs.push(data);
        });
        setRecentNotifications(newDocs);
        axios.get(`/api/notifications?action=setactivity&target=${ID}&newStatus=${newStatus}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch(err => console.log);
    }

    const DeleteNotif = (ID: string, User: string) => {
        const newDocs: INotification[] = [];
        recentNotifications.map((data) => {
            if (data._id !== ID)
                newDocs.push(data);
        });

        setRecentNotifications(newDocs);
        axios.get(`/api/notifications?action=deletenotif&target=${ID}&user=${User}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch(err => console.log);
    }

    return (
        <div className="w-full mb-20">
            {
                showModal ? (
                    <>
                        <div className='flex justify-between'>
                            <div className="inter subTitle text-[var(--slate)]">
                                Installation
                            </div>
                            <span onClick={() => { setShowModal(false); }}><Button name={'Show Campaigns'} href={'null'} /></span>
                        </div>
                        <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px] p-5  font-fira text-[var(--slate)]">
                            Copy and paste the following JS Code Snippet before the end of the <span className="link">head</span> tag of your website.
                            <div className="overflow-auto min-h-fit bg-primary p-10 mt-2 mb-2" ref={copyRef}>
                                &lt;!-- DevTools Code from {Web.Server} --&gt;<br />
                                &lt;script defer src=&quot;{Web.Server}/api/cdn/{userDetails._sysID}{curCampAddr}&quot;&gt;&lt;/script&gt;<br />
                                &lt;-- END DevTools Code --&gt;
                            </div>
                            <span onClick={() => CopyText()}><Button name={'Copy'} href={'null'} /></span>
                        </div>
                    </>
                ) : (
                    writeCampaign ? (
                        isCreatingCamp ? (
                            <Loading />
                        ) : (
                            <>
                                <div className='flex justify-between'>
                                    <div className="inter subTitle text-[var(--slate)]">
                                        Create a new campaign
                                    </div>
                                    <span onClick={() => setWriteCampaign(false)}><Button name={'Show Campaigns'} href={'null'} /></span>
                                </div>
                                <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px] p-10">
                                    <div className="flex inter text-[var(--slate)]">
                                        <FaSignature size={20} />&nbsp; Name
                                    </div>
                                    <input type="text" name="Name" id="Name" onChange={(e) => handleChange(e.currentTarget)} className='mt-2 mb-3 p-2 border-2 border-indigo-400 bg-transparent w-full sm:w-[500px] focus:outline-none text-[var(--slate)] font-fira' />
                                    <div className="flex inter text-[var(--slate)]">
                                        <BiNetworkChart size={20} />&nbsp; Website
                                    </div>
                                    <input type="text" name="URL" id="URL" onChange={(e) => handleChange(e.currentTarget)} className='mt-2 mb-3 p-2 border-2 border-indigo-400 bg-transparent w-full sm:w-[500px] focus:outline-none text-[var(--slate)] font-fira' placeholder='ex: domain.com or subdomain.domain.com' />
                                    <p className="mt-1 mb-2 pl-4 text-[var(--slate)] font-fira">
                                        Please make sure to specify the domain name of the website where the campaign will run,<br />
                                        as notifications will only work on the domain you define.
                                    </p>
                                    {errorMsg.length > 0 && (
                                        <p className="text-red-300 mb-2">{errorMsg}</p>
                                    )}
                                    {
                                        membership && (
                                            recentCampaigns.length < membership.ALLOWED_CAMPAIGNS ? (

                                                <span onClick={AddWebsite} className='mt-1'>
                                                    <Button name="Create" href='null' />
                                                </span>
                                            ) : (
                                                <p className="text-red-300 mb-2">You&apos;ve reached the maximum amount of campaigns to be allowed on your account</p>
                                            )
                                        )
                                    }
                                </div>
                            </>
                        )
                    ) : (
                        <>
                            <div className='flex justify-between'>
                                <div className="inter subTitle text-[var(--slate)]">
                                    {Show === 5 ? (<>Latest Campaigns</>) : (<>All Campaigns</>)}
                                </div>
                                <span onClick={() => setWriteCampaign(true)}><Button name={'Add Campaigns'} href={'null'} /></span>
                            </div>
                            <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px]">
                                <div className="w-full grid grid-cols-3 sm:grid-cols-4 font-fira text-[var(--light-slate)]">
                                    <div className='pt-4 pb-4 pl-3 pr-2'>Name</div>
                                    <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Created on</div>
                                    <div className='pt-4 pb-4 pl-2 pr-2'>Status</div>
                                    <div className='pt-4 pb-4 pl-2 pr-2'>Actions</div>
                                </div>
                                {
                                    recentCampaigns.map((data, index) => (
                                        <div key={index} className="w-full grid grid-cols-3 sm:grid-cols-4 font-fira text-[var(--slate)]">
                                            <div className='pt-4 pb-4 pl-3 pr-2'>
                                                <Link href={`/campaign/${data.selfID}`} className='text-ellipsis overflow-hidden' title={data.Name}>
                                                    <span className="link mb-1 font-fira">{data.Name}</span>
                                                </Link>
                                                <div className="mt-1 text-ellipsis overflow-hidden" title={data.URL}>{data.URL}</div>
                                            </div>
                                            <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex font-fira font-small'>{new Date(data.Tstamp).toLocaleDateString()} <br /> {new Date(data.Tstamp).toLocaleTimeString()} </div>
                                            <div className='pt-4 pb-4 pl-2 pr-2 align-middle'><span onClick={() => changeStatus(data.isActive, data.URL)}><Toggle isEnabled={data.isActive} /></span></div>
                                            <div className='pt-4 pb-4 pl-2 pr-2 grid grid-cols-3 gap-2 text-[var(--theme-color)] align-middle'>
                                                <span onClick={() => InstallCampaign(data.User, data.selfID)} className='cursor-pointer'><FaCode size={20} title='Install code in your website' /></span>
                                                <span onClick={() => EditCampaign(data.User, data.selfID)} className='cursor-pointer'><RiEdit2Fill size={20} title='Edit this campaign' /></span>
                                                <span onClick={() => DeleteCampaign(data.User, data.selfID)} className='cursor-pointer'><FaTrash size={16} title='Delete this campaign' /></span>
                                            </div>
                                        </div>
                                    ))

                                }
                            </div>
                        </>
                    )
                )
            }

            {
                Show === 5 && (
                    <>
                        <div className='flex inter subTitle text-[var(--slate)] mt-10'>
                            Latest Notifications
                        </div>
                        <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px]">
                            <div className="w-full grid grid-cols-3 sm:grid-cols-5 font-fira text-[var(--light-slate)]">
                                <div className='pt-4 pb-4 pl-3 pr-2'>Name</div>
                                <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Trigger Delay</div>
                                <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Duration</div>
                                <div className='pt-4 pb-4 pl-2 pr-2'>Status</div>
                                <div className='pt-4 pb-4 pl-2 pr-2'>Actions</div>
                            </div>
                            {recentNotifications &&
                                recentNotifications.map((data, index) =>
                                    index < Show && (
                                        <div className="w-full grid grid-cols-3 sm:grid-cols-5 font-fira text-[var(--slate)]" key={index}>
                                            <div className='pt-4 pb-4 pl-3 pr-2'>
                                                <div>{data.notifName}</div>
                                                <div>{data.NotifType}</div>
                                            </div>
                                            <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>{data.triggerValue} Seconds</div>
                                            <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>{data.displayDuration} Seconds</div>
                                            <div className='pt-4 pb-4 pl-2 pr-2'>
                                                <span onClick={() => ChangeActive(data._id, !data.Active)} >
                                                    <Toggle isEnabled={data.Active} />
                                                </span>
                                            </div>
                                            <div className='pt-4 pb-4 pl-2 pr-2 text-[var(--theme-color)]'>
                                                <span onClick={() => DeleteNotif(data._id, data.User)} className='cursor-pointer'><FaTrash size={16} title='Delete this notification' /></span>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </>
                )
            }


        </div>
    )
}


export default LatestCampaigns