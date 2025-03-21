import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { color } from 'framer-motion';

function OTPRecover() {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [typedOTP, setTypedOTP] = useState('');
    const [emailFound, setEmailFound] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email) {
            toast.error("Email is required");
            return;
        }

        try {
            const OTP = Math.floor(100000 + Math.random() * 900000).toString();
            setOtp(OTP);

            // console.log(email,OTP);
            const res = await axios.post(`https://shield-mghf.onrender.com/recover/otp`, {
                email, otp: OTP
            });

            if(res.data.success){
                setEmailFound(true);
                toast.success("Email ID found");
            }
 
        }
        catch (err) {
            toast.error("No user found");
            console.log(err.message);
        }
    }

    const verifyOTP = async () => {

        if(typedOTP !== otp){
            toast.error('OTP is invalid');
            return;
        }

        navigate('/recover/add/new-password');
    }

    return (
        <>
            <div className='w-full h-auto overflow-hidden flex flex-col justify-center items-center'>

                <div class="absolute flex justify-center flex-col gap-10 inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#1CAC78_100%)]">
                    <Toaster />
                    <Link to='/recover-password' className='text-white cursor-pointer flex justify-center items-center absolute top-10 left-5 lg:left-10'><IoIosArrowRoundBack className='text-xl lg:text-2xl' /> Go back </Link>

                    <div className='w-full text-center px-4 h-auto py-2'>
                        <p className='text-white text-2xl lg:text-5xl'>Enter your email to check</p>
                    </div>

                    <div className='w-full sm:w-[60%] lg:mt-10 lg:w-[40%] text-center flex flex-col gap-5 px-4 h-auto py-2'>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='w-full outline-none bg-white/25 text-white px-2 py-2 rounded-md' />
                        <button onClick={handleSubmit} className='w-full bg-white text-black py-2 rounded-md cursor-pointer hover:opacity-80 duration-300 ease-in-out'>Check</button>
                    </div>

                    <div className={`${emailFound ? "block" : "hidden"} w-full sm:w-[60%] lg:mt-10 lg:w-[40%] text-center flex flex-col gap-5 px-4 h-auto py-2`}>
                        <p className='text-white'>OTP sent on your email</p>
                        <input type="number" onChange={(e) => setTypedOTP(e.target.value)} placeholder='Enter OTP' className='w-full outline-none bg-white/25 text-white px-2 py-2 rounded-md' />
                        <button onClick={verifyOTP} className='w-full bg-white text-black py-2 rounded-md cursor-pointer hover:opacity-80 duration-300 ease-in-out'>Verify</button>
                    </div>



                </div>

            </div>
        </>
    )
}

export default OTPRecover
