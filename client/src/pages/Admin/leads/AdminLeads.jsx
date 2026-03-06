import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAdminLeadStore from "../../../zustand/useAdminLeadStore";

export default function AdminLeads() {
  const {
    leads,
    fetchLeads,
    deleteLead,
    getFileUrl,
    loading,
    page,
    totalPages,
  } = useAdminLeadStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleArchive = async (id) => {
    if (!window.confirm("Delete this lead batch?")) return;
    try {
      await deleteLead(id); // assuming this sets status = "archived"
      toast.success("Lead batch deleted");
    } catch (err) {
      console.log(err);
      toast.error("Could not delete lead batch");
    }
  };

  const handleDownload = async (id) => {
    try {
      const url = await getFileUrl(id);

      // open in new tab (download)
      window.open(url, "_blank");
    } catch (err) {
      console.log(err);
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="p-3">
      <ToastContainer position="top-right" autoClose={4000} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lead Batches</h2>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/leads/history")}
            className="bg-purple-800 hover:bg-purple-900 text-white px-5 py-2.5 rounded-lg font-medium hover:cursor-pointer"
          >
            Lead History
          </button>

          <button
            onClick={() => navigate("/admin/leads/add")}
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2.5 rounded-lg font-medium hover:cursor-pointer"
          >
            + Add Lead Batch
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No lead batches found.
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-hidden ">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr className="text-sm font-semibold text-gray-700 bg-blue-100">
                <th className="p-4">Name</th>
                <th className="p-4">Leads</th>
                <th className="p-4">Source</th>
                <th className="p-4">Campaign</th>
                <th className="p-4">Date</th>

                <th className="p-4 text-center">Download</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className=" hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/admin/leads/view/${lead._id}`)}
                >
                  <td className="p-4 font-medium">{lead.leadName}</td>
                  <td className="p-4">{lead.totalLeads.toLocaleString()}</td>
                  <td className="p-4">{lead.source}</td>
                  <td className="p-4">{lead.campaignName || "—"}</td>
                  <td className="p-4">
                    {lead.leadGeneratedDate
                      ? new Date(lead.leadGeneratedDate).toLocaleDateString(
                          "en-IN"
                        )
                      : "—"}
                  </td>
                  <td
                    className="p-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {lead.fileKey ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(lead._id);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Download
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No File</span>
                    )}
                  </td>
                  <td
                    className="p-4 text-right flex gap-4 justify-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/leads/edit/${lead._id}`);
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>

                    {lead.status === "active" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchive(lead._id);
                        }}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => fetchLeads({ page: page - 1, limit: 10 })}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Prev
        </button>

        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => fetchLeads({ page: page + 1, limit: 10 })}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
