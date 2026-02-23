import axios from "./axios";

export const businessAPI = {
    get: () => axios.get("/business/get"),
    save: (data) => axios.post("/business/setup", data),
};
