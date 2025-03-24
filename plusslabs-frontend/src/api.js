import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000", // Backend URL
    withCredentials: true, // Important for authentication
});

export default API;
