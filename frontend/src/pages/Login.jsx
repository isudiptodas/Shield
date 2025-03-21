import React, { useRef, useState } from 'react'
import VariableProximity from '../components/VariableProximity.jsx'
import stars from '../assets/stars.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast, Toaster } from 'react-hot-toast';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

function Login() {

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginUser = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {

      const res = await axios.post('https://shield-mghf.onrender.com/auth/login', {
        email, password
      });

      if(res.data.success === false){
        toast.error(res.data.response?.message);
      }
      else{
        // console.log(res.data);
        const token = res.data.token;
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    }
    catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <div className='w-full px-5 bg-black overflow-hidden h-auto flex flex-col justify-center items-center'>
        <Toaster />
        <Link to='/' className='text-white cursor-pointer flex justify-center items-center absolute top-10 left-5 lg:left-10'><IoIosArrowRoundBack className='text-xl lg:text-2xl' /> Go back </Link>

        <div class="absolute flex justify-center flex-col gap-10 inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#1CAC78_100%)]">

          <div className='h-20 lg:h-40 z-30 w-full flex justify-center items-center relative' ref={containerRef}>
            <VariableProximity
              label={'SHIELD'}
              className={'variable-proximity-demo'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
            />
          </div>

          <form className='w-full border-2 border-white md:w-[70%] z-50 lg:w-[50%] xl:w-[40%] px-10 flex flex-col gap-5 h-auto py-10 backdrop-blur-3xl bg-white/10 rounded-xl'>

            <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
              <label className='text-white'>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' className='w-full text-sm bg-white px-2 py-2 rounded-md outline-none' />
            </div>

            <div className='w-full h-auto flex flex-col justify-center relative items-start gap-2'>
              <label className='text-white'>Password</label>
              <span className='absolute text-gray-600 bottom-2 right-5' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? (<FaEyeSlash />) : (<FaRegEye />)}</span>
              <input onChange={(e) => setPassword(e.target.value)} type={isPasswordVisible ? "password" : "text"} placeholder='Set a password' className='w-full pr-14 text-sm bg-white px-2 py-2 rounded-md outline-none' />
            </div>

            <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
              <p className='text-white text-sm font-light'>Don't have an account ? <Link to='/auth/register' className='font-bold cursor-pointer'>Create here</Link></p>
              <p className='text-white text-sm font-light'>Forgot password ? <Link to='/recover-password' className='font-bold cursor-pointer'>Try recovery here</Link></p>
            </div>

            <button className='w-full mt-5 py-2 bg-emerald-500 hover:bg-emerald-600 cursor-pointer duration-300 ease-in-out text-white font-bold rounded-md' onClick={loginUser}>Login</button>

          </form>

        </div>

      </div>
    </>
  )
}

export default Login
