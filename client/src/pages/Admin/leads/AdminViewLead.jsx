import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAdminLeadStore from "../../../zustand/useAdminLeadStore";

export default function AdminViewLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, fetchLeads, getFileUrl } = useAdminLeadStore();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (leads.length === 0) {
  //     fetchLeads();
  //   }

  //   const found = leads.find((l) => l._id === id);
  //   if (found) {
  //     setLead(found);
  //     setLoading(false);
  //   } else if (leads.length > 0) {
  //     // If leads are loaded but not found → probably invalid id
  //     setLoading(false);
  //   }
  // }, [leads, id, fetchLeads]);

  useEffect(() => {
    const loadLead = async () => {
      if (leads.length === 0) {
        await fetchLeads();
      }
    };
  
    loadLead();
  }, []);
  
  useEffect(() => {
    const found = leads.find((l) => l.id === Number(id));
  
    if (found) {
      setLead(found);
    }
  
    setLoading(false);
  }, [leads, id]);
  
  const handleDownload = async () => {
    if (!lead?.fileKey) return;

    try {
      const url = await getFileUrl(id);
      window.open(url, "_blank");
      toast.success("Downloading file...");
    } catch (err) {
      console.log(err)  
      toast.error("Failed to get download link");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500 min-h-[60vh]">
        Loading lead details...
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-10 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Lead Batch Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The requested lead batch could not be found.
        </p>
        <button
          onClick={() => navigate("/admin/leads")}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700"
        >
          Back to Lead Batches
        </button>
      </div>
    );
  }

  return (
    <div className="p-1 max-w-full mx-auto">
      <ToastContainer position="top-right" autoClose={4000} />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{lead.leadName}</h2>
          <p className="text-gray-500 mt-1">
            Lead Batch • Created{" "}
            {new Date(lead.createdAt).toLocaleDateString("en-IN")}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/admin/leads/edit/${id}`)}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Edit Batch
          </button>
          <button
            onClick={() => navigate("/admin/leads")}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden ">
        <div className="p-8 space-y-8">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DetailItem
              label="Total Leads"
              value={lead.totalLeads.toLocaleString()}
              bold
            />
            <DetailItem
              label="Generated Date"
              value={
                lead.leadGeneratedDate
                  ? new Date(lead.leadGeneratedDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "—"
              }
            />
            <DetailItem label="Source" value={lead.source || "—"} />
            <DetailItem
              label="Campaign Name"
              value={lead.campaignName || "—"}
            />
            <DetailItem
              label="Cost per Lead"
              value={
                lead.costPerLead != null
                  ? `₹${lead.costPerLead.toLocaleString("en-IN")}`
                  : "—"
              }
            />
            <DetailItem
              label="Total Cost"
              value={
                lead.totalCost != null
                  ? `₹${lead.totalCost.toLocaleString("en-IN")}`
                  : "—"
              }
            />
          </div>

          {/* Notes */}
          {lead.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Notes / Remarks
              </h3>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 whitespace-pre-wrap">
                {lead.notes}
              </div>
            </div>
          )}

          {/* File Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Attached File
            </h3>
            {lead.fileKey && lead.fileName ? (
              <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{lead.fileName}</p>
                  {lead.fileSize && (
                    <p className="text-sm text-gray-500">
                      {(lead.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
                >
                  Download File
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center text-gray-500">
                No file attached to this lead batch
              </div>
            )}
          </div>

          {/* Status & Metadata */}
          <div className="pt-6 border-t border-gray-200 grid grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-gray-500">Status:</span>{" "}
              <span
                className={`font-medium ${
                  lead.status === "active" ? "text-green-700" : "text-gray-700"
                }`}
              >
                {lead.status?.toUpperCase() || "UNKNOWN"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Last Updated:</span>{" "}
              <span className="font-medium">
                {new Date(lead.updatedAt).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, bold = false }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
      <dd
        className={`text-base ${
          bold ? "font-bold text-gray-900" : "text-gray-900"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
