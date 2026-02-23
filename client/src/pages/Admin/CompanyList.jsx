import React, { useEffect, useState } from "react";
import { useCompanyStore } from "../../zustand/useCompanyStore";
import CompanyForm from "../../components/CompanyForm";
import CreateInvoiceModal from "../../components/CreateInvoiceModal";

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { IoDocument } from "react-icons/io5";

const CompanyList = () => {
    const {
        companies,
        fetchCompanies,
        deleteCompany,
        setSelectedCompany
    } = useCompanyStore();

    const [showForm, setShowForm] = useState(false);
    const [showInvoiceForm, setShowInvoiceForm] = useState(false);


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState(null);

    const [search, setSearch] = useState("");
    const [stateFilter, setStateFilter] = useState("all");

    useEffect(() => {
        fetchCompanies();
    }, []);

    const filteredCompanies = React.useMemo(() => {
        return companies.filter((c) => {

            const matchesSearch =
                c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
                c.gstNumber?.toLowerCase().includes(search.toLowerCase()) ||
                c.panNumber?.toLowerCase().includes(search.toLowerCase()) ||
                c.email?.toLowerCase().includes(search.toLowerCase());

            const matchesState =
                stateFilter === "all" ||
                c.billingAddress?.state === stateFilter;

            return matchesSearch && matchesState;
        });
    }, [companies, search, stateFilter]);

    return (
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-semibold">Companies</h1>

                <button
                    onClick={() => {
                        setSelectedCompany(null);
                        setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Company
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search company, GST, PAN, email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-3 rounded-lg w-full md:w-80"
                />

                {/* State Filter */}
                <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="border p-3 rounded-lg w-full md:w-56"
                >
                    <option value="all">All States</option>

                    {[...new Set(
                        companies
                            .map((c) => c.billingAddress?.state)
                            .filter(Boolean)
                    )].map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-4 text-left">Company</th>
                            <th>GST</th>
                            <th>PAN</th>
                            <th>Contact</th>
                            <th>Location</th>
                            <th>Created</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {companies.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center p-10 text-gray-400">
                                    No Companies Found
                                </td>
                            </tr>
                        ) : (
                            filteredCompanies.map((c) => (
                                <tr
                                    key={c._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    {/* Company Name + Legal */}
                                    <td className="p-4">
                                        <div className="font-semibold text-gray-800">
                                            {c.companyName}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {c.legalName}
                                        </div>
                                    </td>

                                    {/* GST */}
                                    <td className="text-gray-600">
                                        {c.gstNumber || "-"}
                                    </td>

                                    {/* PAN */}
                                    <td className="text-gray-600">
                                        {c.panNumber || "-"}
                                    </td>

                                    {/* Contact */}
                                    <td>
                                        <div className="text-gray-700">{c.email}</div>
                                        <div className="text-xs text-gray-500">
                                            {c.phone}
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="text-gray-600">
                                        {c.billingAddress?.city},{" "}
                                        {c.billingAddress?.state}
                                    </td>

                                    {/* Created Date */}
                                    <td className="text-gray-500">
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </td>

                                    {/* Actions */}
                                    <td className="text-center">
                                        <div className="flex justify-center gap-3 text-lg">

                                            <button
                                                title="Edit"
                                                onClick={() => {
                                                    setSelectedCompany(c);
                                                    setShowForm(true);
                                                }}
                                                className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                                            >
                                                <MdModeEdit />
                                            </button>

                                            <button
                                                title="Delete"
                                                onClick={() => {
                                                    setCompanyToDelete(c);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                                            >
                                                <MdDelete />
                                            </button>

                                            <button
                                                title="Create Invoice"
                                                onClick={() => {
                                                    setSelectedCompany(c);
                                                    setShowInvoiceForm(true);
                                                }}
                                                className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                                            >
                                                <IoDocument />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <CompanyForm close={() => setShowForm(false)} />
            )}

            {showInvoiceForm && (
                <CreateInvoiceModal close={() => setShowInvoiceForm(false)} />
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/45 bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">
                            Confirm Delete
                        </h2>

                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                                {companyToDelete?.companyName}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setCompanyToDelete(null);
                                }}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    deleteCompany(companyToDelete._id);
                                    setShowDeleteModal(false);
                                    setCompanyToDelete(null);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyList;
