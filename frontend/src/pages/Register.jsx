import React, { useRef, useState } from 'react'
import VariableProximity from '../components/VariableProximity.jsx'
import stars from '../assets/stars.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast, Toaster } from 'react-hot-toast';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

function Register() {

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const registerUser = async (e) => {

    e.preventDefault();

    if (!name || !email || !password || !securityQuestion || !answer) {
      toast.error("All fields are required");
      return;
    }

    if(password.length <= 8){
      toast.error("Password must contain 8 or more characters");
      return;
    }

    try{
      const res = await axios.post('https://shield-mghf.onrender.com/auth/register', {
        name, email, password, securityQuestion, answer
      });

      if(res.data.success){
        navigate('/auth/login');
      }
    }
    catch(err){
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <div className='w-full px-5 bg-black overflow-hidden h-auto flex flex-col justify-center items-center'>
        <Toaster />
        <Link to='/' className='text-white cursor-pointer flex justify-center items-center absolute top-10 left-5 lg:left-10'><IoIosArrowRoundBack className='text-xl lg:text-2xl' /> Go back </Link>

        <div class="absolute flex justify-start flex-col gap-10 inset-0 -z-10 h-full overflow-auto w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#1CAC78_100%)]">

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
              <label className='text-white'>Name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter full name' className='w-full text-sm bg-white px-2 py-2 rounded-md outline-none' />
            </div>

            <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
              <label className='text-white'>Email</label>
              <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' className='w-full text-sm bg-white px-2 py-2 rounded-md outline-none' />
            </div>

            <div className='w-full h-auto flex flex-col justify-center relative items-start gap-2'>
              <label className='text-white'>Password</label>
              <span className='absolute text-gray-600 bottom-2 right-5' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? (<FaEyeSlash />) : (<FaRegEye />)}</span>
              <input onChange={(e) => setPassword(e.target.value)} type={isPasswordVisible ? "password" : "text"} placeholder='Set a password' className='w-full pr-14 text-sm bg-white px-2 py-2 rounded-md outline-none' />
            </div>

            <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
              <label className='text-white'>Security Question</label>
              <input onChange={(e) => setSecurityQuestion(e.target.value)} type="text" placeholder='Set a security question' className='w-full text-sm bg-white px-2 py-2 rounded-md outline-none' />
            </div>

            <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
              <label className='text-white'>Answer</label>
              <input onChange={(e) => setAnswer(e.target.value)} type="text" placeholder='Set your answer' className='w-full text-sm bg-white px-2 py-2 rounded-md outline-none' />
            </div>

            <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
              <p className='text-white text-sm font-light'>Already have an account ? <Link to='/auth/login' className='font-bold cursor-pointer'>Login here</Link></p>
            </div>

            <button className='w-full mt-5 py-2 bg-emerald-500 hover:bg-emerald-600 cursor-pointer duration-300 ease-in-out text-white font-bold rounded-md' onClick={registerUser}>Create Account</button>

          </form>

        </div>

      </div>
    </>
  )
}

export default Register
