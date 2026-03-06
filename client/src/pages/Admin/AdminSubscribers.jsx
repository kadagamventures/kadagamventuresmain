import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiMail, FiX, FiPaperclip, FiLoader, FiClock } from "react-icons/fi";
import BroadcastHistoryModal from "./RecentBroadcasts";


import useAdminSubscriberStore from "../../zustand/useAdminSubscriberStore";

export default function AdminSubscribers() {
  const { subscribers, fetchSubscribers, sendCompanyUpdate, loading } =
    useAdminSubscriberStore();

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);


  const [form, setForm] = useState({ title: "", message: "" });
  const [pdf, setPdf] = useState(null);

  // Filter state
  const [filterStatus, setFilterStatus] = useState("all"); // "all" | "active" | "inactive"

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.message.trim()) {
      toast.error("Title and message are required");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("message", form.message);
      if (pdf) data.append("pdf", pdf);

      await sendCompanyUpdate(data);

      toast.success("Update sent successfully!");
      setShowModal(false);
      setForm({ title: "", message: "" });
      setPdf(null);
    } catch (err) {
      toast.error("Failed to send update");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setForm({ title: "", message: "" });
    setPdf(null);
  };

  // Filtered subscribers
  const filteredSubscribers = subscribers.filter((sub) => {
    if (filterStatus === "active") return sub.isActive;
    if (filterStatus === "inactive") return !sub.isActive;
    return true; // "all"
  });

  return (
    <div className="min-h-screen bg-gray-50/40 px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" theme="light" closeOnClick />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
      Subscribers
    </h2>
    <p className="mt-1.5 text-sm text-gray-600">
      Showing <strong>{filteredSubscribers.length}</strong> of{" "}
      <strong>{subscribers.length}</strong> subscribers
    </p>
  </div>

  {/* Buttons */}
  <div className="flex gap-3">

    {/* View History Button */}
    <button
      onClick={() => setShowHistoryModal(true)}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
    >
      <FiClock size={18} />
      View History
    </button>

    {/* Send Broadcast Button */}
    <button
      onClick={() => setShowModal(true)}
      className="inline-flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow-md shadow-indigo-200/50 transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-300/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
    >
      <FiMail size={18} />
      Send Broadcast
    </button>

  </div>
</div>


      {/* Filter Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Filter by status:</span>
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setFilterStatus("all")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              filterStatus === "all"
                ? "bg-indigo-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("active")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              filterStatus === "active"
                ? "bg-emerald-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus("inactive")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              filterStatus === "inactive"
                ? "bg-rose-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  Subscribed
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-gray-500">
                    <FiLoader className="inline animate-spin text-2xl" /> Loading...
                  </td>
                </tr>
              ) : filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-gray-500">
                    {subscribers.length === 0
                      ? "No subscribers found"
                      : `No ${filterStatus} subscribers found`}
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub, index) => (
                  <tr
                    key={sub._id}
                    className="group transition-colors hover:bg-gray-50/70"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {sub.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          sub.isActive
                            ? "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-600/20"
                            : "bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-600/20"
                        }`}
                      >
                        {sub.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showHistoryModal && (
  <BroadcastHistoryModal onClose={() => setShowHistoryModal(false)} />
)}


      {/* Modal (unchanged from previous version) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
            <button
              onClick={resetForm}
              className="absolute right-5 top-5 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>

            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Send Company Update
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Update: New Feature Release"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Dear subscribers,\n\nWe are excited to announce..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition resize-y"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Attach PDF (optional)
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 px-4 py-3 transition hover:border-indigo-400 hover:bg-indigo-50/30">
                  <FiPaperclip className="text-indigo-600" size={20} />
                  <span className="text-sm text-gray-700">
                    {pdf ? pdf.name : "Choose PDF file"}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
                  />
                </label>
                {pdf && (
                  <p className="mt-1.5 text-xs text-gray-500">
                    Selected: {pdf.name} ({(pdf.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 font-semibold text-white transition-all ${
                  submitting
                    ? "cursor-not-allowed bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-200/50 hover:shadow-lg hover:shadow-indigo-300/40"
                }`}
              >
                {submitting ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Update to All"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}