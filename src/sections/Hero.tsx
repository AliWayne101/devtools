import React from 'react'
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="w-full hero-sect">
            <div className="w-full mt-20">
                <span className="hero-main">
                    Rev up your <b>growth</b> <br />
                    with <b>Skyrocket Conversion</b>
                </span>
                <p className='hero-sub pt-4'>
                    Supercharge your website&apos;s growth with out attention-grabbing <b>Notification Widgets</b>
                </p>
            </div>
            <div className="hero-image">
                <Image src={'/rocket.png'} alt={'rocket'} width={600} height={600} />
            </div>
        </div>

    )
}

export default Hero