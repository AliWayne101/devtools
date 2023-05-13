import { ICreatorData } from '@/Details'
import React, { useEffect, useState } from 'react'

const EC = ({ MountedData, ClosingButton }: { MountedData: ICreatorData, ClosingButton: boolean }) => {
  const [data, setData] = useState<ICreatorData>(MountedData);
  const [showClose, setShowClose] = useState(ClosingButton);

  useEffect(() => {
    setData(MountedData);
  }, [MountedData]);

  return (
    <div className="devToolsBox">
      <div className='dt_container_head'>
        <b>{data.notifTitle}</b>
        {showClose && (
          <span className='closingButton' title='Close'>x</span>
        )}
      </div>
      <div className='dt_container_body'>
        <p>{data.notifDesc}</p>
        <div className='dt_inline_input'>
          <input type="text" name="name" id="name" placeholder={data.notifNPlaceholder} />
          <input type="email" name="email" id="email" placeholder={data.notifEPlaceholder} />
        </div>
        <button className='dt_button'>{data.notifButton}</button>
        <div className='dt_copyright'>Powered by DevTools</div>
      </div>
    </div>
  )
}

export default EC