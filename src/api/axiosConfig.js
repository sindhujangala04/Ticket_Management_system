import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081", // your backend port
  withCredentials: true // 🔥 REQUIRED for session
});

export default api;