import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function AdminEditCareer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { careers, fetchCareers, updateCareer } = useAdminCareerStore();

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (careers.length === 0) {
        await fetchCareers();
      }
  
      const career = careers.find((c) => c.id === Number(id));
  
      if (career) {
        setForm({
          title: career.title || "",
          location: career.location || "",
          experience: career.experience || "",
          employmentType: career.employmentType || "",
          overview: career.overview || "",
          responsibilities: (career.responsibilities || []).join("\n"),
          skills: (career.skills || []).join(", "),
          whatWeOffer: (career.whatWeOffer || []).join("\n"),
          howToApply: career.howToApply || "",
          positionCount: career.positionCount || 1,
        });
      }
    };
  
    load();
  }, [careers, fetchCareers, id]);

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50/70 flex items-center justify-center">
        <div className="text-gray-500 text-lg animate-pulse">
          Loading career details...
        </div>
      </div>
    );
  }

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

      await updateCareer(id, payload);

      toast.success("Career updated successfully!", {
        position: "top-right",
        autoClose: 4000,
      });

      setTimeout(() => {
        navigate("/admin/careers");
      }, 800);
    } catch (err) {
      toast.error(err?.message || "Failed to update career", {
        position: "top-right",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 py-3 px-3 ">
      <ToastContainer limit={3} />

      <div className="">
        <div className="bg-white border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Career Opportunity
              {form?.title && <span className=" ml-2">— {form.title}</span>}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className={labelBase}>
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
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

            <div className="space-y-7">
              <div>
                <label htmlFor="overview" className={labelBase}>
                  Job Overview
                </label>
                <textarea
                  id="overview"
                  name="overview"
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
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Tailwind CSS, Node.js..."
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
                  value={form.howToApply}
                  onChange={handleChange}
                  rows={3}
                  className={textareaBase}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/careers")}
                className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
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
                  transition-all duration-200 flex items-center gap-2
                `}
              >
                {saving ? (
                  <>
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
                    Saving...
                  </>
                ) : (
                  "Update Career"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
    