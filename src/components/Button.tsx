import Link from 'next/link'
import React from 'react'

//element:DATATYPE
//{element}:{element:DATATYPE}

const Button = ({ name, href }: { name: string, href: string }) => {
    return (
        <>
            {href === "null" ? (
                <button className='btn'>{name}</button>
            ) : (
                <Link href={href}>
                    <button className='btn'>{name}</button>
                </Link >
            )}
        </>

    )
}

export default Button