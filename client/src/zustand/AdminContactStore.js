import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore"; // 👈 IMPORTANT

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔐 Attach token automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const useAdminContactStore = create((set) => ({
  inquiries: [],
  loading: false,
  error: null,
  filter: "all",

  // fetchAll: async () => {
  //   try {
  //     set({ loading: true, error: null, filter: "all" });

  //     const res = await api.get("/inquiries");

  //     set({
  //       inquiries: res.data?.data || res.data, // safe handling
  //       loading: false,
  //     });
  //   } catch (err) {
  //     set({
  //       loading: false,
  //       error: err.response?.data?.message || "Failed to fetch inquiries",
  //     });
  //   }
  // },

  fetchAll: async () => {
    try {
      set({ loading: true, error: null, filter: "all" });
  
      const res = await api.get("/inquiries");
  
      set({
        inquiries: res.data?.data || res.data, // safe handling
        loading: false,
      });
  
    } catch (err) {
  
      // ✅ Token expired check
      if (err.response?.data?.message === "Token expired or invalid") {
        //localStorage.removeItem("adminToken"); // optional
        window.location.href = "/admin/login";
        return;
      }
  
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch inquiries",
      });
    }
  },

  fetchServices: async () => {
    try {
      set({ loading: true, error: null, filter: "services" });

      const res = await api.get("/inquiries/services");

      set({
        inquiries: res.data?.data || res.data,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch services",
      });
    }
  },

  fetchProducts: async () => {
    try {
      set({ loading: true, error: null, filter: "products" });

      const res = await api.get("/inquiries/products");

      set({
        inquiries: res.data?.data || res.data,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch products",
      });
    }
  },
}));

export default useAdminContactStore;
  