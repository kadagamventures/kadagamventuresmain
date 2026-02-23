import axios from "./axios";

export const invoiceAPI = {
    create: (data) => axios.post("/invoice/create-invoice", data),
    getAll: (page = 1, limit = 10) =>
        axios.get(`/invoice/getAllInvoice?page=${page}&limit=${limit}`),
    getById: (id) => axios.get(`/invoice/getInvoiceById/${id}`),
    update: (id, data) =>
        axios.put(`/invoice/update-invoice/${id}`, data),
    delete: (id) => axios.delete(`/invoice/delete-invoice/${id}`),
    addPayment: (id, data) =>
        axios.post(`/invoice/add-payment/${id}`, data),
    generatePDF: (id) =>
        axios.post(`/invoice/generate-pdf/${id}`),
    sendEmail: (id) =>
        axios.post(`/invoice/send-email/${id}`),
    getSignedUrl: (id) =>
        axios.get(`/invoice/signed-url/${id}`),
};