import React from "react";
import { useNavigate } from "react-router-dom";

import { CiSettings } from "react-icons/ci";

import errorbg from "../assets/error/errorbg.png";
import errorpage from "../assets/error/errorpage.png";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen  w-full flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${errorbg})` }}
        >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">

                {/* 404 image */}
                <img
                    src={errorpage}
                    alt="404 Page Not Found"
                    className="w-full max-w-3xl animate-pulse object-contain drop-shadow-2xl"
                />

                {/* TEXT SECTION */}
                <h1 className="mt-6 text-3xl md:text-4xl font-bold text-white">
                    Oops! Page Not Found
                </h1>

                <p className="mt-3 text-gray-300 text-base md:text-lg leading-relaxed">
                    The page you’re looking for might have been removed,
                    renamed, or is temporarily unavailable.
                </p>

                {/* buttons */}
                <div className="flex gap-4 mt-8 flex-wrap justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition"
                    >
                        Home Page
                    </button>
                </div>

            </div>
        </div>

    );
};

export default PageNotFound;
