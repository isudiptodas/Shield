import React, { useRef } from 'react'
import greenPlanet from '../assets/green_planet.jpg';
import greenPlanet2 from '../assets/green_planet.png';
import DecryptedText from '../components/DecryptedText.jsx';
import background from '../assets/background.gif';
import VariableProximity from '../components/VariableProximity.jsx';
import stars from '../assets/stars.jpg';
import { Link } from 'react-router-dom';
import layer from '../assets/layer.webp';
import fingerprint from '../assets/fingerprint.webp';
import { FaLock } from "react-icons/fa";

function LandingPage() {

    const containerRef = useRef(null);
    const url = 'https://www.kiteworks.com/risk-compliance-glossary/aes-256-encryption/';

    const openPage = () => {
        window.open(url, '_blank');
    }

    return (
        <>

            <div className='w-full h-auto flex flex-col justify-center items-center overflow-hidden relative'>
                <div className='h-auto w-full bg-black flex flex-col justify-center content items-center relative'>

                    <img src={stars} className='w-full h-full object-cover absolute z-20' />

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

                    <div className=' h-10 lg:h-14 w-full bg-black'></div>


                    {/* <p className='h-36 py-10 font-medium z-30 text-center tracking-[8px] bg-gradient-to-br from-emerald-200 via-emerald-400 to-green-800 bg-clip-text sm:text-lg md:text-2xl text-transparent'>SHIELD</p> */}

                    {/* <img src={background} className='absolute z-20 opacity-40 w-full h-full object-cover' /> */}

                    <div className='h-64 sm:h-72 md:h-[400px] lg:h-[500px] w-full overflow-hidden relative'>

                        <p className='absolute z-30 text-white w-full text-center motion-preset-slide-up motion-duration-2000 tracking-[10px] md:text-xl'>MANAGING</p>

                        <div className='hidden md:block h-5 lg:h-14 w-full bg-black'></div>

                        <p className='text-white motion-preset-slide-up motion-duration-1500 tracking-wider mt-5 md:mt-0 z-20 absolute font-extrabold text-center w-full text-5xl md:text-9xl lg:text-[150px] lg:-mt-7'>PASSWORD</p>

                        <img src={greenPlanet2} className='h-full w-full object-cover absolute z-30' />
                        <img src={greenPlanet} className='h-full w-full object-cover' />

                        <div className='w-full px-16 h-auto absolute top-0 md:mt-52 mt-36 z-30 flex justify-center items-center'>
                            <DecryptedText
                                parentClassName='text-center text-white motion-preset-focus motion-duration-2000'
                                className='text-white text-[13px] md:text-xl lg:text-2xl text-center'
                                text="Made easy with 256-bit encryption"
                                animateOn='view'
                                revealDirection='center'
                                speed={75}
                                maxIterations={30}
                            />
                        </div>

                        <div className='w-full flex justify-center items-center h-auto z-40 absolute top-2/3 lg:top-1/2 py-3'>
                            <Link to='/auth/login' className='w-auto py-[4px] text-[10px] md:text-[15px] rounded-full pl-5 pr-[4px] cursor-pointer flex justify-center items-center gap-5 bg-white'>Log In<Link to='/auth/register' className='bg-black text-[10px] md:text-[15px] text-white rounded-full cursor-pointer py-[4px] px-5'>Sign Up</Link></Link>
                        </div>
                    </div>

                    <div className='h-auto w-full flex justify-start gap-5 z-30'>
                        <div className='w-full h-2 bg-gradient-to-br from-emerald-300 via-emerald-700 to-green-300'></div>
                    </div>
                </div>

                <div className='w-full h-auto py-5 sm:py-8 px-5 text-center flex flex-col gap-3 bg-black'>
                    <p className='text-white sm:text-[15px] lg:text-lg text-[10px]'>At <span>SHIELD</span> your passwords are saved securely with 256-bit high security encryption.</p>
                    <span className='text-[10px] sm:text-[15px] lg:text-lg flex justify-center items-center gap-2 text-white'>Know more <span className='w-auto lg:text-lg cursor-pointer font-extrabold sm:text-[15px] bg-gradient-to-bl from-emerald-200 to-emerald-600 bg-clip-text text-transparent ' onClick={openPage}>Here</span></span>
                </div>

                <div className='w-full h-36 sm:h-56 flex px-10 justify-center items-center gap-3 sm:gap-7 py-8 bg-black relative group'>
                    <div className='w-full absolute h-[2px] bg-white top-0 group-hover:translate-x-full -translate-x-full duration-500 transition-transform'></div>
                    <span className='text-white text-start w-auto text-[13px] sm:text-lg'>Comes with 3 layer authentication</span>
                    <img src={layer} className='h-full mix-blend-lighten' />
                    <div className='w-full absolute h-[2px] bg-white bottom-0 group-hover:-translate-x-full translate-x-full duration-500 transition-transform'></div>
                </div>
                <div className='w-full h-36 sm:h-56 flex flex-row-reverse px-10 justify-center items-center gap-3 sm:gap-7 py-8 bg-black relative group'>
                    <div className='w-full absolute h-[2px] bg-white top-0 group-hover:translate-x-full -translate-x-full duration-500 transition-transform'></div>
                    <span className='text-white text-start w-auto text-[13px] sm:text-lg'>Not even we can view your encrypted credentials</span>
                    <img src={fingerprint} className='h-full mix-blend-lighten' />
                    <div className='w-full absolute h-[2px] bg-white bottom-0 group-hover:-translate-x-full translate-x-full duration-500 transition-transform'></div>
                </div>

                <div className='w-full bg-black h-auto grid grid-cols-2 md:grid-cols-4 justify-items-center gap-5 py-5 px-5'>
                    <div className='h-40 px-3 py-5 sm:px-10 md:px-5 w-40 sm:w-56 sm:h-56 md:w-48 md:h-48 lg:w-64 flex justify-center items-end relative rounded-lg bg-zinc-900 cursor-pointer hover:bg-gradient-to-br hover:from-zinc-900 hover:to-emerald-800 duration-300 ease-in-out transition-colors'>
                        <span className='text-6xl font-bold absolute top-2 left-2 lg:left-5 text-gray-600 '>1.</span>
                        <p className='text-gray-300 text-start text-[13px] sm:text-xl'>Create account on SHIELD</p>
                    </div>
                    <div className='h-40 px-3 py-5 sm:px-10 md:px-5 w-40 sm:w-56 sm:h-56 md:w-48 md:h-48 lg:w-64 flex justify-center items-end relative rounded-lg bg-zinc-900 cursor-pointer hover:bg-gradient-to-br hover:from-zinc-900 hover:to-emerald-800 duration-300 ease-in-out transition-colors'>
                        <span className='text-6xl font-bold absolute top-2 left-2 lg:left-5 text-gray-600 '>2.</span>
                        <p className='text-gray-300 text-start text-[13px] sm:text-xl'>Add your credentials</p>
                    </div>
                    <div className='h-40 px-3 py-5 sm:px-10 md:px-5 w-40 sm:w-56 sm:h-56 md:w-48 md:h-48 lg:w-64 flex justify-center items-end relative rounded-lg bg-zinc-900 cursor-pointer hover:bg-gradient-to-br hover:from-zinc-900 hover:to-emerald-800 duration-300 ease-in-out transition-colors'>
                        <span className='text-6xl font-bold absolute top-2 left-2 lg:left-5 text-gray-600 '>3.</span>
                        <p className='text-gray-300 text-start text-[13px] sm:text-xl'>Save them for future use</p>
                    </div>
                    <div className='h-40 px-3 py-5 sm:px-10 md:px-5 w-40 sm:w-56 sm:h-56 md:w-48 md:h-48 lg:w-64 flex justify-center items-end relative rounded-lg bg-zinc-900 cursor-pointer hover:bg-gradient-to-br hover:from-zinc-900 hover:to-emerald-800 duration-300 ease-in-out transition-colors'>
                        <span className='text-6xl font-bold absolute top-2 left-2 lg:left-5 text-gray-600 '>4.</span>
                        <p className='text-gray-300 text-start text-[13px] sm:text-xl'>Take full control of your account</p>
                    </div>
                </div>

                <div className='w-full h-32 lg:h-48 flex justify-center items-center bg-black'>
                   <p className='text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold flex justify-center items-center gap-2'>Happy encyption <span><FaLock className='text-emerald-400' /></span> </p>
                </div>
            </div>


        </>
    )
}

export default LandingPage
