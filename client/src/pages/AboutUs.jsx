import React, { useRef } from 'react'

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
import SocialLinks from '../components/SocialLinks';


const AboutUs = () => {

    const contactRef = useRef(null);

    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

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
                <p className='leading-loose text-xl font-sans text-gray-700 text-justify'>
                    Kadagam Ventures was established in early 2020 by Indian entrepreneurs who identified a
                    widespread market flaw; great ideas often fail due to a lack of support. They recognized that a business could only truly scale
                    if there were a sophisticated mix of strategy, technology, and tireless execution.
                </p>
                <p className='leading-loose text-xl font-sans text-gray-700 text-justify'>
                    Motivated by a genuine desire to address challenges, we have constructed Kadagam to be
                    an ally in transformation. We help companies in navigating changing market dynamics,
                    optimizing their processes, and drive additional growth through intentional digital
                    transformation.From insight to execution, each solution is tailored to make a visible impact.
                </p>
                <p className='leading-loose text-xl font-sans text-gray-700 text-justify'>
                    Today, Kadagam Ventures is an ecosystem of technology-powered products and services such as
                    Web Design & Development, Mobile App Development, Digital Marketing, UI/UX Designer, Landing page Design,
                    Branding & Graphic Designer platforms for both startups and enterprises. We’re on the relentless pursuit
                    of success, we never stop learning, and we don’t just show up to work and punch in  we also make the
                    clock work for us through hard work, solutions and systems.
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
                    <Button title={"Connect now"} onClick={scrollToContact} />
                    <SocialLinks />
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
                    Transforming Ideas Into Digital Products with an Impact
                </h2>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6  max-w-7xl  mx-auto">
                    <div className="max-w-3xl space-y-6 text-center lg:text-left">
                        <p className="leading-relaxed text-base sm:text-lg text-[#000000A6]">
                            We create scalable digital solutions based on ideas that help businesses grow
                            with confidence. A lot of the products and platforms we have built always started out
                            as random ideas and eventually grew into robust tools that deliver action.
                        </p>

                        <p className="leading-relaxed text-base sm:text-lg text-[#000000A6]">
                            Our pride lies in close collaboration with our customers  all the way from early
                            brainstorming to final release, thus each solution designed thoroughly and after that
                            technically optimal. And nothing could be more satisfying for us than to see our clients GROW &
                            THRIVE thanks to their stronger online presence.
                        </p>

                        <p className="leading-relaxed text-base sm:text-lg text-[#000000A6]">
                            We have a regular process for taking each project through, but realize every project
                            is different! Every concept is unique, and we are always ready to iterate, reassess and
                            enhance while striving for the optimal outcome.

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
            <section ref={contactRef} className='px-6 py-12 lg:px-16'>
                <ContactUs />
            </section>
        </main>
    )
}

export default AboutUs