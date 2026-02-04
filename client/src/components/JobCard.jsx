import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import slugify from "../utils/slugify";

const JobCard = ({ job }) => {

    const navigate = useNavigate();

    const handleApply = () => {
        navigate(`/careers/${slugify(job.title)}`);
    };

    return (
        <div
            data-aos="zoom-in"
            data-aos-duration="1200"
            className="
        bg-white
        border border-[#405BAA]/20
        rounded-3xl
        p-8
        flex flex-col justify-between
        min-h-7
      "
        >
            {/* ===== TOP ===== */}
            <div

                className="space-y-4">
                <h3 className="text-2xl font-semibold text-black">
                    {job.title}
                </h3>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <HiOutlineLocationMarker />
                        {job.location}
                    </span>

                    <span className="flex items-center gap-1">
                        <BsBriefcase />
                        {job.experience}
                    </span>

                    <span className="px-3 py-1 bg-[#6C85CF1A] text-[#405BAA] rounded-full text-xs font-medium">
                        {job.employmentType}
                    </span>
                </div>

                {/* Overview */}
                {/* <p className="text-gray-600 leading-relaxed">
                    {job.overview}
                </p> */}

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="
                px-3 py-1
                text-sm
                bg-gray-100
                text-gray-700
                rounded-full
              "
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* ===== FOOTER ===== */}
            <div className="flex flex-col lg:flex-row items-start gap-3 lg:items-center justify-between mt-6">
                <p className="text-sm text-gray-500">
                    Openings:{" "}
                    <span className="font-medium text-gray-700">
                        {job.positionCount}
                    </span>
                </p>

                <button
                    onClick={handleApply}
                    className="
            px-8 py-3
            bg-[#405BAA]
            text-white
            font-medium
            rounded-xl
            hover:bg-[#405BAA]/90
            transition
          "
                >
                    View Job Details
                </button>
            </div>
        </div>
    );
};

export default JobCard;
