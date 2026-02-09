import React from 'react'

import HeroSection from '../components/HeroSection'
import NaveenImage from "../assets/products/naveensir.png";
import Vision from '../components/Vision';
import Team from '../components/Team';
// import Testimonials from '../components/Testimonials';

import idea from "../assets/AboutUs/idea.png"
import bulb from "../assets/AboutUs/bulb.png"
import Button from '../components/Button';

import { productBuild } from '../config/productBuild';
import ContactUs from '../components/ContactUs';


const AboutUs = () => {
    return (
        <main>
            <section>
                <HeroSection
                    title={
                        <>
                            The Journey of <br />
                            <span className='text-[#E60012]'>Kadagam</span>   <span className='text-[#405BAA]'>Venture</span>
                        </>
                    }
                />
            </section>
            <section className='px-10 py-12'>
                <h3 className='font-extrabold text-3xl mb-4'>About Us</h3>
                <p className='leading-loose text-xl font-sans text-gray-700 text-start'>
                    At Kadagam Ventures, we believe that business is not just about profit—it’s about purpose.
                    Kadagam Ventures is more than an IT company—it’s a purpose-driven force where innovation meets impact and progress uplifts people.
                    Founded by Mrs. Uma Rani and The team, our journey bridges the digital world with human values. We don’t just build technology — we craft intelligent platforms, design transformative experiences, and ignite positive change.
                    Our products fuel industry evolution; our deeper mission is rooted in creating opportunities that uplift communities and shape a better tomorrow.
                </p>
                <p className='leading-loose text-xl font-sans text-gray-700 text-start'>
                    Kadagam Ventures was founded in the early 2020s by a group of forward-thinking entrepreneurs in India who believed that businesses need more than just ideas to grow — they need the right strategy, technology, and execution.

                    With a strong focus on innovation and problem-solving, Kadagam Ventures was created to help organizations adapt to change, streamline operations, and unlock new opportunities through smart digital solutions. From strategy to execution, every solution is designed to deliver real value and measurable impact.

                    Today, Kadagam Ventures stands as a growing ecosystem of technology-driven products and services, empowering startups and enterprises alike. Our journey is defined by resilience, continuous learning, and a commitment to building solutions that don’t just work — but work smart.
                </p>
            </section>
            <section>
                <Vision />
            </section>
            <section>
                <Team />
            </section>
            {/* <section>
                <Testimonials />
            </section> */}
            <section className='bg-black w-full h-96 flex flex-row xl:flex-row gap-23 items-center justify-center p-12'>
                <div className='text-start text-white  max-w-2xl space-y-6'>
                    <h2 className='text-4xl font-semibold'>Looking for the Right Service ?</h2>
                    <p className='text-lg'>We’ve Got You Covered Share your requirement and <br /> let us build the perfect solution for you.</p>
                    <Button title={"Connect now"} />
                </div>
                <img
                    data-aos="fade-right"
                    data-aos-duration="1100"
                    src={idea}
                    alt='idea'
                    className='hidden lg:block'
                />
            </section>
            <section className="px-6 py-12 lg:px-16">
                <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-center mb-10">
                    Bringing Ideas Into Impactful Digital Products
                </h2>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6  max-w-7xl  mx-auto">
                    <div className="max-w-3xl space-y-6 text-center lg:text-left">
                        <p className="leading-relaxed text-base sm:text-lg text-[#000000A6]">
                            At Kadagam Ventures, we specialize in transforming ideas into scalable
                            digital solutions that help businesses grow with confidence. Many of
                            the products and platforms we’ve built began as simple concepts and
                            evolved into powerful tools that drive real results.
                        </p>

                        <p className="leading-relaxed text-base sm:text-lg text-[#000000A6]">
                            We take pride in partnering closely with our clients—from early
                            brainstorming to final delivery—ensuring every solution is thoughtfully
                            designed and technically sound. Seeing our clients succeed, expand, and
                            strengthen their digital presence is what motivates us every day.
                        </p>

                        <p className="leading-relaxed text-base sm:text-lg text-[#000000A6]">
                            While we follow a proven process to guide each project toward success,
                            we believe flexibility is key. Every idea is unique, and we’re always
                            open to refining, rethinking, and improving along the way to achieve
                            the best outcome.
                        </p>
                    </div>

                    <img
                        data-aos="zoom-out"
                        data-aos-duration="1100"
                        src={bulb}
                        alt="Idea bulb"
                        className="w-60 sm:w-72 lg:w-130 object-contain shrink-0"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-14 max-w-7xl mx-auto">
                    {productBuild.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                data-aos="zoom-in"
                                data-aos-duration="1100"
                                key={index}
                                className="flex flex-col gap-4 max-w-sm mt-6 xl:mt-12"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="text-2xl text-black" />
                                    <h3 className="text-2xl font-semibold">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className='px-6 py-12 lg:px-16'>
                <ContactUs />
            </section>
        </main>
    )
}

export default AboutUs