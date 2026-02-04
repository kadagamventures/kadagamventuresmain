import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { IoStar } from "react-icons/io5";

import "swiper/css";
import "swiper/css/navigation";

import { TestimonialsDetails } from "../config/testimonials";

const Testimonials = () => {
    return (
        <section className="py-16">
            {/* Heading */}
            <div className="flex flex-col items-center justify-center font-sans gap-2 mb-10">
                <p className="text-[#405BAA] font-semibold text-xl">
                    Testimonials
                </p>
                <h2 className="font-semibold text-4xl text-center">
                    What Our Clients Say About Us
                </h2>
            </div>

            <div className="relative max-w-7xl mx-auto px-4">
                {/* Custom Arrows */}
                <div className="absolute -right-4  top-28 flex gap-4 z-20">
                    <button
                        className="
                            testimonial-prev
                            w-12 h-12
                            rounded-full
                            bg-[#E1E1E1]
                            xl:flex items-center justify-center
                            hover:bg-[#405BAA]
                            transition
                            group
                            cursor-pointer
                            hidden
                        "
                    >
                        <FaChevronRight className="text-black group-hover:text-white text-xl" />
                    </button>
                </div>
                <div className="absolute -left-4 right-4 top-28 flex gap-4 z-20">
                    <button
                        className="
                            testimonial-next
                            w-12 h-12
                            rounded-full
                            bg-[#E1E1E1]
                           xl:flex items-center justify-center
                            hover:bg-[#405BAA]
                            transition
                            group
                            cursor-pointer
                            hidden
                        "
                    >
                        <FaChevronLeft className="text-black group-hover:text-white text-xl" />
                    </button>
                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        prevEl: ".testimonial-prev",
                        nextEl: ".testimonial-next",
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={30}
                    slidesPerView={3}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10"
                >
                    {TestimonialsDetails.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="
                                border border-gray-300
                                rounded-2xl
                                p-8
                                h-full
                                flex flex-col
                                justify-between
                                text-center
                                bg-white
                            ">
                                {/* Stars */}
                                <div className="flex justify-center mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <IoStar
                                            key={i}
                                            className={
                                                i < item.rating
                                                    ? "text-yellow-400 text-3xl"
                                                    : "text-gray-300 text-3xl"
                                            }
                                        />
                                    ))}
                                </div>

                                {/* Description */}
                                <p className="text-base font-sans text-[#000000A6] leading-relaxed mb-6">
                                    {item.description}
                                </p>

                                {/* Name */}
                                <h4 className="font-semibold text-2xl font-sans">
                                    {item.name}
                                </h4>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
