import React, { useState } from 'react'
import { FaCog, FaMobile, FaPaintBrush } from 'react-icons/fa';
import { MdMonitor } from 'react-icons/md';
import { TbActivity } from 'react-icons/tb';
import { BsDatabase } from 'react-icons/bs';
import Button from '@/components/Button';
import Toggle from '@/components/Toggle';

const EmailCollector = () => {

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

    const [triggersData, setTriggersData] = useState({
        triggerType: "Delay",
        triggerValue: "2",
        triggerDisplaySmall: true,
        triggerDisplayLarge: true
    });


    const updateBasic = (e: HTMLInputElement) => {
        setBasicData({
            ...basicData, [e.name]: e.value
        });
    }

    const updateTrigger = (e: HTMLInputElement) => {
        setTriggersData({
            ...triggersData, [e.name]: e.value
        });
    }

    const triggerPlaceholder = (trigger: string) => {
        if (trigger === "Delay") {
            return "Number of seconds to wait until notification shows up";
        } else if (trigger === "Scroll Percentage") {
            return "Percent of scrolling from top to bottom";
        } else if (trigger === "Mouse Click" || trigger === "Mouse Hover") {
            return "CSS Selector: #id or .class of the element";
        }
    }

    return (
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
                        <BsDatabase size={20} className='mr-4 mt-1' /> Data
                    </div>
                </div>
                <div className="col-span-3 mt-5 size-body">
                    {activeIndex === 0 ? (
                        <>
                            <div className="text-[var(--slate)] font-inter mt-1">
                                <div>Notification Name</div>
                                <input type="text" name="notifName" value={basicData.notifName} className="font-small p-2 fira-code w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                            </div>

                            <div className="text-[var(--slate)] font-inter mt-3">
                                <div>Title Message</div>
                                <input type="text" name="notifTitle" value={basicData.notifTitle} className="font-small p-2 fira-code w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                            </div>

                            <div className="text-[var(--slate)] font-inter mt-3">
                                <div>Description Message</div>
                                <input type="text" name="notifDesc" value={basicData.notifDesc} className="font-small p-2 fira-code w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                            </div>

                            <div className="text-[var(--slate)] font-inter mt-3">
                                <div>Name Placeholder</div>
                                <input type="text" name="notifNPlaceholder" value={basicData.notifNPlaceholder} className="font-small p-2 fira-code w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                            </div>

                            <div className="text-[var(--slate)] font-inter mt-3">
                                <div>Email Placeholder</div>
                                <input type="text" name="notifEPlaceholder" value={basicData.notifEPlaceholder} className="font-small p-2 fira-code w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                            </div>

                            <div className="text-[var(--slate)] font-inter mt-3">
                                <div>Button Text</div>
                                <input type="text" name="notifButton" value={basicData.notifButton} className="font-small p-2 fira-code w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                            </div>

                            <div className="text-[var(--slate)] font-inter mt-3">
                                <div>Success Redirect (URL)</div>
                                <input type="text" name="notifButton" value={basicData.notifButton} className="font-small p-2 fira-code w-full bg-transparent border border-1 rounded rounded-[10px] mt-1" onChange={(e) => updateBasic(e.target)} />
                                <p className="font-small">the user will be redirected to after submitting the form. Leave empty to disable the function.</p>
                            </div>

                            <div className="mt-4">
                                <span><Button name="Create" href="null" /></span>
                            </div>
                        </>
                    ) : activeIndex === 1 ? (

                        <div className="text-[var(--slate)] font-inter mt-3">
                            <div className='mb-5'>Display Trigger</div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 mb-5">
                                <div className="col-span-1">
                                    <select name="triggerType" id="displayTrigger" className='w-full bg-transparent p-2 border border-1 font-small fira-code' onChange={(e) => {
                                        setTriggersData({
                                            ...triggersData, [e.target.name]: e.target.value
                                        });
                                    }}>
                                        <option value="Delay" className='bg-secondary'>Delay</option>
                                        <option value="Exit Intent" className='bg-secondary'>Exit Intent</option>
                                        <option value="Scroll Percentage" className='bg-secondary'>Scroll Percentage</option>
                                        <option value="Mouse Click" className='bg-secondary'>Mouse Click</option>
                                        <option value="Mouse Hover" className='bg-secondary'>Mouse Hover</option>
                                    </select>

                                </div>
                                <div className="col-span-3">
                                    {triggersData.triggerType !== "Exit Intent" && (
                                        <input type="text" name="triggerValue" value={triggersData.triggerType === "Delay" ? triggersData.triggerValue : ""} placeholder={triggerPlaceholder(triggersData.triggerType)} className="w-full font-small p-2 fira-code bg-transparent border border-1" onChange={(e) => updateTrigger(e.target)} />
                                    )}
                                </div>
                            </div>
                            <div className="mb-5 text-[var(--slate)] flex">
                                <div className='flex'>
                                    <span className="mr-3" onClick={() => {
                                        setTriggersData({
                                            ...triggersData, triggerDisplaySmall: !triggersData.triggerDisplaySmall
                                        });
                                    }}><Toggle isEnabled={triggersData.triggerDisplaySmall} /></span>
                                </div>
                                <div className="pl-4">
                                    <div className="flex">
                                    <FaMobile size={18} className='mr-2' /> Display on small devices
                                    </div>
                                    <p className='font-small'>
                                    Whether or not to display the notification on when pixels available are smaller than 768px.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-5 text-[var(--slate)] flex">
                                <div className='flex'>
                                    <span className="mr-3" onClick={() => {
                                        setTriggersData({
                                            ...triggersData, triggerDisplayLarge: !triggersData.triggerDisplayLarge
                                        });
                                    }}><Toggle isEnabled={triggersData.triggerDisplayLarge} /></span>
                                </div>
                                <div className="pl-4">
                                    <div className="flex">
                                    <FaMobile size={18} className='mr-2' /> Display on large devices
                                    </div>
                                    <p className='font-small'>
                                    Whether or not to display the notification on when pixels available are bigger than 768px.
                                    </p>
                                </div>
                            </div>
                        </div>

                    ) : activeIndex === 2 ? (
                        <p>Or is it?.</p>
                    ) : (
                        <div>This</div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default EmailCollector