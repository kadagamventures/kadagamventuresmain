import { create } from "zustand"
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const initialForm = {
    fullName: "",
    contactNumber: "",
    email: "",
    inquiryAbout: "services",
}

const useContactStore = create((set, get) => ({
    // ===== STATE =====
    form: initialForm,
    loading: false,
    error: null,
    success: false,

    // ===== ACTIONS =====

    // handle all inputs
    setField: (field, value) =>
        set((state) => ({
            form: { ...state.form, [field]: value },
        })),

    // reset
    resetForm: () =>
        set({
            form: initialForm,
            loading: false,
            error: null,
            success: false,
        }),

    // submit
    submitForm: async () => {
        const { form } = get()

        try {
            set({ loading: true, error: null, success: false })

            // simple validation
            if (!form.fullName || !form.phone || !form.email) {
                throw new Error("Please fill all fields")
            }

            // ===== API CALL =====
            await api.post("/inquiries", form)

            set({
                loading: false,
                success: true,
            })

            // auto reset
            setTimeout(() => get().resetForm(), 1500)

        } catch (err) {
            set({
                loading: false,
                error: err.message || "Submission failed",
            })
        }
    },
}))

export default useContactStore
