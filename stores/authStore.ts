import { AuthStore } from "@/types/stores.types";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAuth: (user, accessToken) => set({ user, accessToken }),
  logout: () => set({ user: null, accessToken: null }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));
