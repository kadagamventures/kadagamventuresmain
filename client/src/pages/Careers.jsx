import React, { useEffect } from "react";
import Grow from "../assets/careers/Grow.png";
import RightClipAccent from "../components/RightClipAccent";

import useJobsStore from "../zustand/useJobsStore";

import JobCard from "../components/JobCard";
import InfinityLoader from "../components/InfinityLoader";

const Careers = () => {

    const {
        loadJobs,
        filteredJobs,
        searchQuery,
        setSearchQuery,
        loading,
    } = useJobsStore();

    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    const jobs = Array.isArray(filteredJobs()) ? filteredJobs() : [];

    return (
        <main>
            <section
                className="
                    relative w-full
                    min-h-[70vh]
                    bg-black overflow-hidden
                    flex flex-col xl:flex-row items-center justify-center
                "
            >
                {/* Right red accent clip */}
                <RightClipAccent />

                {/* Hero Illustration (replaces previous image) */}
                <div
                    data-aos="zoom-in"
                    data-duration="800"
                    className="relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-0 flex-1 flex justify-center xl:justify-start">
                    <img
                        src={Grow}
                        alt="Build Your Career Illustration"
                        className="w-full absolute -top-28 max-w-md xl:max-w-2xl h-auto object-contain hidden xl:block"
                    />
                </div>

                {/* Text and Search Bar */}
                <div className="
                    relative z-20
                    w-full max-w-7xl mx-auto px-6 xl:px-0
                    flex-1 flex flex-col items-center xl:items-start xl:ml-20
                "
                >
                    <h3
                        data-aos="fade-left"
                        data-duration="1200"
                        className="
                    
                        text-5xl sm:text-6xl md:text-7xl
                        font-extrabold leading-tight text-center xl:text-left
                    ">
                        <span className="text-white">Build Your</span><br />
                        <span className="text-[#9F080B]">Career With Us</span>
                    </h3>

                    <div className="mt-12 w-full max-w-lg">
                        <div
                            data-aos="fade-left"
                            data-duration="1200"
                            className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter Job Role"
                                className="
                                    w-full px-6 py-4 pr-36
                                    bg-white text-gray-600 text-lg
                                    rounded-2xl shadow-lg
                                    focus:outline-none
                                "
                            />
                            <button className="
                                absolute right-2 top-1/2 -translate-y-1/2
                                px-8 py-3
                                bg-[#405BAA] text-white font-medium
                                rounded-2xl hover:bg-[#405BAA]/85 transition cursor-pointer
                            ">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="bg-[#6C85CF1A]"
            >
                <div className="flex flex-col space-y-4 p-6 xl:p-12">
                    <div className='flex flex-col items-center justify-center font-sans gap-2'>
                        <p className='text-[#405BAA] font-semibold text-xl'>Our Openings</p>
                        <h2 className='font-semibold text-4xl text-center lg:text-start'>Currently open position</h2>
                    </div>

                    {loading && (
                        <div className="flex flex-col items-center justify-center gap-3">
                            <InfinityLoader />
                            <span className="">Exploring open roles…</span>
                        </div>
                    )}

                    {!loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-2 xl:p-12">
                            {jobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Careers;