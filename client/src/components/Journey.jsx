import React from 'react'
import kadagamnextImage from "../assets/products/naveensir.png"
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
                className="text-start mx-auto  max-w-9xl px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-10 lg:py-12 text-base sm:text-lg md:text-xl leading-relaxed text-[#000000BF] font-sans space-y-5 sm:space-y-6 md:space-y-7">
                <p>
                    At Kadagam Ventures, we believe that business is not just about profit - it’s about purpose.
                    Kadagam Ventures is more than an IT company-it’s a purpose-driven force where innovation
                    meets impact and progress uplifts people.
                </p>

                <p>
                    Founded by Mr. Naveen Kumar and the team, our journey bridges the digital world with human
                    values. We don’t just build technology — we craft intelligent platforms, design transformative
                    experiences, and ignite positive change. Our products fuel industry evolution; our deeper
                    mission is rooted in creating opportunities that uplift communities and shape a better tomorrow.
                </p>

                <p>
                    Kadagam Ventures was founded in the early 2020s by a group of forward-thinking entrepreneurs
                    in India who believed that businesses need more than just ideas to grow — they need the right
                    strategy, technology, and execution.
                </p>

                <p>
                    With a strong focus on innovation and problem-solving, Kadagam Ventures was created to help
                    organizations adapt to change, streamline operations, and unlock new opportunities through
                    smart digital solutions. From strategy to execution, every solution is designed to deliver
                    real value and measurable impact.
                </p>

                <p>
                    Today, Kadagam Ventures stands as a growing ecosystem of technology-driven products and
                    services, empowering startups and enterprises alike. Our journey is defined by resilience,
                    continuous learning, and a commitment to building solutions that don’t just work — but work smart.
                </p>
            </div>

        </>
    )
}

export default Journey