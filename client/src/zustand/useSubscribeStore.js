import { create } from "zustand"
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const useSubscribeStore = create((set, get) => ({
    // ===== STATE =====
    email: "",
    loading: false,
    success: false,
    error: null,

    // ===== ACTIONS =====
    setEmail: (value) => set({ email: value }),

    reset: () =>
        set({
            email: "",
            loading: false,
            success: false,
            error: null,
        }),

    subscribe: async () => {
        const { email } = get()

        try {
            set({ loading: true, error: null, success: false })

            // basic validation
            if (!email) throw new Error("Email is required")

            const emailRegex = /^\S+@\S+\.\S+$/
            if (!emailRegex.test(email)) throw new Error("Invalid email")

            // ===== API =====
            await api.post("/subscribe", { email })

            set({
                loading: false,
                success: true,
                email: "",
            })

        } catch (err) {
            set({
                loading: false,
                error: err.message || "Subscription failed",
            })
        }
    },
}))

export default useSubscribeStore
