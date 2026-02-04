import React from 'react';
import CountUp from "react-countup";
import arrowPerson from "../assets/vision/arrowperson.png";
import scopePerson from "../assets/vision/scopeperson.png";
import visionBg from "../assets/vision/visionbg.png";

// import footerBg from "../assets/Footer/footetBg.jpg"

// import { clientStats } from '../config/clientConfig';

const Vision = () => {
    return (
        <>
            <div
                className="relative min-h-screen bg-[#F5F5F5] bg-no-repeat bg-bottom bg-cover flex flex-col gap-12 md:gap-16 lg:gap-20 py-12 md:py-16 overflow-hidden"
                style={{ backgroundImage: `url(${visionBg})` }}
            >
                <div className="container mx-auto px-6 lg:px-16 relative font-sans">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
                        <div className="max-w-7xl text-left">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                                <span className="vision-outline">VISI</span>
                                <span className="vision-filled">ON</span>
                            </h2>
                            <div className="mt-6 space-y-4 text-lg md:text-xl text-gray-800 leading-relaxed">
                                <p>At Kadagam Ventures, We Envision A Future Where Technology Becomes The Backbone Of Sustainable Progress.</p>
                                <p>We Are Building More Than Just Software—We're Building The Infrastructure For A Smarter, More Inclusive Tomorrow.</p>
                                <p>As A Forward-Thinking IT Company, Our Mission Is To Lead The Way In Digital Innovation, Delivering Smart, Scalable Solutions That Help Businesses Evolve With Confidence.</p>
                                <p>We Aim To Be A Global Leader In Delivering Intelligent, Future-Ready IT Solutions That Empower Businesses To Operate Smarter, Scale Faster, And Innovate Boldly.</p>
                            </div>
                        </div>

                        <img
                            data-aos="fade-left"
                            data-duration="800"
                            src={scopePerson}
                            alt="Vision - Looking ahead"
                            className="w-48 md:w-64 lg:w-80 xl:w-96 object-contain hidden lg:block"
                        />
                    </div>
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative font-sans">
                    <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 lg:gap-16">
                        <div className="max-w-7xl text-left">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="vision-outline">MISSI</span>
                                <span className="vision-filled">ON</span>
                            </h2>
                            <div className="mt-6 space-y-4 text-lg md:text-xl text-gray-800 leading-relaxed">
                                <p>We Specialize In Delivering Cutting-Edge Web, Mobile, And Enterprise Applications That Drive Business Growth And Digital Transformation.</p>
                                <p>From Dynamic Websites And Scalable Web Apps To Powerful E-Commerce Platforms, We Help Businesses Expand Their Online Presence And Enhance Operational Efficiency In A Connected World.</p>
                                <p>But We Don't Stop At Innovation—We Lead With Intention.</p>
                                <p>We Believe In Technology That Not Only Transforms Businesses—But Transforms Lives.</p>
                            </div>
                        </div>

                        <img
                            data-aos="fade-right"
                            data-duration="800"
                            src={arrowPerson}
                            alt="Mission - Aiming at goals"
                            className="w-48 md:w-64 lg:w-80 xl:w-96 object-contain hidden lg:block"
                        />
                    </div>
                </div>
            </div>
            {/* <div
                className="relative h-fit lg:h-40 bg-linear-to-l from-[#2B3B6A] to-[#000000]  bg-no-repeat bg-bottom bg-cover flex flex-col gap-12 md:gap-16 lg:gap-20 py-10 overflow-hidden"
                style={{ backgroundImage: `url(${footerBg})` }}
            >

                <div className="absolute inset-0 bg-linear-to-r from-[#2B3B6A]/70 to-[#000000]/70 opacity-40" />

                <div className="w-full  font-sans  grid grid-cols-2 lg:grid-cols-4 gap-8 text-center z-20">
                    {clientStats.map((item, index) => (
                        <div key={index}>
                            <h2 className="text-red-600 text-4xl  font-extrabold">
                                <CountUp
                                    start={0}
                                    end={item.value}
                                    duration={2.5}
                                    separator=","
                                    enableScrollSpy={true}
                                    scrollSpyOnce={true}
                                    scrollSpyDelay={100}
                                />
                                {item.suffix}
                            </h2>
                            <p className="text-white mt-2 text-sm md:text-2xl font-normal">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    );
};

export default Vision;