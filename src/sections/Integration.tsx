import Image from 'next/image'
import React from 'react'

const Integration = () => {
    return (
        <div className="flex w-full bg-secondary mt-20 integration">
            <main className='w-full'>
                <div className="flex pt-5 pb-5 w-full justify-center fira-code">
                    Easy setup & integration with&nbsp; <span className="text-[var(--theme-color)]">any website</span>
                </div>
                <div className="w-full justify-center integration-imgcont items-center mt-10">
                    <Image src={'/assets/shopify_logo.svg'} alt={'shopify'} className='integration-image' height={800} width={800} />
                    <Image src={'/assets/wordpress_logo.svg'} alt={'wordpress'} className='integration-image' height={800} width={800} />
                    <Image src={'/assets/zapier_logo.svg'} alt={'zapier'} className='integration-image' height={800} width={800} />
                    <Image src={'/assets/weebly_logo.svg'} alt={'weebly'} className='integration-image' height={800} width={800} />
                </div>
            </main>
        </div>
    )
}

export default Integration