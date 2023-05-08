import Button from '@/components/Button'
import Toggle from '@/components/Toggle'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

const LatestCampaigns = () => {
    return (
        <div className="w-full mb-20">
            <div className='flex justify-between'>
                <div className="inter subTitle text-[var(--slate)]">
                    Latest Campaigns
                </div>
                <span><Button name={'Add Campaigns'} href={'null'} /></span>
            </div>
            <div className="w-full mt-5 bg-secondary2 rounded rounded-[10px]">
                <div className="w-full grid grid-cols-3 sm:grid-cols-4 fira-code text-[var(--light-slate)]">
                    <div className='pt-4 pb-4 pl-3 pr-2'>Name</div>
                    <div className='pt-4 pb-4 pl-2 pr-2 hidden sm:flex'>Created on</div>
                    <div className='pt-4 pb-4 pl-2 pr-2'>Status</div>
                    <div className='pt-4 pb-4 pl-2 pr-2'>Actions</div>
                </div>
                <div className="w-full grid grid-cols-3 sm:grid-cols-4 fira-code text-[var(--slate)]">

                </div>
            </div>
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

export default LatestCampaigns