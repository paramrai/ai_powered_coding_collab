import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.error("API URL is not defined. Please check VITE_API_URL in your environment variables.");
}

const axiosInstance = axios.create({
  baseURL: baseURL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
