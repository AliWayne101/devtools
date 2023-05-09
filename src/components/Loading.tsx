import React from 'react'
import { BarLoader } from 'react-spinners'

const Loading = () => {
    return (
        <>
            <div className='block text-center mb-2 fira-code text-[var(--slate)]'>
                Please wait while your request is being processed
            </div>
            <div className="flex items-center justify-center">
                <BarLoader
                    color='var(--theme-color)'
                    height={7}
                    width={300}
                />
            </div>
        </>
    )
}

export default Loading