import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const useAdminCareerStore = create((set, get) => ({
  careers: [],
  loading: false,
  error: null,

  // ================= FETCH =================
  // fetchCareers: async () => {
  //   try {
  //     set({ loading: true, error: null });

  //     const res = await api.get("/careers");

  //     set({
  //       careers: res.data.data || res.data,
  //       loading: false,
  //     });
  //   } catch (err) {
  //     set({
  //       loading: false,
  //       error: err.response?.data?.message || "Failed to fetch careers",
  //     });
  //   }
  // },
  fetchCareers: async () => {
    try {
      set({ loading: true, error: null });
  
      const res = await api.get("/careers");
  
      set({
        careers: res.data.data || res.data,
        loading: false,
      });
  
    } catch (err) {
  
      // ✅ Token expired check
      if (err.response?.data?.message === "Token expired or invalid") {
       // localStorage.removeItem("adminToken"); // optional
        window.location.href = "/admin/login";
        return;
      }
  
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch careers",
      });
    }
  },

  // ================= CREATE =================
  createCareer: async (data) => {
    try {
      const res = await api.post("/careers", data);
      get().fetchCareers();
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  },

  // ================= UPDATE =================
  updateCareer: async (id, data) => {
    try {
      const res = await api.put(`/careers/${id}`, data);
      get().fetchCareers();
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  },

  // ================= DELETE =================
  deleteCareer: async (id) => {
    try {
      const res = await api.delete(`/careers/${id}`);

      set({
        careers: get().careers.filter((c) => c._id !== id),
      });

      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  },
}));

export default useAdminCareerStore;
