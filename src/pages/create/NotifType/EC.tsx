import { ICreatorData } from '@/Details'
import React from 'react'

const EC = ({ MountedData, ClosingButton }: { MountedData: ICreatorData, ClosingButton: boolean }) => {
  return (
    <div className="devToolsBox">
      <div className='dt_container_head'>
        <b>{MountedData.notifTitle}</b>
        {ClosingButton && (
          <span className='closingButton' title='Close'>x</span>
        )}
      </div>
      <div className='dt_container_body'>
        <p>{MountedData.notifDesc}</p>
        <div className='dt_inline_input'>
          <input type="text" name="name" id="name" placeholder={MountedData.notifNPlaceholder} />
          <input type="email" name="email" id="email" placeholder={MountedData.notifEPlaceholder} />
        </div>
        <button className='dt_button'>{MountedData.notifButton}</button>
        <div className='dt_copyright'>Powered by <span className="link cursor-pointer">DevTools</span></div>
      </div>
    </div>
  )
}

export default EC