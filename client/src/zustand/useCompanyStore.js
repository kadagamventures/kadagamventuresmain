// src/zustand/useCompanyStore.js
import { create } from "zustand";
import { companyAPI } from "../api/company.api";
import toast from "react-hot-toast";

export const useCompanyStore = create((set, get) => ({
    companies: [],
    total: 0,
    loading: false,
    selectedCompany: null,

    fetchCompanies: async (page = 1) => {
        set({ loading: true });
        try {
            const res = await companyAPI.getAll(page);

            set({
                companies: res.data.companies || [],
                total: res.data.total || 0,
            });
        } catch (err) {
            toast.error("Failed to fetch companies");
        } finally {
            set({ loading: false });
        }
    },

    createCompany: async (data) => {
        try {
            await companyAPI.create(data);
            toast.success("Company Created");
            get().fetchCompanies();
        } catch (err) {
            toast.error("Failed to create company");
        }
    },

    updateCompany: async (id, data) => {
        try {
            await companyAPI.update(id, data);
            toast.success("Company Updated");
            get().fetchCompanies();
        } catch (err) {
            toast.error("Failed to update company");
        }
    },

    deleteCompany: async (id) => {
        try {
            await companyAPI.delete(id);
            toast.success("Company Deleted");
            get().fetchCompanies();
        } catch (err) {
            toast.error("Failed to delete company");
        }
    },

    setSelectedCompany: (company) =>
        set({ selectedCompany: company }),
}));
