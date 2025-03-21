import React, { useEffect, useState } from 'react'
import { CiCloudMoon } from "react-icons/ci";
import { IoIosSunny } from "react-icons/io";
import stars from '../assets/stars.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { HiSparkles } from "react-icons/hi2";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';
import PasswordBox from '../components/PasswordBox';

function Dashboard() {

    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'true';
    });

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState([]);
    const [user, setUser] = useState([]);

    const fetchCredentials = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(`https://shield-mghf.onrender.com/get/passwords`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(res.data.success){
                // console.log(res.data.found);
                setCredentials(res.data.found);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const userData = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(`https://shield-mghf.onrender.com/get/data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(res.data.success){
                // console.log(res.data.found);
                setUser(res.data.found);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', isDark);
        fetchCredentials();
        userData();
    }, [isDark]);

    const handleTheme = () => {
        setIsDark(!isDark);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <div className={`w-full h-auto ${isDark ? "bg-black" : "bg-white"} duration-300 ease-in-out flex flex-col justify-center overflow-hidden items-center`}>

                <div className={`w-full z-50 border-b-2 border-emerald-600 fixed top-0 h-20 lg:h-28 ${isDark ? "bg-black" : "bg-white"} duration-300 ease-in-out flex justify-between px-5 sm:px-10 lg:px-20 items-center`}>
                    <p className='text-xl lg:text-2xl bg-gradient-to-br from-emerald-400 via-green-700 to-emerald-400 bg-clip-text text-transparent font-semibold tracking-widest cursor-pointer'>SHIELD</p>
                    <span onClick={handleTheme}>{isDark ? (<IoIosSunny className='text-yellow-400 text-2xl lg:text-4xl cursor-pointer transition-all rotate-0 transform duration-300 ease-in-out' />) : (<CiCloudMoon className='text-black text-2xl lg:text-4xl cursor-pointer rotate-0 transition-all transform duration-300 ease-in-out' />)}</span>
                </div>

                <div className={`w-full fixed z-20 top-0 h-52 sm:h-60 lg:h-80 overflow-hidden mt-20 ${isDark ? "bg-black" : "bg-white"} duration-300 ease-in-out flex flex-col justify-center items-center`}>
                    <p className={`z-20 text-xl ${isDark ? "text-white" : "text-black"} motion-preset-focus motion-duration-1000`}>Welcome</p>
                    <p className={`z-20 text-6xl sm:text-8xl font-bold bg-gradient-to-br from-emerald-400 via-green-700 to-emerald-400 bg-clip-text text-transparent motion-preset-shrink motion-duration-1000`}>{user.name}</p>
                    <Link to='/' className='text-white bg-red-500 text-[10px] z-20 mt-3 px-5 py-1 hover:bg-red-600 duration-300 ease-in-out cursor-pointer' onClick={handleLogout}>Logout</Link>
                    <img src={stars} className={` ${isDark ? "block" : "hidden"} duration-300 ease-in-out absolute z-10`} />
                </div>

                <div className={`w-full px-10 py-5 lg:py-10 shadow-2xl z-40 min-h-screen mt-72 sm:mt-80 lg:mt-[380px] rounded-t-3xl relative border-t-2 ${isDark ? "bg-black" : "bg-white"} duration-300 ease-in-out border-emerald-500 flex flex-col justify-start items-center gap-5`}>

                    <Link to='/generate-password' className={` bg-transparent border-2 border-emerald-600 px-4 py-2 rounded-lg w-full sm:w-[60%] md:w-[50%] lg:w-[40%] flex justify-center items-center motion-preset-shrink motion-duration-1500 gap-2 ${isDark ? "text-white" : "text-"} duration-300 ease-in-out`}>Generate Password <HiSparkles /></Link>
                    <Link to='/add-password' className={` bg-gradient-to-br from-emerald-400 via-green-700 to-emerald-300 px-4 py-2 rounded-lg w-full sm:w-[60%] md:w-[50%] lg:w-[40%] flex justify-center items-center motion-preset-shrink motion-duration-1500 gap-2 ${isDark ? "text-white" : "text-white"} duration-300 ease-in-out`}>Store new password <RiLockPasswordFill /></Link>

                    <div className={`w-full sm:w-[60%] md:w-[50%] mt-5 lg:w-[40%] h-[1px] ${isDark ? "bg-white" : "bg-black"}`}></div>

                    <div className={` w-full h-auto py-10 flex flex-col justify-start items-center gap-4`}>
                       {credentials.length > 0 && <div className='w-full h-auto'>
                        {credentials.map((password) => {
                            return <PasswordBox key={password._id} name={password.websiteName} url={password.websiteURL} username={password.websiteUsername} password={password.password} id={password._id}/>
                        })}
                        </div>}
                    </div>

                </div>


            </div>
        </>
    )
}

export default Dashboard
