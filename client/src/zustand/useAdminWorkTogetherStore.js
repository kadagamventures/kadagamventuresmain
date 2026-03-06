import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "./useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAdminWorkTogetherStore = create((set) => ({

  workRequests: [],
  loading: false,

  // GET all requests
  // fetchWorkRequests: async () => {
  //   try {
  //     set({ loading: true });

  //     const res = await api.get("/work-together");

  //     set({
  //       workRequests: res.data.data || [],
  //     });

  //   } catch (err) {
  //     toast.error("Failed to fetch work requests");
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
  fetchWorkRequests: async () => {
    try {
      set({ loading: true });
  
      const res = await api.get("/work-together");
  
      set({
        workRequests: res.data.data || [],
      });
  
    } catch (err) {
  
      // ✅ Token expired check
      if (err.response?.data?.message === "Token expired or invalid") {
        //localStorage.removeItem("adminToken"); // optional
        window.location.href = "/admin/login";
        return;
      }
  
      toast.error("Failed to fetch work requests");
  
    } finally {
      set({ loading: false });
    }
  },

  // DELETE request
  deleteWorkRequest: async (id) => {
    try {

      await api.delete(`/work-together/${id}`);

      set((state) => ({
        workRequests: state.workRequests.filter(
          (item) => item._id !== id
        ),
      }));

      toast.success("Deleted successfully");

    } catch (err) {
      toast.error("Delete failed");
    }
  },

}));

export default useAdminWorkTogetherStore;