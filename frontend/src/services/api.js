import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api"),
  timeout: 20000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("adminToken")) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
        window.location.assign("/admin/login");
      }
    }
    return Promise.reject(error);
  }
);

export default API;
