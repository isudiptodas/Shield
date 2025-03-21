import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

function AddNewPassword() {

    const navigate = useNavigate();
    const location = useLocation();
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');

    const { email } = location.state || {};

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        // console.log(email, password);

        try {

            const res = await axios.put(`https://shield-mghf.onrender.com/update-password`, {
                password, email
            });

            if (res.data.success) {
                navigate('/auth/login');
            }

        }
        catch (err) {
            console.log(err.message);
        }
    }



    return (
        <>
            <div className='w-full h-auto overflow-hidden flex flex-col justify-center items-center'>

                <div class="absolute flex justify-center flex-col gap-10 inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#1CAC78_100%)]">
                    <Toaster />
                    <Link to='/recover-password' className='text-white cursor-pointer flex justify-center items-center absolute top-10 left-5 lg:left-10'><IoIosArrowRoundBack className='text-xl lg:text-2xl' /> Go back </Link>

                    <div className='w-full text-center px-4 h-auto py-2'>
                        <p className='text-white text-2xl lg:text-5xl'>Create a new password for your account</p>
                    </div>

                    <div className='w-full sm:w-[60%] lg:mt-10 lg:w-[40%] text-center flex flex-col gap-5 px-4 h-auto py-2'>
                        <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Enter your new password' className='w-full outline-none bg-white/25 text-white px-2 py-2 rounded-md' />
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type="text" placeholder='Confirm your new password' className='w-full outline-none bg-white/25 text-white px-2 py-2 rounded-md' />
                        <button className='w-full bg-white text-black py-2 rounded-md cursor-pointer hover:opacity-80 duration-300 ease-in-out' onClick={handleSubmit}>Change password</button>
                    </div>


                </div>

            </div>
        </>
    )
}

export default AddNewPassword
