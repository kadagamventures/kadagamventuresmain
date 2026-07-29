import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAdminCareerStore from "../../zustand/useAdminCareerStore";

export default function AdminCareers() {
  const navigate = useNavigate();

  const { careers, fetchCareers, deleteCareer, loading } =
    useAdminCareerStore();

  useEffect(() => {
    fetchCareers();
  }, []);

  // ================= DELETE =================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this position?")) return;

    try {
      await deleteCareer(id);

      toast.success("Career deleted successfully");
    } catch (err) {
      toast.error(err?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6 md:p-8 bg-white min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Careers</h1>

          <p className="text-gray-500 text-sm">job application</p>
        </div>

        <button
          onClick={() => navigate("/admin/careers/add")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-indigo-700 transition cursor-pointer"
        >
          <FaPlus />
          Add new position
        </button>
      </div>

      {/* LOADING */}

      {loading && <div className="text-center py-20">Loading...</div>}

      {/* GRID */}

      <div className="grid md:grid-cols-2 gap-6">
        {careers?.map((career) => (
          <div
            key={career.id}
            className="bg-gray-200 rounded-xl shadow-md p-7  hover:shadow-lg transition"
          >
            {/* TITLE */}

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {career.title}
            </h2>

            {/* INFO */}

            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt size={12} />
                {career.location}
              </span>

              <span className="flex items-center gap-1">
                <FaBriefcase size={12} />
                {career.experience}
              </span>

              <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-xs">
                {career.employmentType}
              </span>
            </div>

            {/* SKILLS */}

            <div className="flex flex-wrap gap-2 mb-3">
              {career.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* OPENINGS */}

            <p className="text-sm text-gray-600 mb-4">
              openings: {career.positionCount}
            </p>

            {/* ACTIONS */}

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/careers/view/${career.id}`)}
                className="bg-green-600 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm hover:bg-green-700 cursor-pointer"
              >
                <FaEye size={13} />
                View
              </button>

              <button
                onClick={() => navigate(`/admin/careers/edit/${career.id}`)}
                className="bg-blue-600 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm hover:bg-blue-700 cursor-pointer"
              >
                <FaEdit size={13} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(career.id)}
                className="bg-red-600 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm hover:bg-red-700 cursor-pointer"
              >
                <FaTrash size={13} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
