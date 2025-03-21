import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CiCloudMoon } from "react-icons/ci";
import { IoIosSunny } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { toast, Toaster } from 'react-hot-toast';

function GeneratePassword() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [length, setLength] = useState(false);
  const [password, setPassword] = useState('');

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark);
  }, [isDark]);

  const handleTheme = () => {
    setIsDark(!isDark);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied");
  }

  const generatePassword = (e) => {

    e.preventDefault();
    if(!length){
      toast.error("Length is required");
    }

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let allChars = "";
    let newPassword = "";

    if (upperCase) allChars += upperCaseChars;
    if (lowerCase) allChars += lowerCaseChars;
    if (numbers) allChars += numberChars;
    if (specialChar) allChars += specialChars;

    if (allChars.length === 0) {
      toast.error("Please select at least one option!");
      return;
    }

    for (let i = 0; i < length; i++) {
      newPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    setPassword(newPassword);
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

          <p className={`text-3xl ${isDark ? "text-white" : "text-black"} text-center`}>Generate a new password</p>

          <div className={`w-full lg:w-[60%] h-auto pt-10 grid grid-cols-2 md:grid-cols-4 md:px-14 justify-items-center relative`}>

            <div class="flex items-center w-fit mb-4">
              <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => { setUpperCase(e.target.checked) }} />
              <label for="default-checkbox" className={`text-[10px] ms-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>Uppercase</label>
            </div>
            <div class="flex items-center w-fit mb-4">
              <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => { setLowerCase(e.target.checked) }} />
              <label for="default-checkbox" className={`text-[10px] ms-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>Lowercase</label>
            </div>
            <div class="flex items-center w-fit mb-4">
              <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => { setNumbers(e.target.checked) }} />
              <label for="default-checkbox" className={`text-[10px] ms-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>Numbers</label>
            </div>
            <div class="flex items-center w-fit mb-4">
              <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => { setSpecialChar(e.target.checked) }} />
              <label for="default-checkbox" className={`text-[10px] ms-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>Special Characters</label>
            </div>
          </div> 

          <div className='w-full lg:w-[60%] px-16 h-auto py-2'>
            <input type="number" onChange={(e) => setLength(e.target.value)} placeholder='Enter password length' className={`px-3 py-2 rounded-lg outline-none w-full ${isDark ? "bg-zinc-800 text-white" : "bg-gray-200 text-black"} duration-300 ease-in-out`} />
          </div>

          <div className='w-full lg:w-[60%] px-16 h-auto py-2'>
            <button className={`py-2 mt-7 rounded-md cursor-pointer bg-gradient-to-br from-emerald-400 via-green-600 to-emerald-400 w-full ${isDark ? "text-white" : "text-white"} duration-300 ease-in-out`} onClick={generatePassword}>Generate</button>
          </div>

          <div className={`w-full ${password === '' ? "hidden" : "block"} relative mt-10 lg:w-[60%] px-16 h-auto py-2`}>
            <FaCopy className={`${isDark ? "text-gray-500" : "text-zinc-500"} absolute right-20 bottom-5 cursor-pointer`} onClick={copyToClipboard}/>
            <p className={`px-3 py-4 break-words pr-10 text-[10px] lg:text-[12px] rounded-lg w-full ${isDark ? "bg-zinc-800 text-white" : "bg-gray-200 text-black"} duration-300 ease-in-out`}>{password}</p>
          </div>

        </div>


      </div>
    </>
  )
}

export default GeneratePassword
