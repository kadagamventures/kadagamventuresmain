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

const useDashboardStore = create((set) => ({
  stats: null,
  loading: false,

  fetchStats: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/admin/dashboard-stats");

      // ✅ FIX HERE
      set({
        stats: res.data.data,
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDashboardStore;
