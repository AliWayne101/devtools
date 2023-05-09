import Button from '@/components/Button'
import Toggle from '@/components/Toggle'
import React, { useEffect, useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import { BiNetworkChart } from 'react-icons/bi'
import { getSession, useSession } from 'next-auth/react'
import { ICampaigns } from '@/schemas/campaignInfo'
import Link from 'next/link'
import { Session } from 'next-auth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'


interface returnProps {
    session: Session | null,
    recentDocs: ICampaigns[]
}

const LatestCampaigns = ({ session, recentDocs }: returnProps) => {
    const [writeCampaign, setWriteCampaign] = useState(false);
    const [addWebDetails, setAddWebDetails] = useState({
        Name: "",
        URL: "",
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [recentCampaigns, setRecentCampaigns] = useState<ICampaigns[]>([]);

    const { data: _session } = useSession();
    console.log(session);
    const AddWebsite = () => {
        if (addWebDetails.Name.length > 0 && addWebDetails.URL.length > 0) {
            if (addWebDetails.URL.includes('.')) {

            } else
                setErrorMsg('Invalid website address');
        } else
            setErrorMsg('Please make sure all the fields are filled.');
    }

    const handleChange = (e: HTMLInputElement) => {
        setAddWebDetails({
            ...addWebDetails, [e.name]: e.value
        })
    }

    const changeStatus = async (status: boolean, _URL: string) => {
        const newState = status === true ? false : true;
        const newDocs: ICampaigns[] = [];
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
                }
                newDocs.push(mockDoc);
            }
        });
        setRecentCampaigns(newDocs);

        //write axios code to send request
        // const updated = await campModel.findOneAndUpdate({ URL: _URL }, { isActive: newState });
        // console.log(updated);
    }

    return (
        <div className="w-full mb-20">
            <div className="mainTitle fira-code text-[var(--light-slate)] mb-5">
                Hello, <span className="text-[var(--theme-color)]">{session?.user?.name}</span>
            </div>
            {
                writeCampaign ? (
                    <>
                        <div className='flex justify-between'>
                            <div className="inter subTitle text-[var(--slate)]">
                                Create a new campaign
                            </div>
                            <span onClick={() => setWriteCampaign(false)}><Button name={'Show latest'} href={'null'} /></span>
                        </div>
                        <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px] p-10">
                            <div className="flex inter text-[var(--slate)]">
                                <FaSignature size={20} />&nbsp; Name
                            </div>
                            <input type="text" name="Name" id="Name" onChange={(e) => handleChange(e.currentTarget)} className='mt-2 mb-3 p-2 border-2 border-indigo-400 bg-transparent w-full sm:w-[500px] focus:outline-none text-[var(--slate)] fira-code' />
                            <div className="flex inter text-[var(--slate)]">
                                <BiNetworkChart size={20} />&nbsp; Website
                            </div>
                            <input type="text" name="URL" id="URL" onChange={(e) => handleChange(e.currentTarget)} className='mt-2 mb-3 p-2 border-2 border-indigo-400 bg-transparent w-full sm:w-[500px] focus:outline-none text-[var(--slate)] fira-code' placeholder='ex: domain.com or subdomain.domain.com' />
                            <p className="mt-1 mb-2 pl-4 text-[var(--slate)] fira-code">
                                Please make sure to specify the domain name of the website where the campaign will run,<br />
                                as notifications will only work on the domain you define.
                            </p>
                            {errorMsg.length > 0 && (
                                <p className="text-red-300 mb-2">{errorMsg}</p>
                            )}
                            <span onClick={AddWebsite} className='mt-1'>
                                <Button name="Create" href='none' />
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex justify-between'>
                            <div className="inter subTitle text-[var(--slate)]">
                                Latest Campaigns
                            </div>
                            <span onClick={() => setWriteCampaign(true)}><Button name={'Add Campaigns'} href={'null'} /></span>
                        </div>
                        <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px]">
                            <div className="w-full grid grid-cols-3 sm:grid-cols-4 fira-code text-[var(--light-slate)]">
                                <div className='pt-4 pb-4 pl-3 pr-2'>Name</div>
                                <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Created on</div>
                                <div className='pt-4 pb-4 pl-2 pr-2'>Status</div>
                                <div className='pt-4 pb-4 pl-2 pr-2'>Actions</div>
                            </div>
                            {
                                recentCampaigns && (
                                    recentCampaigns.map((data, index) => (
                                        <div key={index} className="w-full grid grid-cols-3 sm:grid-cols-4 fira-code text-[var(--slate)]">
                                            <div className='pt-4 pb-4 pl-3 pr-2'>
                                                <Link href={`/campaign/${encodeURIComponent(data.URL)}`} className='link'>
                                                    {data.Name}
                                                </Link>
                                                <div className="mt-1">{data.URL}</div>
                                            </div>
                                            <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>{data.Tstamp.toLocaleDateString()}</div>
                                            <div className='pt-4 pb-4 pl-2 pr-2'><span onClick={() => changeStatus(data.isActive, data.URL)}><Toggle isEnabled={data.isActive} /></span></div>
                                            <div className='pt-4 pb-4 pl-2 pr-2'>
                                                Checking..
                                            </div>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </>
                )
            }
            <div className='flex inter subTitle text-[var(--slate)] mt-10'>
                Latest Notifications
            </div>
            <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px]">
                <div className="w-full grid grid-cols-3 sm:grid-cols-5 fira-code text-[var(--light-slate)]">
                    <div className='pt-4 pb-4 pl-3 pr-2'>Name</div>
                    <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Trigger</div>
                    <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Duration</div>
                    <div className='pt-4 pb-4 pl-2 pr-2'>Status</div>
                    <div className='pt-4 pb-4 pl-2 pr-2'>Actions</div>
                </div>
                <div className="w-full grid grid-cols-3 sm:grid-cols-5 fira-code text-[var(--slate)]">

                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    const recentDocs: ICampaigns[] = [];

    if (!session) {
        return {
            redirects: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            session,
            recentDocs,
        }
    }
}

export default LatestCampaigns