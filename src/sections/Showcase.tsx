import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Showcase = () => {

    const [totalImps, setTotalImps] = useState(0);

    useEffect(() => {
        axios.get('/api/notifications?action=allnotifimps&target=0')
        .then((response) => {
            setTotalImps(response.data.totalImps);
        })
        .catch(console.log);
    }, [])

    return (
        <div className="flex w-full bg-secondary mt-20">
            <main className='w-full'>
                <div className="block pt-5 pb-5 text-[var(--slate)] fira-code overflow-hidden">
                    <motion.div
                        className='flex w-full justify-center text-[22px]'
                        whileInView="visible"
                        initial="hidden"
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut"
                        }}
                        variants={{
                            visible: { opacity: 1, x: 0},
                            hidden: { opacity: 0, x: -50 }
                        }}
                    >
                        <span className="text-[var(--theme-color)]">{totalImps}</span> &nbsp;notifications displayed
                    </motion.div>
                    <motion.div
                        className="flex w-full justify-center text-center mt-3"
                        whileInView="visible"
                        initial="hidden"
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut"
                        }}
                        variants={{
                            visible: { opacity: 1, x: 0},
                            hidden: { opacity: 0, x: 50 }
                        }}
                    >
                        Instantly boost your website&apos;s credibility with our top-rated notification widgets
                    </motion.div>
                </div>
            </main>
        </div>
    )
}

export default Showcase