import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAdminLeadStore = create((set) => ({
  leads: [],
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,

  // fetchLeads: async (params = {}) => {
  //   try {
  //     set({ loading: true });

  //     const res = await api.get("/leads", { params });

  //     set({
  //       leads: res.data.data,
  //       total: res.data.total,
  //       page: res.data.page,
  //       totalPages: res.data.totalPages,
  //     });

  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     set({ loading: false });
  //   }
  // },

  fetchLeads: async (params = {}) => {
    try {
      set({ loading: true });
  
      const res = await api.get("/leads", { params });
  
      set({
        leads: res.data.data,
        total: res.data.total,
        page: res.data.page,
        totalPages: res.data.totalPages,
      });
  
    } catch (err) {
      console.error(err);
  
      // ✅ Token expired check
      if (err.response?.data?.message === "Token expired or invalid") {
        //localStorage.removeItem("adminToken"); // optional
        window.location.href = "/admin/login";
      }
  
    } finally {
      set({ loading: false });
    }
  },

  createLead: async (formData) => {
    await api.post("/leads", formData);
  },

  updateLead: async (id, formData) => {
    await api.put(`/leads/${id}`, formData);
  },

  deleteLead: async (id) => {
    await api.delete(`/leads/${id}`);
    set((state) => ({
      leads: state.leads.filter((l) => l._id !== id),
    }));
  },

  getFileUrl: async (id) => {
    const res = await api.get(`/leads/${id}/file`);
    return res.data.fileUrl;
  },
}));

export default useAdminLeadStore;