import axios, { type AxiosInstance } from "axios";

// Définir le type ApiResponse localement ou l'importer
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

const api: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - retourne directement la donnée (qui est déjà ApiResponse)
api.interceptors.response.use(
  (response) => {
    // Le backend retourne déjà { success, data, ... }
    // On retourne directement response.data
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message || "An error occurred";
    console.error("API Error:", message);
    return Promise.reject({ message, status: error.response?.status });
  },
);

export default api;
