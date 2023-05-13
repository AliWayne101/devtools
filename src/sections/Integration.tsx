import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const Integration = () => {
    const images = [
        { src: "/assets/shopify_logo.svg", alt: "shopify" },
        { src: "/assets/wordpress_logo.svg", alt: "wordpress" },
        { src: "/assets/zapier_logo.svg", alt: "zapier" },
        { src: "/assets/weebly_logo.svg", alt: "weebly" },
    ];

    return (
        <div className="flex w-full bg-secondary mt-20 integration">
            <main className='w-full'>
                <div className="flex pt-5 pb-5 w-full justify-center fira-code">
                    Easy setup & integration with&nbsp; <span className="text-[var(--theme-color)]">any website</span>
                </div>
                <div className="w-full justify-center integration-imgcont items-center mt-10" >
                    {
                        images.map((data, index) => (
                            <motion.span
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                    delay: 1.2 + (index * 0.2)
                                }}
                            >
                                <Image src={data.src} alt={data.alt} className='integration-image' height={800} width={800} key={index} />
                            </motion.span>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}

export default Integration