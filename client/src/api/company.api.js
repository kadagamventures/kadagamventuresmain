import axios from "./axios";

export const companyAPI = {
    create: (data) => axios.post("/companies/create-company", data),
    getAll: (page = 1, limit = 10) =>
        axios.get(`/companies/getAllCompany?page=${page}&limit=${limit}`),
    getById: (id) => axios.get(`/companies/getCompanyById/${id}`),
    update: (id, data) =>
        axios.put(`/companies/update-company/${id}`, data),
    delete: (id) => axios.delete(`/companies/delete-company/${id}`),
};
