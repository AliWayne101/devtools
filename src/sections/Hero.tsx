import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="w-full hero-sect">
            <div className="w-full mt-20">
                <motion.span 
                    className="hero-main"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: 0.6
                    }}
                >
                    Rev up your <b>growth</b> <br />
                    with <b>Skyrocket Conversion</b>
                </motion.span>
                <motion.p 
                    className='hero-sub pt-4'
                    initial= {{ opacity: 0, x: 5 }}
                    animate= {{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: 0.8
                    }}
                >
                    Supercharge your website&apos;s growth with our attention-grabbing <b>Notification Widgets</b>
                </motion.p>
            </div>
            <div className="hero-image">
                <Image src={'/rocket.png'} alt={'rocket'} width={600} height={600} />
            </div>
        </div>

    )
}

export default Hero