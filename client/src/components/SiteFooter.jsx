import React from 'react'
import Logo from '../assets/Logo/Kadagamventures.png';

const SiteFooter = () => {

    const getYear = new Date().getFullYear();

    return (
        <div
            className='w-full bg-white relative flex items-center justify-between px-6 py-4 border-t border-gray-200 '>
            <div
                className='flex items-center justify-center gap-3'>
                <img src={Logo} alt="Kadagam Ventures" className="h-8 md:h-10" />
                <span className="font-semibold text-red-600 text-lg md:text-xl">Kadagam</span>
                <span className="font-semibold text-blue-600 text-lg md:text-xl">Ventures</span>
            </div>
            <p className='font-sans  text-[#4A5565] right-135 absolute'>Copyright © {getYear} Kadagam Ventures Private Limited. All rights reserved.</p>

            <div
                className="absolute -top-0.5 -bottom-1 right-0 w-1/2 md:w-2/6 bg-[#9F090C] z-10"
                style={{
                    clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
                }}
            />
        </div>
    )
}

export default SiteFooter