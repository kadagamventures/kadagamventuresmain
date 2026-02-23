import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "./useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const useAdminSubscriberStore = create((set) => ({
  subscribers: [],
  activeSubscribers: [],
  companyUpdates: [],
  loading: false,

  // GET all subscribers
  fetchSubscribers: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/admin/subscribers");
      set({ subscribers: res.data.data || res.data });
    } catch (err) {
      console.log(err)
      toast.error("Failed to fetch subscribers");
    } finally {
      set({ loading: false });
    }
  },

  // GET active subscribers
  fetchActiveSubscribers: async () => {
    try {
      const res = await api.get("/admin/subscribers/active");
      set({ activeSubscribers: res.data.data || res.data });
    } catch {
      toast.error("Failed to fetch active subscribers");
    }
  },

  // SEND company update
  sendCompanyUpdate: async (formData) => {
    try {
      await api.post("/company-updates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Company update sent successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send update");
      throw err;
    }
  },

  // GET updates
  fetchCompanyUpdates: async () => {
    try {
      const res = await api.get("/company-updates/admin");
      set({ companyUpdates: res.data.data || res.data });
    } catch {
      toast.error("Failed to fetch company updates");
    }
  },
}));

export default useAdminSubscriberStore;
