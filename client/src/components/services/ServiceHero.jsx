import React from 'react'
import RightClipAccent from "../RightClipAccent";

import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ServiceHero = ({ title, description, image }) => {

    const navigate = useNavigate();

    return (
        <section
            data-aos="fade-top"
            data-aos-duration="800"
            className="relative w-full min-h-[60vh] xl:min-h-[70vh] bg-white overflow-hidden">

            {/* Background Accent */}
            <RightClipAccent
                height="h-[450px]"
                className="z-0"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-4 xl:pt-20">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-gray-600 hover:text-black transition"
                    aria-label="Go back"
                >
                    <IoIosArrowRoundBack className="text-3xl md:text-4xl" />
                </button>

                {/* Text Content */}
                <div className="w-full flex flex-col items-start justify-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        {title}
                    </h1>

                    <p className="text-gray-600 w-full text-base sm:text-lg leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Image */}
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="w-full mt-8 rounded-2xl object-cover max-h-55 sm:max-h-75 md:max-h-90 xl:max-h-105 sm:block"
                    />
                )}
            </div>
        </section>

    );
};

export default ServiceHero;
