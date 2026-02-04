import React from 'react'

import { ourProducts } from '../config/ourProducts'
import { FiArrowUpRight } from "react-icons/fi";

const OurProducts = () => {
    return (
        <div className='bg-black text-white py-20 px-6 relative overflow-hidden'>
            <div
                className='pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 w-600 h-100 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]
                blur-2xl'
            />
            <div className='text-center mb-16'>
                <p
                    data-aos="fade-down"
                    data-duration="800"
                    className="text-blue-500 font-sans text-sm mb-2">Our Products</p>
                <h2
                    data-aos="fade-down"
                    data-duration="900"
                    className="text-3xl font-sans md:text-5xl font-semibold">
                    Turning Product Ideas Into Scalable Ventures
                </h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 group">
                {ourProducts.map((product, index) => (
                    <div
                        key={index}
                        className="relative font-sans rounded-2xl  p-6  transition"
                    >
                        <div className="relative font-sans overflow-hidden bg-white/5 mb-6 w-full h-72 border rounded-2xl border-[#405BAA]/45 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className={`w-full h-full object-contain transition-all duration-300 p-4
        ${product.loader ? "opacity-40 blur-[1px]" : "hover:scale-105"}`}
                            />
                            {product.loader && (
                                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                                    <div className="relative w-12 h-12 flex items-center justify-center">
                                        {[...Array(8)].map((_, i) => (
                                            <span
                                                key={i}
                                                className="absolute rounded-full bg-white/60 animate-spin"
                                                style={{
                                                    width: `${10 - i}px`,
                                                    height: `${10 - i}px`,
                                                    transform: `rotate(${i * 45}deg) translate(18px)`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                        <h3 className="text-xl font-sans font-semibold mb-2">
                            {product.title}
                        </h3>

                        <div className="h-0.5 w-full bg-linear-to-r from-[#303D73] via-[#730009] to-transparent mb-4" />

                        <div className="flex font-sans items-center justify-between gap-4">
                            <p className="text-sm text-gray-400 max-w-[80%]">
                                {product.description}
                            </p>

                            <a
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border transition-all duration-300 border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:rotate-45"
                            >
                                <FiArrowUpRight />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default OurProducts