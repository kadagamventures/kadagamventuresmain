import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAdminCareerStore from "../../../zustand/useAdminCareerStore";

const inputBase = `
  w-full px-4 py-2.5 
  bg-white border border-gray-300 rounded-lg 
  text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
  transition-all duration-200
  disabled:opacity-60 disabled:cursor-not-allowed
`;

const textareaBase = `
  w-full px-4 py-3 min-h-[120px]
  bg-white border border-gray-300 rounded-lg 
  text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
  transition-all duration-200
  resize-y
`;

const labelBase = "block text-sm font-medium text-gray-700 mb-1.5";

export default function AdminAddCareer() {
  const navigate = useNavigate();
  const { createCareer } = useAdminCareerStore();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    experience: "",
    employmentType: "",
    overview: "",
    responsibilities: "",
    skills: "",
    whatWeOffer: "",
    howToApply: "",
    positionCount: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...form,
        responsibilities: form.responsibilities
          .trim()
          .split("\n")
          .filter(Boolean),
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        whatWeOffer: form.whatWeOffer.trim().split("\n").filter(Boolean),
      };

      await createCareer(payload);

      toast.success("Career opportunity created successfully!", {
        position: "top-right",
        autoClose: 4000,
      });

      setTimeout(() => {
        navigate("/admin/careers");
      }, 800);
    } catch (err) {
      toast.error(err?.message || "Failed to create career", {
        position: "top-right",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 py-1 px-1 sm:px-8">
      <ToastContainer limit={3} />

      <div className="">
        {/* Card */}
        <div className="bg-white overflow-hidden">
          {/* Header */}
          <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between ">
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Career Opportunity
            </h2>

            <button
              type="button"
              onClick={() => navigate("/admin/careers")}
              className="p-2 rounded-full hover:bg-white/80 transition-colors"
              aria-label="Close"
            >
              <AiOutlineClose
                size={22}
                className="text-gray-600 hover:text-gray-900"
              />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-7 space-y-7">
            {/* Grid for first row fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className={labelBase}>
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="location" className={labelBase}>
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  placeholder="e.g. Bengaluru, KA | Remote | Hybrid"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className={inputBase}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="experience" className={labelBase}>
                  Experience <span className="text-red-500">*</span>
                </label>
                <input
                  id="experience"
                  name="experience"
                  placeholder="e.g. 3–6 years"
                  value={form.experience}
                  onChange={handleChange}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="employmentType" className={labelBase}>
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <input
                  id="employmentType"
                  name="employmentType"
                  placeholder="Full-time / Contract / Internship"
                  value={form.employmentType}
                  onChange={handleChange}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="positionCount" className={labelBase}>
                  Number of Openings
                </label>
                <input
                  id="positionCount"
                  name="positionCount"
                  type="number"
                  min="1"
                  value={form.positionCount}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>
            </div>

            {/* Textareas */}
            <div className="space-y-7">
              <div>
                <label htmlFor="overview" className={labelBase}>
                  Job Overview
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  placeholder="Brief description of the role and its impact..."
                  value={form.overview}
                  onChange={handleChange}
                  rows={4}
                  className={textareaBase}
                />
              </div>

              <div>
                <label htmlFor="skills" className={labelBase}>
                  Required Skills (comma separated)
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  placeholder="React, TypeScript, Tailwind CSS, Zustand, Git..."
                  value={form.skills}
                  onChange={handleChange}
                  rows={3}
                  className={textareaBase}
                />
              </div>

              <div>
                <label htmlFor="responsibilities" className={labelBase}>
                  Key Responsibilities (one per line)
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  placeholder="• Architect scalable frontend solutions\n• Mentor junior developers\n• ..."
                  value={form.responsibilities}
                  onChange={handleChange}
                  rows={6}
                  className={textareaBase}
                />
              </div>

              <div>
                <label htmlFor="whatWeOffer" className={labelBase}>
                  What We Offer
                </label>
                <textarea
                  id="whatWeOffer"
                  name="whatWeOffer"
                  placeholder="• Competitive salary & ESOPs\n• Health insurance\n• Flexible hours\n..."
                  value={form.whatWeOffer}
                  onChange={handleChange}
                  rows={5}
                  className={textareaBase}
                />
              </div>

              <div>
                <label htmlFor="howToApply" className={labelBase}>
                  How to Apply
                </label>
                <textarea
                  id="howToApply"
                  name="howToApply"
                  placeholder="Send your resume to careers@company.com with subject line..."
                  value={form.howToApply}
                  onChange={handleChange}
                  rows={3}
                  className={textareaBase}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => navigate("/admin/careers")}
                disabled={saving}
                className="
      px-6 py-3 mx-5 rounded-lg font-medium
      text-gray-700 bg-gray-100
      hover:bg-gray-200
      focus:outline-none focus:ring-2 focus:ring-gray-400/40
      disabled:opacity-60 disabled:cursor-not-allowed
      transition-all duration-200
    "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className={`
                  px-8 py-3 rounded-lg font-medium text-white
                  bg-gradient-to-r from-indigo-600 to-indigo-700
                  hover:from-indigo-700 hover:to-indigo-800
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed
                  shadow-md hover:shadow-lg
                  transition-all duration-200
                `}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Career"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
