import React from 'react'
import kadagamnextImage from "../assets/team/balajitwo.png"
import umarani from "../assets/products/umaraninew.png"

const Journey = () => {
    return (
        <>
            <div
                className='bg-black relative py-4 px-6 overflow-hidden'>
                <div
                    className='pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 w-600 h-100 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]
                blur-2xl'
                />
                <div
                    data-aos="zoom-in"
                    data-duration="800"
                    className='flex flex-col-reverse lg:flex-row items-center justify-between p-4 mx-auto w-full'>
                    <img
                        src={umarani}
                        alt='Naveen Kumar'
                        className='relative bottom-0 lg:-bottom-8 h-80 lg:h-96 hidden lg:block'
                    />
                    <p className='text-white text-center text-3xl md:text-5xl  lg:text-6xl font-extrabold leading-normal'>The Journey Of <br /> <span className='text-[#B80625]'> Kadagam <span className='text-[#405BAA]'>Ventures</span> </span></p>
                    <img
                        src={kadagamnextImage}
                        alt='Naveen Kumar'
                        className='relative bottom-0 lg:-bottom-8 h-80 lg:h-96 hidden lg:block'
                    />
                </div>
            </div>
            <div
                className="text-justify mx-auto  max-w-9xl px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-10 lg:py-12 text-base sm:text-lg md:text-xl leading-relaxed text-[#000000BF] font-sans space-y-5 sm:space-y-6 md:space-y-7 ">
                <p>
                Kadagam Ventures was established in early 2020 by Indian entrepreneurs who
                 identified a widespread market flaw; great ideas often fail due to a lack of support.
                </p>

                <p>
                They recognized that a business could only truly scale if there were a sophisticated mix of strategy, technology, and tireless execution.
                Motivated by a genuine desire to address challenges, we have constructed Kadagam to be an ally in transformation.
                </p>

                

                <p>
                We help companies in navigating changing market dynamics, optimizing their processes, 
                and drive additional growth through intentional digital transformation.From insight to
                 execution, each solution is tailored to make a visible impact

                </p>

                <p>
                Today, Kadagam Ventures is an ecosystem of technology-powered products 
                and services such as Web Design & Development, Mobile App Development, Digital Marketing,
                UI/UX Designer, Landing page Design, Branding & Graphic Designer platforms for both startups 
                and enterprises.
                </p>
                <p>
                We’re on the relentless pursuit of success, we never stop learning, and we don’t just show up to work and punch in
                  we also make the clock work for us through hard work, solutions, and systems.
                </p>
            </div>

        </>
    )
}

export default Journey