
import { create } from "zustand";
import { invoiceAPI } from "../api/invoice.api";
import toast from "react-hot-toast";

export const useInvoiceStore = create((set, get) => ({
    invoices: [],
    selectedInvoice: null,
    loading: false,

    fetchInvoices: async () => {
        const res = await invoiceAPI.getAll();
        set({ invoices: res.data.invoices || [] });
    },

    fetchInvoiceById: async (id) => {
        const res = await invoiceAPI.getById(id);
        set({ selectedInvoice: res.data });
    },

    createInvoice: async (data) => {
        await invoiceAPI.create(data);
        toast.success("Invoice Created");
        get().fetchInvoices();
    },

    updateInvoice: async (id, data) => {
        await invoiceAPI.update(id, data);
        toast.success("Invoice Updated");
        get().fetchInvoiceById(id);
    },

    deleteInvoice: async (id) => {
        await invoiceAPI.delete(id);
        toast.success("Invoice Deleted");
        get().fetchInvoices();
    },

    addPayment: async (id, data) => {
        await invoiceAPI.addPayment(id, data);
        toast.success("Payment Added");
        get().fetchInvoiceById(id);
    },
    generatePDF: async (id) => {
        set({ loading: true });

        try {
            await invoiceAPI.generatePDF(id);
            toast.success("PDF Generated");
        } catch (err) {
            toast.error("Failed to generate PDF");
            console.error(err);
        } finally {
            set({ loading: false });
        }
    },

    downloadPDF: async (id) => {
        set({ loading: true });

        try {
            const res = await invoiceAPI.getSignedUrl(id);
            window.open(res.data.url, "_blank");
        } catch (err) {
            toast.error("Download failed");
        } finally {
            set({ loading: false });
        }
    },

    sendInvoice: async (id) => {
        await invoiceAPI.sendEmail(id);
        toast.success("Invoice Sent");
        get().fetchInvoiceById(id);
    },
}));

