import { create } from "zustand"
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const initialForm = {
    firstName: "",
    email: "",
    company: "",
    projectDetails: "",
}

const useServiceContactStore = create((set, get) => ({
    // ===== STATE =====
    form: initialForm,
    loading: false,
    success: false,
    error: null,

    // ===== ACTIONS =====

    setField: (field, value) =>
        set((state) => ({
            form: { ...state.form, [field]: value },
        })),

    resetForm: () =>
        set({
            form: initialForm,
            loading: false,
            success: false,
            error: null,
        }),

    submitForm: async () => {
        const { form } = get()

        try {
            set({ loading: true, error: null, success: false })

            // validation
            if (!form.firstName || !form.email || !form.projectDetails) {
                throw new Error("Please fill all required fields")
            }

            // API
            await api.post("/work-together", form)

            set({ loading: false, success: true })

            setTimeout(() => get().resetForm(), 1500)

        } catch (err) {
            set({
                loading: false,
                error: err.message || "Submission failed",
            })
        }
    },
}))

export default useServiceContactStore
