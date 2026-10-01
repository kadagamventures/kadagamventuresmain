import React from "react";
import Logo from "../assets/Logo/Kadagamventures.png";

const SiteFooter = () => {
    const getYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-gray-200 relative overflow-hidden">

            <div className="relative z-20 w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3">

                {/* Logo */}
                <div className="flex items-center gap-2 min-w-0 shrink-0">
                    <img
                        src={Logo}
                        alt="Kadagam Ventures"
                        className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                    />

                    <div className="flex items-center whitespace-nowrap">
                        <span className="font-semibold text-red-600 text-sm sm:text-base md:text-lg">
                            Kadagam
                        </span>

                        <span className="font-semibold text-blue-600 text-sm sm:text-base md:text-lg ml-1">
                            Ventures
                        </span>
                    </div>
                </div>

                {/* Copyright */}
                <p className="font-sans text-[#4A5565] text-xs sm:text-sm md:text-base text-center truncate min-w-0 flex-1">
                    Copyright © {getYear} Kadagam Ventures Private Limited. All rights reserved.
                </p>

                {/* Red Design */}
                <div
                    className="absolute -top-0.5 -bottom-1 right-0 w-1/3 md:w-1/4 bg-[#9F090C] -z-10"
                    style={{
                        clipPath:
                            "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
                    }}
                />
            </div>
        </footer>
    );
};

export default SiteFooter;