import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

import useAdminCareerStore from "../../../zustand/useAdminCareerStore";

export default function AdminViewCareer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { careers, fetchCareers } = useAdminCareerStore();

  useEffect(() => {
    if (careers.length === 0) {
      fetchCareers();
    }
  }, [careers.length, fetchCareers]);

  const career = careers.find((c) => c.id === Number(id));

  if (!career) {
    return (
      <div className="min-h-screen bg-gray-50/70 flex items-center justify-center">
        <div className="text-gray-500 text-lg animate-pulse">
          Loading career details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/70 py-3 px-3 ">
      <div className="">
        {/* Card */}
        <div className="bg-white   overflow-hidden">
          {/* Header */}
          <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between ">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {career.title}
              </h1>
              <p className="mt-1 text-gray-600">
                {career.location} • {career.employmentType} •{" "}
                {career.experience}
                {career.positionCount > 1 &&
                  ` • ${career.positionCount} openings`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/admin/careers/edit/${id}`)}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                title="Edit this career"
              >
                <AiOutlineEdit size={18} />
                <span className="hidden sm:inline">Edit</span>
              </button>

              <button
                onClick={() => navigate("/admin/careers")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <AiOutlineClose
                  size={22}
                  className="text-gray-600 hover:text-gray-900"
                />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-7 space-y-8">
            {/* Overview */}
            {career.overview && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {career.overview}
                </p>
              </section>
            )}

            {/* Key Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-xl">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-gray-900">{career.location || "—"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Experience
                </h3>
                <p className="mt-1 text-gray-900">{career.experience || "—"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Employment Type
                </h3>
                <p className="mt-1 text-gray-900">
                  {career.employmentType || "—"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Open Positions
                </h3>
                <p className="mt-1 text-gray-900">
                  {career.positionCount || 1}
                </p>
              </div>
            </div>

            {/* Responsibilities */}
            {career.responsibilities?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Key Responsibilities
                </h2>
                <ul className="space-y-2.5 text-gray-700">
                  {career.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-indigo-500 mt-1.5 text-xl">•</span>
                      <span className="flex-1">{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Skills */}
            {career.skills?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* What We Offer */}
            {career.whatWeOffer?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  What We Offer
                </h2>
                <ul className="space-y-2.5 text-gray-700">
                  {career.whatWeOffer.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1 text-xl">✓</span>
                      <span className="flex-1">{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How to Apply */}
            {career.howToApply && (
              <section className="bg-blue-50/40 p-6 rounded-xl border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  How to Apply
                </h2>
                <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                  {career.howToApply}
                </div>
              </section>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-7 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
            <button
              onClick={() => navigate("/admin/careers")}
              className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Back to List
            </button>

            <button
              onClick={() => navigate(`/admin/careers/edit/${id}`)}
              className="px-6 py-2.5 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Edit Career
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
