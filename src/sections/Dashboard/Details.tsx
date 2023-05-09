import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { RiDashboardFill } from 'react-icons/ri'
import { FaBell, FaEye } from 'react-icons/fa';
import { Tier, iTier } from '@/Details';

const Details = ({ camps, notifs, imps, userDetails }: {
    camps: number, notifs: number, imps: number, 
    userDetails: {
        _sysID: string,
        Membership: string,
    },
}) => {

    const [campaigns, setCampaigns] = useState(0);
    const [notifications, setNotifications] = useState(0);
    const [impressions, setImpressions] = useState(0);
    const [memType, setMemType] = useState<iTier>();

    useEffect(() => {
        setCampaigns(camps);
        setNotifications(notifs);
        setImpressions(imps);
    }, [camps, notifs, imps])

    useEffect(() => {
        const _tier = Tier.find(({ Membership }) => Membership === userDetails.Membership);
        setMemType(_tier);
    }, [userDetails.Membership])


    return (
        <div className='flex w-full bg-secondary mt-20'>
            <main className="w-full">
                <span className="mainTitle text-[var(--light-slate)] inter">
                    Dashboard
                </span>
                <div className="flex w-full grid grid-cols-1 gap-5 mt-5 text-[var(--light-slate)] sm:grid-cols-3">
                    <div className="w-full flex bg-primary fira-code">
                        <div className="p-5">
                            <IconContext.Provider value={{ className: "icons" }}>
                                <RiDashboardFill size={24} />
                            </IconContext.Provider>
                        </div>
                        <div className="p-5">{campaigns} Campaigns</div>
                    </div>
                    <div className="w-full flex bg-primary fira-code">
                        <div className="p-5">
                            <IconContext.Provider value={{ className: "icons" }}>
                                <FaBell size={24} />
                            </IconContext.Provider>
                        </div>
                        <div className="p-5">{notifications} Notifications</div>
                    </div>
                    <div className="w-full flex bg-primary fira-code">
                        <div className="p-5">
                            <IconContext.Provider value={{ className: "icons" }}>
                                <FaEye size={24} />
                            </IconContext.Provider>
                        </div>
                        <div className="p-5">{impressions} / {
                            memType ? (
                                memType.ALLOWED_IMPS
                            ) : "0"
                        } Impressions</div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Details