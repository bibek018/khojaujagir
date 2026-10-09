import { useAuthStore } from "@/stores/authStore";
import { RefreshResponse } from "@/types/auth.types";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  timeout: 8000,
});

const refreshAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 8000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const setAuth = useAuthStore.getState().setAuth;
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response =
          await refreshAPI.post<RefreshResponse>("/auth/v1/refresh");
        setAuth(response.data.user, response.data.accessToken);
        api(originalRequest);
      } catch (refreshError) {
        setAuth(null, null);
        return Promise.reject(refreshError);
      }
      return Promise.reject(error);
    }
  },
);
export default api;
