import { create } from "zustand";
import { pricingTableData } from "./dummyTableData";
// import axios from "axios";

// API (commented for now)
/*
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});
*/

const usePricingTable = create((set, get) => ({
    pricingData: [],
    loading: false,
    error: null,

    // Load dummy data for now
    fetchPricingTable: async () => {
        try {
            set({ loading: true, error: null });

            // using dummy data
            set({
                pricingData: pricingTableData,
                loading: false,
            });

            // When backend ready, uncomment this:
            /*
            const res = await api.get("/pricing-table");
            set({
                pricingData: res.data,
                loading: false,
            });
            */
        } catch (err) {
            set({
                error: err.message,
                loading: false,
            });
        }
    },

    // Optional: clear data
    clearPricingTable: () => set({ pricingData: [] }),
}));

export default usePricingTable;
