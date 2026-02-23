import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.kadagamventures.com/api",
    withCredentials: true,
});

export default axiosInstance;
