import { User } from "./auth.types";

export type AuthStore = {
  user: User|null;
  accessToken: string|null;
  setUser: (user: User|null) => void;
  setAccessToken: (accessToken: string|null) => void;
  logout: () => void;
  setAuth: (user: User|null, accessToken: string|null) => void;
  isInitialized: boolean;
  setInitialized:()=>void;
};
