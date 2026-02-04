import React from 'react'
import { TeamDetails } from '../config/teamConfig'


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';

import "../styles/swiperpagination.css";

import TeamCard from './TeamCard';

const Team = () => {
    return (
        <div className='py-12 px-6 md:px-12 lg:px-24 space-y-24 bg-gray-200'>
            <div className='flex flex-col items-center justify-center font-sans gap-2'>
                <p className='text-[#405BAA] font-semibold text-xl'>Our Team</p>
                <h2 className='font-semibold text-4xl'>Meet the team behind our success</h2>
            </div>

            <div className='block xl:hidden'>
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
                        640: { slidesPerView: 1.8 },
                        768: { slidesPerView: 1.5 }
                    }}
                    pagination={{
                        clickable: true,
                        el: ".service-pagination",
                    }}
                    className="pb-16"
                >
                    {TeamDetails.map((member) => (
                        <SwiperSlide key={member.id}>
                            <TeamCard {...member} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="service-pagination relative z-20 mt-6"></div>
            </div>

            <div className='hidden xl:grid grid-cols-3 gap-6 xl:gap-12'>
                {TeamDetails.map((member) => (
                    <TeamCard key={member.id} {...member} />
                ))}
            </div>
        </div>
    )
}

export default Team