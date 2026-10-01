import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInvoiceStore } from "../../../zustand/InvoiceStore";
import AddPaymentModal from "../InvoiceDetails/AddPaymentModal";
import EditInvoiceModal from "../InvoiceDetails/EditInvoiceModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceDetails = () => {
    const { id } = useParams();
    const {
        selectedInvoice,
        fetchInvoiceById,
        deleteInvoice,
        sendInvoice,
        downloadPDF,
        generatePDF,
    } = useInvoiceStore();

    const [showPayment, setShowPayment] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        fetchInvoiceById(id);
    }, [id]);

    if (!selectedInvoice) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 space-y-6">

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

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    {selectedInvoice.invoiceNumber}
                </h1>

                <div className="space-x-3">
                    <button onClick={() => setShowEdit(true)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded">
                        Edit
                    </button>

                    <button onClick={() => setShowPayment(true)}
                        className="bg-green-600 text-white px-3 py-1 rounded">
                        Add Payment
                    </button>

                    {/* <button onClick={() => generatePDF(id)}
                        className="bg-purple-600 text-white px-3 py-1 rounded">
                        Generate PDF
                    </button> */}
                    <button
    onClick={async () => {
        try {
            await generatePDF(id);
            toast.success("PDF generated successfully! 📄");
        } catch (error) {
            console.error("Generate PDF error:", error);

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to generate PDF"
            );
        }
    }}
    className="bg-purple-600 text-white px-3 py-1 rounded"
>
    Generate PDF
</button>

                    <button onClick={() => downloadPDF(id)}
                        className="bg-gray-700 text-white px-3 py-1 rounded">
                        Download
                    </button>

                    {/* <button onClick={() => sendInvoice(id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded">
                        Send
                    </button> */}
                    <button
    onClick={async () => {
        const confirmed = window.confirm(
            `Are you sure you want to send invoice ${selectedInvoice.invoiceNumber} by email?`
        );

        if (!confirmed) return;

        try {
            await sendInvoice(id);
            toast.success("Invoice sent successfully! 📧");
        } catch (error) {
            console.error("Send invoice error:", error);

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to send invoice"
            );
        }
    }}
    className="bg-blue-600 text-white px-3 py-1 rounded"
>
    Send
</button>

                    {/* <button onClick={() => deleteInvoice(id)}
                        className="bg-red-600 text-white px-3 py-1 rounded">
                        Delete
                    </button> */}
                    <button
    onClick={async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete invoice ${selectedInvoice.invoiceNumber}? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            await deleteInvoice(id);

            toast.success("Invoice deleted successfully! 🗑️");
        } catch (error) {
            console.error("Delete invoice error:", error);

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete invoice"
            );
        }
    }}
    className="bg-red-600 text-white px-3 py-1 rounded"
>
    Delete
</button>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded shadow grid grid-cols-3 gap-6">
                <div>
                    <p>Status</p>
                    <p className="font-semibold">{selectedInvoice.status}</p>
                </div>

                <div>
                    <p>Grand Total</p>
                    <p className="font-semibold">₹ {selectedInvoice.grandTotal}</p>
                </div>

                <div>
                    <p>Pending</p>
                    <p className="font-semibold text-red-600">
                        ₹ {selectedInvoice.pendingAmount}
                    </p>
                </div>
            </div>

            {/* Services */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="font-semibold mb-3">Services</h2>
                {selectedInvoice.services.map((s, i) => (
                    <div key={i} className="border-b py-2">
                        {s.serviceName} — ₹ {s.total}
                    </div>
                ))}
            </div>

            {/* Payments */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="font-semibold mb-3">Payments</h2>

                {selectedInvoice.payments.length === 0 && (
                    <p>No payments yet</p>
                )}

                {selectedInvoice.payments.map((p, i) => (
                    <div key={i} className="border-b py-2">
                        ₹ {p.amount} — {p.paymentMethod}
                    </div>
                ))}
            </div>

            {showPayment && (
                <AddPaymentModal
                    invoiceId={id}
                    close={() => setShowPayment(false)}
                />
            )}

            {showEdit && (
                <EditInvoiceModal
                    invoice={selectedInvoice}
                    close={() => setShowEdit(false)}
                />
            )}
        </div>
    );
};

export default InvoiceDetails;
