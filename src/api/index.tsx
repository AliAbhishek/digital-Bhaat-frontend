// src/api/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 🔐 Request Interceptor: Attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ❌ Response Interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // Optional: Redirect to login
        window.location.href = "/";
      }

      console.error("API Error:", status, data.message || data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
