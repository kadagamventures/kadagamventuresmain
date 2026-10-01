import React, { useEffect, useState } from "react";
import { useInvoiceStore } from "../../zustand/InvoiceStore";
import { Link } from "react-router-dom";
import { FaFilePdf, FaDownload } from "react-icons/fa6";
import { MdEmail, MdDelete, MdOutlinePreview } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusColors = {
    draft: "bg-gray-100 text-gray-600",
    sent: "bg-blue-100 text-blue-600",
    partial: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-600",
    overdue: "bg-red-100 text-red-600",
    cancelled: "bg-gray-400 text-white",
};

const InvoiceList = () => {
    const {
        invoices,
        fetchInvoices,
        sendInvoice,
        deleteInvoice,
        generatePDF,
        downloadPDF,
        loading,
    } = useInvoiceStore();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);

    const [showEmailModal, setShowEmailModal] = useState(false);
const [invoiceToSend, setInvoiceToSend] = useState(null);


    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        fetchInvoices();
    }, []);

    const filteredInvoices = React.useMemo(() => {
        return invoices.filter((inv) => {

            const matchesSearch =
                inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
                inv.company?.companyName
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || inv.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [invoices, search, statusFilter]);

    const confirmDelete = async () => {
        try {
            await deleteInvoice(invoiceToDelete.id);
    
            toast.success("Invoice deleted successfully! 🗑️");
    
            setShowDeleteModal(false);
            setInvoiceToDelete(null);
        } catch (error) {
            console.error("Delete invoice error:", error);
    
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete invoice"
            );
        }
    };

    const confirmSendEmail = async () => {
        try {
            await sendInvoice(invoiceToSend.id);
    
            toast.success("Invoice sent successfully! 📧");
    
            setShowEmailModal(false);
            setInvoiceToSend(null);
        } catch (error) {
            console.error("Send invoice error:", error);
    
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to send invoice"
            );
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
        />
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Invoices
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search invoice or company..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-3 rounded-lg w-full md:w-80"
                />

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border p-3 rounded-lg w-full md:w-48"
                >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-4 text-left">Invoice #</th>
                            <th className="text-left">Company</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredInvoices.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-10 text-gray-400">
                                    No Invoices Found
                                </td>
                            </tr>
                        ) : (
                            filteredInvoices.map((inv) => (
                                <tr
                                    key={inv.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-4 font-semibold text-gray-800">
                                        {inv.invoiceNumber}
                                    </td>

                                    <td className="text-gray-600">
                                        {inv.company?.companyName}
                                    </td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[inv.status]}`}
                                        >
                                            {inv.status}
                                        </span>
                                    </td>

                                    <td className="font-semibold text-gray-800">
                                        ₹ {inv.grandTotal}
                                    </td>

                                    <td className="text-gray-500">
                                        {new Date(inv.invoiceDate).toLocaleDateString()}
                                    </td>

                                    <td className="text-center">
                                        <div className="flex justify-center gap-3 text-lg">

                                            <button
                                                title="Generate PDF"
                                                onClick={() => generatePDF(inv.id)}
                                                className="p-2 rounded-lg hover:bg-purple-100 text-purple-600 transition"
                                            >
                                                <FaFilePdf />
                                            </button>

                                            <button
                                                title="Download"
                                                onClick={() => downloadPDF(inv.id)}
                                                className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                                            >
                                                <FaDownload />
                                            </button>

                                            <button
    title="Send Email"
    onClick={() => {
        setInvoiceToSend(inv);
        setShowEmailModal(true);
    }}
    className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
>
    <MdEmail />
</button>

                                            <button
                                                title="Delete"
                                                onClick={() => {
                                                    setInvoiceToDelete(inv);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                                            >
                                                <MdDelete />
                                            </button>

                                            <Link
                                                title="View Details"
                                                to={`/admin/invoices/${inv.id}`}
                                                className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition"
                                            >
                                                <MdOutlinePreview />
                                            </Link>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-[400px] space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Confirm Delete
                        </h2>

                        <p className="text-gray-600 text-sm">
                            Are you sure you want to delete invoice{" "}
                            <span className="font-semibold">
                                {invoiceToDelete?.invoiceNumber}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Send Email Confirmation Modal */}
{showEmailModal && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-[400px] space-y-4">

            <h2 className="text-lg font-semibold text-gray-800">
                Confirm Send Email
            </h2>

            <p className="text-gray-600 text-sm">
                Are you sure you want to send invoice{" "}
                <span className="font-semibold">
                    {invoiceToSend?.invoiceNumber}
                </span>{" "}
                by email?
            </p>

            <div className="flex justify-end gap-3 pt-4">

                <button
                    onClick={() => {
                        setShowEmailModal(false);
                        setInvoiceToSend(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    Cancel
                </button>

                <button
                    onClick={confirmSendEmail}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Send Email
                </button>

            </div>
        </div>
    </div>
)}

            {/* Full Screen Loader */}
            {loading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">

                        {/* Spinner */}
                        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>

                        <p className="text-gray-700 font-medium">
                            Please wait... Processing PDF
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceList;