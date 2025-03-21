import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast, Toaster } from 'react-hot-toast';

function ForgotPassword() {

    const[selectedChoice, setSelectedChoice] = useState('');
    const navigate = useNavigate();

    const handleRedirect = () => {
        if(selectedChoice === 'otp'){
            navigate('/recover/otp');
        }
        else{
            navigate('/recover/question');
        }
    }

    return (
        <>
            <div className='w-full h-auto overflow-hidden flex flex-col justify-center items-center'>
                
                <div class="absolute flex justify-center flex-col gap-10 inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#1CAC78_100%)]">
                    <Toaster />
                    <Link to='/' className='text-white cursor-pointer flex justify-center items-center absolute top-10 left-5 lg:left-10'><IoIosArrowRoundBack className='text-xl lg:text-2xl' /> Go back </Link>

                    <div className='w-full text-center px-4 h-auto py-2'>
                        <p className='text-white text-2xl lg:text-5xl'>Don't Worry !</p>
                        <p className='text-white text-2xl lg:text-5xl'>We will help you recover your password</p>
                    </div>

                    <div className='w-full sm:w-[60%] lg:mt-10 lg:w-[40%] flex justify-evenly gap-5 px-4 h-auto py-2'>
                        <div className={`w-40 h-40 cursor-pointer hover:-translate-y-2 duration-300 ease-in-out transition-transform bg-white/25 rounded-md flex justify-center items-center ${selectedChoice === 'question' ? "border-4 border-emerald-600" : "border-0"}`} onClick={() => setSelectedChoice('question')}>
                            <p className={`text-white text-center text-[12px] md:text-sm`}>Recover with security question</p>
                        </div>
                        <div className={`w-40 h-40 cursor-pointer hover:-translate-y-2 duration-300 ease-in-out transition-transform bg-white/25 rounded-md flex justify-center items-center ${selectedChoice === 'otp' ? "border-4 border-emerald-600" : "border-0"}`} onClick={() => setSelectedChoice('otp')}>
                            <p className={`text-white text-center text-[12px] md:text-sm`}>Recover with OTP</p>
                        </div>
                    </div>

                    <div className={`w-full sm:w-[60%] lg:w-[40%] text-center px-10 h-auto py-2 ${selectedChoice === '' ? "hidden" : "block"}`}>
                       <button className='w-full bg-white py-2 rounded-lg' onClick={handleRedirect}>Continue</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ForgotPassword
