import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FaEye } from "react-icons/fa";

import useAdminWorkTogetherStore from "../../zustand/useAdminWorkTogetherStore";

export default function AdminWorkTogether() {
  const {
    workRequests,
    fetchWorkRequests,
    loading,
  } = useAdminWorkTogetherStore();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchWorkRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={4000} />

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Work Together Requests
        </h2>
        <p className="mt-2 text-gray-600">
          {workRequests.length} {workRequests.length === 1 ? "request" : "requests"} received
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-16">No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-24">View</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-3">
                      <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                      Loading requests...
                    </div>
                  </td>
                </tr>
              ) : workRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-500">
                    No work together requests found
                  </td>
                </tr>
              ) : (
                workRequests.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className="hover:bg-blue-50/60 transition-colors duration-150 cursor-pointer group"
                  >
                    <td className="px-6 py-4 text-gray-600 group-hover:text-blue-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-blue-700">
                      {item.firstName}
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs group-hover:text-blue-700">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600 group-hover:text-blue-700">
                      {item.company || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 group-hover:text-blue-700">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                        <FaEye size={16} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Request Details
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-500 hover:text-gray-800 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selected.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium break-all">{selected.email}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{selected.company || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1.5">Project Details</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
                    {selected.projectDetails || "No details provided"}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Submitted on{" "}
                    <span className="font-medium">
                      {new Date(selected.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}