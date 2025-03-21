import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CiCloudMoon } from "react-icons/ci";
import { IoIosSunny } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

function NewPassword() {

    const[isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'true';
    });

    const[websiteURL, setWebsiteURL] = useState('');
    const[websiteName, setWebsiteName] = useState('');
    const[websiteUsername, setWebsiteUsername] = useState('');
    const[password, setPassword] = useState('');

    const addPassword = async (e) => {

        e.preventDefault();

        if(!websiteName || !websiteURL || !password){
            toast.error("Required fields cannot be empty");
            return;
        }

        const token = localStorage.getItem('token');

        // console.log(websiteName, websiteURL, password, websiteUsername);

        try{
            const res = await axios.post('https://shield-mghf.onrender.com/add-password', {
                websiteName, websiteURL, password, websiteUsername
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if(res.data.success){
                toast.success("Password Added");
                setTimeout(() => {
                    navigate('/dashboard');
                },3000);
            }
        }
        catch(err){
            console.log(err.message);
        }
       
    }

    useEffect(() => {
        localStorage.setItem('theme', isDark);
    }, [isDark]);

    const handleTheme = () => {
        setIsDark(!isDark);
    }

    return (
        <>
            <div className={`h-auto ${isDark ? "bg-black" : "bg-white"} w-full flex flex-col justify-center items-center`}>
                <div className={`w-full z-50 border-b-2 border-emerald-600 h-20 lg:h-28 ${isDark ? "bg-black" : "bg-white"} duration-300 ease-in-out flex justify-between px-5 sm:px-10 lg:px-20 items-center`}>
                    <p className='text-xl lg:text-2xl bg-gradient-to-br from-emerald-400 via-green-700 to-emerald-400 bg-clip-text text-transparent font-semibold tracking-widest cursor-pointer'>SHIELD</p>
                    <span onClick={handleTheme}>{isDark ? (<IoIosSunny className='text-yellow-400 text-2xl lg:text-4xl cursor-pointer transition-all rotate-0 transform duration-300 ease-in-out' />) : (<CiCloudMoon className='text-black text-2xl lg:text-4xl cursor-pointer rotate-0 transition-all transform duration-300 ease-in-out' />)}</span>
                </div>
                <Toaster/>

                <div className={`w-full min-h-screen ${isDark ? "bg-black" : "bg-white"} duration-300 ease-in-out flex flex-col justify-start items-center py-10 px-10`}>

                    <div className='w-full bg-transparent text-start'>
                        <Link to='/dashboard' className={`${isDark ? "text-white" : "text-black"} text-start h-16 flex justify-center gap-2 items-center`}><IoIosArrowRoundBack className='text-2xl' /> Go Back</Link>
                    </div>

                    <p className={`text-3xl ${isDark ? "text-white" : "text-black"}`}>Store a new password</p>

                    <div className={`w-full lg:w-[60%] h-auto grid justify-items-center gap-5 lg:grid-cols-2 py-5 lg:py-10 relative`}>
                        <div className={`w-full rounded-lg flex flex-col ${isDark ? "bg-zinc-800 text-white" : "bg-gray-200 text-black"} duration-300 ease-in-out mt-10 justify-center items-start gap-2 px-4 py-4`}>
                            <label>Website URl*</label>
                            <input type="text" onChange={(e) => setWebsiteURL(e.target.value)} placeholder='www.google.com' className={`w-full rounded-md outline-none px-4 py-2 ${isDark ? "bg-black text-white placeholder-gray-300" : "bg-white text-black placeholder-zinc-700 rounded-md"} duration-300 ease-in-out`} />
                        </div>

                        <div className={`w-full rounded-lg flex flex-col ${isDark ? "bg-zinc-800 text-white" : "bg-gray-200 text-black"} duration-300 ease-in-out mt-10 justify-center items-start gap-2 px-4 py-4`}>
                            <label>Website name*</label>
                            <input type="text" onChange={(e) => setWebsiteName(e.target.value)} placeholder='Notion' className={`w-full rounded-md outline-none px-4 py-2 ${isDark ? "bg-black text-white placeholder-gray-300" : "bg-white text-black placeholder-zinc-700 rounded-md"} duration-300 ease-in-out`} />
                        </div>

                        <div className={`w-full rounded-lg flex flex-col ${isDark ? "bg-zinc-800 text-white" : "bg-gray-200 text-black"} duration-300 ease-in-out mt-10 justify-center items-start gap-2 px-4 py-4`}>
                            <label>Username</label>
                            <input type="text" onChange={(e) => setWebsiteUsername(e.target.value)} placeholder='@your_username' className={`w-full rounded-md outline-none px-4 py-2 ${isDark ? "bg-black text-white placeholder-gray-300" : "bg-white text-black placeholder-zinc-700 rounded-md"} duration-300 ease-in-out`} />
                        </div>

                        <div className={`w-full rounded-lg flex relative flex-col ${isDark ? "bg-zinc-800 text-white" : "bg-gray-200 text-black"} duration-300 ease-in-out mt-10 justify-center items-start gap-2 px-4 py-4`}>
                            <label>Password*</label>
                            <span className={`absolute bottom-7 cursor-pointer right-8`} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <FaEyeSlash/> : <FaEye/>}</span>
                            <input onChange={(e) => setPassword(e.target.value)} type={isPasswordVisible ? "text" : "password"} placeholder='Website password' className={`w-full pr-10 rounded-md outline-none px-4 py-2 ${isDark ? "bg-black text-white placeholder-gray-300" : "bg-white text-black placeholder-zinc-700 rounded-md"} duration-300 ease-in-out`} />
                        </div>
                    </div>

                    <button className={`py-2 rounded-md cursor-pointer bg-gradient-to-br from-emerald-400 via-green-600 to-emerald-400 w-full lg:w-[60%] ${isDark ? "text-white" : "text-white"} duration-300 ease-in-out`} onClick={addPassword}>Add Credentials</button>
                </div>


            </div>
        </>
    )
}

export default NewPassword
