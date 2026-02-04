import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import "../styles/swiperpagination.css";

import illustrationLadyService from '../assets/service/illustrationLadyService.png';

import { services } from '../config/servicesConfig';



const ServiceCarousel = () => {

    const navigate = useNavigate()
    return (
        <div className="bg-black h-215.25 text-white  relative overflow-hidden">
            <div
                className='pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 w-600 h-100 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]
                blur-2xl'
            />
            <div className='w-full flex text-center  items-center justify-center p-10'>
                <div className='flex flex-col gap-4'>
                    <p className='text-[#405BAA]'>Service we provide</p>
                    <h2 className='font-medium font-sans text-5xl'>Service that can help you</h2>
                </div>
            </div>
            <div className='w-full  flex items-center justify-between p-10 relative'>
                <div>
                    <img
                        src={illustrationLadyService}
                        alt='illustrationLadyService'
                        className="w-80 xl:w-105 absolute border-0 top-96 -translate-y-1/2 left-0 hidden lg:block"
                    />
                </div>
                <div className='w-full lg:w-[75%]'>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={12}
                        slidesPerView={1}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 1.2 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 2.5 },
                            1280: { slidesPerView: 2.8 },
                        }}
                        pagination={{
                            clickable: true,
                            el: ".service-pagination",
                        }}
                        className="pb-16"
                    >
                        {services.map((service) => (
                            <SwiperSlide key={service.id}>
                                <div className="bg-white text-white h-140 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 flex flex-col">

                                    <h3 className="text-2xl  mb-4 text-black text-center font-bold">{service.title}</h3>

                                    <div className="p-4 border border-gray-600 rounded-2xl flex items-center justify-center ">

                                        <img
                                            src={service.image || service.icon}
                                            alt={service.title}
                                            className="w-48 h-48 md:w-64 md:h-56 object-cover"
                                        />
                                    </div>

                                    <p className="text-black mb-8 grow pt-8 h-40 overflow-y-scroll [&::-webkit-scrollbar]:hidden">{service.description}</p>

                                    <button
                                        onClick={() => navigate(`/services/${service.slug}`)}
                                        className="bg-[#405BAA] hover:bg-[#405BAA]/35 cursor-pointer transition-colors text-white font-medium py-3 px-6 rounded-lg w-full mt-auto">
                                        Explore Service
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="service-pagination relative z-20 mt-6"></div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCarousel;