import React, { useEffect } from "react";
import { FiX, FiClock, FiLoader, FiFileText, FiCalendar } from "react-icons/fi";
import useAdminSubscriberStore from "../../zustand/useAdminSubscriberStore";

export default function BroadcastHistoryModal({ onClose }) {
  const { companyUpdates, fetchCompanyUpdates, loadingUpdates } =
    useAdminSubscriberStore();

  useEffect(() => {
    fetchCompanyUpdates();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-indigo-100 p-2">
              <FiClock className="text-indigo-600" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Broadcast History
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto">
          {loadingUpdates ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <FiLoader className="h-8 w-8 animate-spin text-indigo-500 mb-3" />
              <p className="text-sm">Loading broadcast history...</p>
            </div>
          ) : companyUpdates?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <div className="rounded-full bg-gray-100 p-4 mb-4">
                <FiCalendar className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-700">
                No broadcasts sent yet
              </p>
              <p className="mt-2 text-sm text-gray-500">
                When you send a company update, it will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {companyUpdates.map((update) => (
                <div
                  key={update.id}
                  className="group p-6 hover:bg-gray-50/70 transition-colors duration-150"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="font-medium text-gray-900 truncate">
                          {update.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                          Sent
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {update.message}
                      </p>

                      {update.pdfUrl && (
                        <a
                          href={update.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 hover:underline mt-1"
                        >
                          <FiFileText size={15} />
                          <span>
                            {update.pdfName ||
                              update.pdfUrl.split("/").pop() ||
                              "Attached PDF"}
                          </span>
                        </a>
                      )}
                    </div>

                    <div className="shrink-0 text-right">
                      <time className="text-xs text-gray-500">
                        {new Date(update.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer (optional - can add total count or refresh) */}
        {!loadingUpdates && companyUpdates?.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 text-sm text-gray-600 flex justify-between items-center">
            <span>
              Showing {companyUpdates.length}{" "}
              {companyUpdates.length === 1 ? "broadcast" : "broadcasts"}
            </span>
            <button
              onClick={fetchCompanyUpdates}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1.5"
            >
              <FiLoader size={14} />
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}