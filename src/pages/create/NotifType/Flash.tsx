import { CompProps } from '@/Details'
import React from 'react'
import Image from 'next/image'

const Flash = ({ MountedData, ClosingButton }: CompProps) => {
    return (
        MountedData && (
            <div className="devToolsBox">
                <div className="dt_grid_30">
                    <div className="dt_Image_box">
                        <Image src={MountedData.notifImg1} alt={MountedData.notifNPlaceholder} width={100} height={100} objectFit='true' />
                    </div>
                    <div className="dt_info_box">
                        <div className="dt_container_head">
                            <b>{MountedData.notifTitle}</b>
                            {ClosingButton && (
                                <span className='closingButton' title='Close'>x</span>
                            )}
                        </div>
                        <div className="dt_container_body">
                            {MountedData.notifDesc}
                        </div>
                        <div className='dt_copyright'>Powered by <span className="link cursor-pointer">DevTools</span></div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Flash