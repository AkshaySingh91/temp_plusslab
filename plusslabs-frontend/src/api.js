import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // Will be updated for production
    withCredentials: true, // Important for authentication
});

export default API;
