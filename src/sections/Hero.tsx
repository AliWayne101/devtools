import React from 'react'
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="w-full grid grid-cols-2">
            <div className="pt-20">
                <div className="hero-main">
                    Rev up your <b>growth</b> <br />
                    with <b>Skyrocket Conversion</b>
                </div>
                <p className='hero-sub'>
                    Supercharge your website&apos;s growth with out attention-grabbing <b>Notification Widgets</b>
                </p>
            </div>
            <div className="flex">
                <Image src={'/rocket.png'} alt={'rocket'} width={600} height={600} />
            </div>
        </div>

    )
}

export default Hero