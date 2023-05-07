import React from 'react'
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="w-full grid grid-cols-2">
            <div className="flex pt-20">
                <div className="hero-main">
                    Rev up your growth <br />
                    with Skyrocket Conversion
                </div>
            </div>
            <div className="flex">
                <Image src={'/rocket.png'} alt={'rocket'} width={600} height={600}/>
            </div>
        </div>

    )
}

export default Hero