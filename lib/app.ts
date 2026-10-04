import axios from "axios";
import { clearToken, getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? process.env.SERVER_URL,
  withCredentials: true,
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const redirectTo = error.response?.data?.redirectTo;

    if (typeof window !== "undefined") {
      if (status === 401 && getToken()) {
        clearToken();
        if (!window.location.pathname.startsWith("/auth/")) {
          window.location.replace("/auth/login");
        }
      } else if (status === 403 && redirectTo) {
        window.location.replace(redirectTo);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
