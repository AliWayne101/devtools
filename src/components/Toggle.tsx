import { Switch } from '@headlessui/react'
import React, { useState } from 'react'

const Toggle = ({ isEnabled }: { isEnabled: boolean }) => {
    const [enabled, setEnabled] = useState(isEnabled);
    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-theme' : 'transparent'}
            relative inline-flex h-[18px] w-[47px] shrink-0 cursor-pointer rounded-full border-2 border-white transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-7' : 'translate-x-0'}
                    pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white show-lg ring-0 transition duration-200 ease-in-out
                `}
            />
        </Switch>
    )
}

export default Toggle