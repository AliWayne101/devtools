import Button from '@/components/Button'
import Hero from '@/sections/Hero'
import Navbar from '@/sections/Navbar'
import axios from 'axios'
import React, { useState } from 'react'

const Signup = () => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        repassword: ""
    });

    const updateInputs = (event: HTMLInputElement) => {
        setSignupData({
            ...signupData, [event.name]: event.value
        });
        console.log(signupData);
    }

    const RegisterUser = () => {
        if (signupData.password.length > 8) {
            if (signupData.password === signupData.repassword) {
                axios.post('/api/register', signupData).then((response) => {
                    console.log(response);
                }).catch(err => console.log);
            } else {
                console.log('invalid password');
                console.log(signupData.password);
                console.log(signupData.repassword);
            }
        } else {
            console.log('Invalid password length');
        }
    }

    return (
        <>
            <Navbar />
            <Hero />
            <main>
                <div className="w-full justify-center items-center forms ml-200">
                    <input type="text" name="name" id="name" onChange={(e) => updateInputs(e.target)} placeholder='Name' /> <br />
                    <input type="email" name="email" id="email" onChange={(e) => updateInputs(e.target)} /> <br />
                    <input type="password" name="password" id="passowrd" onChange={(e) => updateInputs(e.target)} /> <br />
                    <input type="password" name="repassword" id="repassword" onChange={(e) => updateInputs(e.target)} /> <br />
                    
                    <span onClick={RegisterUser}>
                        <Button name={'Sign up'} href={'null'} />
                    </span>
                </div>
            </main>
        </>
    )
}

export default Signup