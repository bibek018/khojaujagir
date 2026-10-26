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
  (res) => res,
  async (error) => {
    const original = error.config;
    const url: string = original?.url ?? "";
    const skip =
      url.includes("/auth/v1/refresh") ||
      url.includes("/auth/v1/login") ||
      url.includes("/auth/v1/signup");
    if (error.response?.status === 401 && !original._retry && !skip) {
      original._retry = true;
      try {
        const { data } =
          await refreshAPI.post<RefreshResponse>("/auth/v1/refresh");
        useAuthStore.getState().setAuth(data.user, data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (e) {
        useAuthStore.getState().setAuth(null, null);
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
