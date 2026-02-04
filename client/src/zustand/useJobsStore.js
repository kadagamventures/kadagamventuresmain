import { create } from "zustand"
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useJobsStore = create((set, get) => ({
    // ================= STATE =================
    jobs: [],
    searchQuery: "",
    loading: false,
    error: null,

    // ================= ACTIONS =================

    setSearchQuery: (value) =>
        set({ searchQuery: value }),

    // ✅ REAL API ONLY
    loadJobs: async () => {
        try {
            set({ loading: true, error: null })

            const res = await api.get("/careers")

            set({
                jobs: res.data.data || res.data,
                loading: false,
            })
        } catch (err) {
            set({
                error: err.response?.data?.message || "Failed to load jobs",
                loading: false,
            })
        }
    },

    // ================= DERIVED =================

    filteredJobs: () => {
        const { jobs, searchQuery } = get()

        if (!searchQuery.trim()) return jobs

        return jobs.filter((job) =>
            job.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    },
}))

export default useJobsStore
