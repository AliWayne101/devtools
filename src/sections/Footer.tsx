import React from 'react'

const Footer = () => {
    return (
        <div className="w-full fira-code text-[var(--slate)]">
            <div className="mt-2">Copyright © 2023 DevTools</div>
            <div className="mt-2">Created by <a href="mailto:alimalikwayne@gmail.com" className="link">Ali A. Wains</a></div>
            <div className="mt-2"><span className='mr-2'>Cookes</span> Powered by <a href="http://waynedev.vercel.app" target="_blank" className="link">Wayne Development</a></div>
        </div>
    )
}

export default Footer