import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { FaExternalLinkAlt } from "react-icons/fa";
import { toast } from 'react-hot-toast';

function PasswordBox({ name, url, password, username, id }) {

    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'true';
    });
    
    const[newName, setNewName] = useState('');
    const[newUrl, setNewUrl] = useState('');
    const[newUsername, setNewUsername] = useState('');
    const[newPassword, setnewPassword] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [decodedPassword, setDecodedPassword] = useState('');
    const [isEditing, setIsEditing] = useState('');

    const fetchDecoded = async () => {
        try {
            const res = await axios.get(`https://shield-mghf.onrender.com/password/${id}`);

            if (res.data.success) {
                // console.log(res.data.decrypt);
                setDecodedPassword(res.data.decrypt);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const deleteCredential = async () => {
        try{
            const res = await axios.delete(`https://shield-mghf.onrender.com/delete/${id}`);
            
            if(res.data.success){
                setMenuVisible(!menuVisible);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    const updateCredential = async (e) => {
        e.preventDefault();

        if(newName === '' && newPassword === '' && newUsername === '' && newUrl === ''){
            toast.error("All fields are empty");
            return;
        }

        try{
            const res = await axios.put(`https://shield-mghf.onrender.com/update/${id}`, {
                newName, newUrl, newPassword, newUsername
            });

            if(res.data.success){
                setIsEditing(!isEditing);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', isDark);
        fetchDecoded();
    }, [isDark]);

    const openLink = () => {
        window.open(url, '_blank');
    }

    return (
        <>
            <div className={`mb-5 px-5 bg-gradient-to-br from-emerald-300 to-emerald-700 flex flex-col justify-evenly items-center sm:grid sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-3 h-auto py-5 w-full relative rounded-lg`}>
                <span className='sm:absolute top-3 right-5 lg:w-fit text-white cursor-pointer w-full flex justify-end items-end' onClick={() => setMenuVisible(!menuVisible)}><HiDotsVertical /></span>

                <div className={`${menuVisible ? "block" : "hidden"} absolute z-30 h-auto w-32 lg:w-48 flex flex-col justify-start items-start gap-2 px-1 py-2 bg-white shadow-xl top-10 right-6`}>
                    <p onClick={() => setIsEditing(!isEditing)} className='text-[10px] hover:bg-gray-300 duration-200 ease-in-out cursor-pointer w-full px-2 py-1 lg:py-2 rounded-md'>Edit</p>
                    <p className='text-[10px] hover:bg-gray-300 duration-200 ease-in-out cursor-pointer w-full px-2 py-1 lg:py-2 rounded-md' onClick={deleteCredential}>Delete</p>
                </div>

                <div className={`${isEditing === true ? "hidden" : "block"} h-auto w-full flex flex-col gap-2 justify-center items-start relative`}>
                    {/* <span className='absolute text-white bottom-2 cursor-pointer right-3'><HiDotsVertical /></span> */}
                    <label className='text-[10px] lg:text-sm text-black'>Website name</label>
                    <p className='py-2 lg:text-[13px] lg:border-2 border-white px-2 bg-emerald-700 w-full rounded-lg pr-10 text-white text-[10px]'>{name}</p>
                </div>

                <div className={`${isEditing === true ? "hidden" : "block"} h-auto w-full flex flex-col gap-2 justify-center items-start relative`}>
                    <span onClick={openLink} className='absolute text-white bottom-2 text-sm cursor-pointer right-3'><FaExternalLinkAlt /></span>
                    <label className='text-[10px] lg:text-sm text-black'>Website URL</label>
                    <p className='py-2 lg:text-[13px] lg:border-2 border-white px-2 bg-emerald-700 w-full rounded-lg pr-10 text-white text-[10px]'>{url}</p>
                </div>

                <div className={` ${isEditing === true ? "hidden" : "block"} h-auto w-full flex flex-col gap-2 justify-center items-start relative`}>
                    {/* <span className={`absolute text-white bottom-2 cursor-pointer right-3 ${username === '' ? "hidden" : "block"}`}><HiDotsVertical /></span> */}
                    <label className='text-[10px] lg:text-sm text-black'>Website username</label>
                    <p className='py-2 lg:text-[13px] lg:border-2 border-white px-2 bg-emerald-700 w-full rounded-lg pr-10 text-white text-[10px]'>{username || 'N/A'}</p>
                </div>

                <div className={`${isEditing === true ? "hidden" : "block"} h-auto w-full flex flex-col gap-2 justify-center items-start relative`}>
                    {/* <span className='absolute text-white bottom-2 cursor-pointer right-3'><HiDotsVertical /></span> */}
                    <span className='absolute text-white bottom-2 cursor-pointer right-5' onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? <FaEyeSlash /> : <FaEye />}</span>
                    <label className='text-[10px] lg:text-sm text-black'>Website password</label>
                    <input value={decodedPassword} disabled type={passwordVisible ? "text" : "password"} className='py-2 lg:text-[13px] lg:border-2 border-white px-2 bg-emerald-700 w-full rounded-lg pr-16 text-white text-[10px]' />
                </div>

                {/*------------------------------------------------------------------------------------------*/}

                <div className={`${isEditing === true ? "block" : "hidden"} h-auto w-full flex flex-col gap-2 justify-center items-start relative`}>
                    {/* <span className='absolute text-white bottom-2 cursor-pointer right-3'><HiDotsVertical /></span> */}
                    <label className='text-[10px] lg:text-sm text-black'>New website name</label>
                    <input onChange={(e) => setNewName(e.target.value)}  className='py-2 outline-none lg:text-[13px] lg:border-2 border-white px-2 bg-emerald-700 w-full rounded-lg pr-10 text-white text-[10px]'/>
                </div>

                <div className={`${isEditing === true ? "block" : "hidden"} h-auto w-full flex flex-col gap-2 justify-center items-start relative`}>
                    {/* <span className='absolute text-white bottom-2 cursor-pointer right-3'><HiDotsVertical /></span> */}
                    <label className='text-[10px] lg:text-sm text-black'>New website URL</label>
                    <input onChange={(e) => setNewUrl(e.target.value)} className='py-2 outline-none lg:text-[13px] lg:border-2 border-white px-2 bg-emerald-700 w-full rounded-lg pr-10 text-white text-[10px]'/>
                </div>

                <div className={`${isEditing === true ? "block" : "hidden"} h-auto w-full flex flex-col gap-2 justify-center items-start relative`}>
                    {/* <span className={`absolute text-white bottom-2 cursor-pointer right-3 ${username === '' ? "hidden" : "block"}`}><HiDotsVertical /></span> */}
                    <label className='text-[10px] lg:text-sm text-black'>New website username</label>
                    <input onChange={(e) => setNewUsername(e.target.value)} className='py-2 outline-none lg:text-[13px] lg:border-2 border-white px-2 bg-emerald-700 w-full rounded-lg pr-10 text-white text-[10px]'/>
                </div>

                <div className={`${isEditing === true ? "block" : "hidden"} h-auto w-full flex flex-col gap-2 justify-center items-start relative`}>
                    {/* <span className='absolute text-white bottom-2 cursor-pointer right-3'><HiDotsVertical /></span> */}
                    <span className='absolute text-white bottom-2 cursor-pointer right-5' onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? <FaEyeSlash /> : <FaEye />}</span>
                    <label className='text-[10px] lg:text-sm text-black'>New website password</label>
                    <input onChange={(e) => setnewPassword(e.target.value)} type={passwordVisible ? "text" : "password"} className='py-2 lg:text-[13px] outline-none lg:border-2 border-white px-2 bg-emerald-700 w-full rounded-lg pr-16 text-white text-[10px]' />
                </div>

                <button className={`${isEditing === true ? "block" : "hidden"} mt-2 w-full px-5 py-2 text-black font-semibold bg-white rounded-lg hover:bg-red-700 duration-300 ease-in-out cursor-pointer`} onClick={updateCredential}>Add</button>
                <button className={`${isEditing === true ? "block" : "hidden"} w-full px-5 py-2 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 duration-300 ease-in-out cursor-pointer`} onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                
            </div>
        </>
    )
}

export default PasswordBox
