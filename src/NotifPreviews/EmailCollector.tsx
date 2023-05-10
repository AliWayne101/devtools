import React from 'react'

const EmailCollector = () => {
    return (
        <div className="devToolsBox">
            <div className='dt_container_head'>
                <b>Weekly newsletter</b>
                <span className='closingButton' title='Close'>X</span>
            </div>
            <div className='dt_container_body'>
                <p>We do not send out spam emails & you can unsubscribe at any point.</p>
                <div className='dt_inline_input'>
                    <input type="text" name="name" id="name" placeholder="Your name" />
                    <input type="email" name="email" id="email" placeholder="Your email" />
                </div>
                <button className='dt_button'>Sign me up</button>
                <div className='dt_copyright'>Powered by DevTools</div>
            </div>
        </div>
    )
}

export default EmailCollector