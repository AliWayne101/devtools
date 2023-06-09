import React from 'react'
import { IconContext } from 'react-icons';
import { FaPaintBrush, FaMoneyBillAlt } from 'react-icons/fa';
import { TbPlugConnected } from 'react-icons/tb';
import { motion } from 'framer-motion';

const Setup = () => {
    const iconDetails = [
        { icon: <FaPaintBrush size={30} />, title: "Create Notification", desc: "Setup & Customize your notification" },
        { icon: <TbPlugConnected size={30} />, title: "Connect", desc: "Install our Plug-in directly into your code" },
        { icon: <FaMoneyBillAlt size={30} />, title: "Growth & Profit", desc: "Generate conversion & Growth" },
    ];

    return (
        <div className="w-full grid grid-cols-3 gap-2 mt-20 setup">
            {
                iconDetails.map((data, index) => (
                    <motion.div 
                        className="flex setup-entries mt-3"
                        key={index}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                            delay: 0.8 + (index * 0.2)
                        }}
                    >
                        <div className="flex setup-entries-icon">
                            <IconContext.Provider value={{ className: "icons" }}>
                                {data.icon}
                            </IconContext.Provider>
                        </div>
                        <div className="w-[70%] ml-3">
                            <span className='text-[var(--light-slate)] text-base font-inter'>{data.title}</span><br />
                            <span className='text-[var(--slate)] text-sm font-fira'>{data.desc}</span>
                        </div>
                    </motion.div>
                ))
            }
        </div>
    )
}

export default Setup