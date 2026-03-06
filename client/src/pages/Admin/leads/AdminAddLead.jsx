import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAdminLeadStore from "../../../zustand/useAdminLeadStore";

export default function AdminAddLead() {
  const navigate = useNavigate();
  const { createLead } = useAdminLeadStore();

  const [form, setForm] = useState({
    leadName: "",
    totalLeads: "",
    source: "",
    leadGeneratedDate: "",
    campaignName: "",
    costPerLead: "",
    totalCost: "",
    notes: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.leadName.trim() || !form.totalLeads || !form.leadGeneratedDate) {
      toast.error("Please fill required fields");
      return;
    }

    const formData = new FormData();

    // Append all text/number/date fields
    Object.entries(form).forEach(([key, value]) => {
      if (value !== "") formData.append(key, value);
    });

    if (file) {
      formData.append("file", file);
    }

    try {
      await createLead(formData);
      toast.success("Lead batch created successfully");
      navigate("/admin/leads");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to create lead batch"
      );
    }
  };

  return (
    <div className="p-1 max-w-full mx-auto">
      <ToastContainer position="top-right" autoClose={4000} />

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Create New Lead Batch
        </h2>
        <button
          onClick={() => navigate("/admin/leads")}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to List
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required fields first */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lead Name <span className="text-red-500">*</span>
            </label>
            <input
              name="leadName"
              value={form.leadName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Summer 2025 Campaign"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Leads <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="totalLeads"
              value={form.totalLeads}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="1250"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lead Generated Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="leadGeneratedDate"
              value={form.leadGeneratedDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <input
              name="source"
              value={form.source}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Facebook Ads, Google, Website, Referral..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name
            </label>
            <input
              name="campaignName"
              value={form.campaignName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="FB_LeadGen_Summer25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost per Lead (₹)
            </label>
            <input
              type="number"
              step="0.01"
              name="costPerLead"
              value={form.costPerLead}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="45.50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Cost (₹)
            </label>
            <input
              type="number"
              step="0.01"
              name="totalCost"
              value={form.totalCost}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="56875.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes / Remarks
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Any additional context, tags, performance notes..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Lead File (CSV/Excel)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/leads")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
          >
            Create Lead Batch
          </button>
        </div>
      </form>
    </div>
  );
}
