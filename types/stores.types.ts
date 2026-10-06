import { User } from "./auth.types";

export type AuthStore = {
  user: User|null;
  accessToken: string|null;
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
  setAuth: (user: User, accessToken: string) => void;
};
