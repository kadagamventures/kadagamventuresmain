import React from "react";

import Kadagamventuresdimlogo from '../assets/Logo/Kadagamventuresdimlogo.png'
import fallBackLogo from "../assets/team/fallBackLogo.png"

import { FaLinkedin } from "react-icons/fa";

const TeamCard = ({ profile, name, designation, linkedIn }) => {
    return (
        <div
            data-aos="fade-right"
            data-aos-duration="1300"
            className="bg-[#405BAA] rounded-2xl p-4 w-full max-w-lg mx-auto">
            <div className="relative bg-white rounded-2xl flex flex-col items-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-40"
                    style={{ backgroundImage: `url(${Kadagamventuresdimlogo})` }}
                />

                <div className="relative w-full h-105">
                    <img
                        src={profile || fallBackLogo}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = fallBackLogo;
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 mt-4">
                <h3 className="text-2xl font-semibold text-[#F0F3F9]">
                    {name}
                </h3>
                <div className="flex items-center justify-between gap-4  mt-1">
                    <p className="text-sm xl:text-lg text-[#D1D8EE]">
                        {designation} |
                    </p>
                    <a
                        href={linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} LinkedIn`}
                        className="
                    flex items-center justify-center
                    transition-colors
                "
                    >
                        <FaLinkedin className="text-white text-2xl" />
                    </a>
                </div>
            </div>
        </div>
    );
};


export default TeamCard;
