// import { create } from "zustand";
// import axios from "axios";
// import useAuthStore from "./useAuthStore";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // const useDashboardStore = create((set) => ({
// //   stats: null,
// //   loading: false,

// //   fetchStats: async () => {
// //     try {
// //       set({ loading: true });

// //       const res = await api.get("/admin/dashboard-stats");

// //       // ✅ FIX HERE
// //       set({
// //         stats: res.data.data,
// //       });
// //     } catch (err) {
// //       console.error("Dashboard fetch error:", err);
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },
// // }));
// const useDashboardStore = create((set) => ({
//   stats: null,
//   loading: false,

//   fetchStats: async () => {
//     try {
//       set({ loading: true });

//       const res = await api.get("/admin/dashboard-stats");

//       set({
//         stats: res.data.data,
//       });

//     } catch (err) {
//       console.error("Dashboard fetch error:", err);

//       // ✅ If token expired → redirect to login
//       if (
//         err.response?.data?.message === "Token expired or invalid"
//       ) {
       
//         window.location.href = "/admin/login";
//       }

//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useDashboardStore;

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
  leadSummary: null, // ✅ new state
  loading: false,

  fetchStats: async () => {
    try {
      set({ loading: true });

      // ✅ call both APIs together
      const [dashboardRes, leadSummaryRes] = await Promise.all([
        api.get("/admin/dashboard-stats"),
        api.get("/leads/stats/summary"),
      ]);

      set({
        stats: dashboardRes.data.data,
        leadSummary: leadSummaryRes.data, // adjust if API structure differs
      });

    } catch (err) {
      console.error("Dashboard fetch error:", err);

      if (err.response?.data?.message === "Token expired or invalid") {
        window.location.href = "/admin/login";
      }

    } finally {
      set({ loading: false });
    }
  },
}));

export default useDashboardStore;