import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import clientOne from "../assets/clients/matalogo.png";
import clientTwo from "../assets/clients/cricinsidewhitenew.png";

const clients = [
    clientOne,
    clientTwo,
    clientOne,
    clientTwo,
];

const OurClients = () => {
    return (
        <section className="relative py-14 bg-black overflow-hidden">

            {/* 🔵 Glow background (same as Journey) */}
            <div
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 
        w-190 h-50
        bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]
        blur-3xl"
            />

            <h2 className="relative text-center text-2xl xl:text-4xl text-white font-semibold mb-10 z-10">
                Brands We Work With
            </h2>

            {/* <div className="h-0.5 w-full bg-linear-to-r from-[#303D73] via-[#730009] to-transparent mb-4" /> */}

            <Swiper
                className="relative z-10"
                modules={[Autoplay]}
                slidesPerView={2}
                spaceBetween={30}
                loop={true}
                speed={4000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {clients.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center justify-center h-24">
                            <img
                                src={logo}
                                alt="client"
                                className="h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="h-0.5 w-full bg-linear-to-r from-[#303D73] via-[#730009] to-transparent mb-2" />
        </section>

    );
};

export default OurClients;
