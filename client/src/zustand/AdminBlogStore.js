import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAdminBlogStore = create((set) => ({
  blogs: [],
  loading: false,
  error: null,

  // ================= GET ALL =================
  fetchBlogs: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/blogs/admin/all");
      set({ blogs: res.data.data || res.data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch blogs",
      });
    }
  },

  // ================= CREATE =================
  createBlog: async (data) => {
    return await api.post("/blogs", data);
  },

  // ================= UPDATE =================
  updateBlog: async (id, data) => {
    return await api.put(`/blogs/${id}`, data);
  },

  // ================= DELETE =================
  deleteBlog: async (id) => {
    return await api.delete(`/blogs/${id}`);
  },

  // ================= GET BY SLUG =================
  getBlogBySlug: async (slug) => {
    return await api.get(`/blogs/${slug}`);
  },
}));

export default useAdminBlogStore;
