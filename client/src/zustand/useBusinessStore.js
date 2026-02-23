import { create } from "zustand";
import { businessAPI } from "../api/business.api";
import toast from "react-hot-toast";

export const useBusinessStore = create((set) => ({
    business: null,
    loading: false,

    fetchBusiness: async () => {
        set({ loading: true });
        try {
            const res = await businessAPI.get();
            set({ business: res.data || null });
        } catch (err) {
            console.error(err);
        } finally {
            set({ loading: false });
        }
    },

    saveBusiness: async (data) => {
        try {
            await businessAPI.save(data);
            toast.success("Business Settings Saved");
        } catch (err) {
            toast.error("Failed to save settings");
        }
    },
}));
