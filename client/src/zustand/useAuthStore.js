import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

/* =========================
   STORE (PERSISTED)
========================= */
const useAuthStore = create(
    persist(
        (set) => ({

            user: null,
            accessToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            /* =========================
               LOGIN
            ========================= */
            login: async (payload) => {
                try {
                    set({ loading: true, error: null });

                    const res = await api.post("/auth/login", payload);

                    const { admin, accessToken } = res.data;

                    set({
                        user: admin,
                        accessToken,
                        isAuthenticated: true,
                        loading: false
                    });

                    return res.data;

                } catch (err) {
                    set({
                        loading: false,
                        error: err.response?.data?.message || "Login failed"
                    });
                    throw err;
                }
            },

            /* =========================
               LOGOUT
            ========================= */
            logout: () => {
                set({
                    user: null,
                    accessToken: null,
                    isAuthenticated: false,
                    error: null
                });
            }

        }),
        {
            name: "admin-auth-storage"
        }
    )
);

export default useAuthStore;
