import React from 'react';
import RightClipAccent from '../components/RightClipAccent';

const HeroSection = ({ title, image }) => {
    return (
        <section className="
            relative w-full
            min-h-[70vh]
            bg-black overflow-hidden
            flex items-center
        ">
            {/* Accent */}
            <RightClipAccent />

            <div
                data-aos="zoom-in"
                data-duration="800"
                className="
                    relative z-20 max-w-7xl mx-auto w-full
                    flex flex-col-reverse xl:flex-row
                    items-center justify-center xl:justify-between
                    px-6 xl:px-0
                    gap-4 xl:gap-0
                "
            >
                {/* Text */}
                <div className="text-white xl:absolute">
                    <h1 className="text-4xl sm:text-5xl  xl:text-7xl text-center xl:text-start font-bold leading-tight">
                        {title}
                    </h1>
                </div>

                {/* Image */}
                {image && (
                    <div className="
                        relative
                        w-full
                        flex justify-center xl:justify-end
                    ">
                        <img
                            src={image}
                            alt="Hero"
                            className="
                                h-52 sm:h-60 md:h-72 xl:h-110
                                w-auto object-contain
                                xl:absolute xl:-bottom-75 xl:right-0
                            "
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
