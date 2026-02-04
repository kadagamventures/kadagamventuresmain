import { create } from "zustand"
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    location: "",
    currentSalary: "",
    expectedSalary: "",
    experience: "",
    isImmediateJoiner: "", // boolean true/false
    noticePeriod: "",
    // joiningDays: "",
    resume: null,
}

const useJobApplyStore = create((set, get) => ({
    form: initialForm,
    loading: false,
    success: false,
    error: null,

    // ================= SET FIELD =================
    setField: (field, value) =>
        set((state) => ({
            form: { ...state.form, [field]: value },
        })),

    // ================= RESET =================
    resetForm: () =>
        set({
            form: initialForm,
            loading: false,
            success: false,
            error: null,
        }),

    // ================= SUBMIT =================
    submitApplication: async (jobId) => {
        const { form } = get()

        console.log()

        try {
            set({ loading: true, error: null, success: false })

            if (!form.resume) throw new Error("Resume is required")

            const formData = new FormData()

            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value)
            })

            // ✅ correct endpoint
            await api.post(`/careers/${jobId}/apply`, formData)

            set({ loading: false, success: true })

            setTimeout(() => get().resetForm(), 1500)

        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || err.message,
            })
        }
    },
}))

export default useJobApplyStore
