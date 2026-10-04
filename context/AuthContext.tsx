"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import api from "@/lib/app";
import { clearToken, getToken, setToken } from "@/lib/auth";
import type { AuthResponse, User } from "@/app/types/auth.types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function responseUser(data: AuthResponse & { data?: { user?: User } }): User | null {
  return data.user ?? data.data?.user ?? null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setCurrentToken] = useState<string | null>(() => getToken());
  const [loading, setLoading] = useState(() => Boolean(getToken()));

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get<AuthResponse & { data?: { user?: User } }>("/auth/me");
      const nextUser = responseUser(data);
      setUser(nextUser);
      return nextUser;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const refreshTimer = window.setTimeout(() => {
      void refreshUser().finally(() => setLoading(false));
    }, 0);
    return () => window.clearTimeout(refreshTimer);
  }, [refreshUser, token]);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse & { data?: { user?: User } }>("/auth/login", { email, password });
    const nextToken = data.token ?? data.accessToken;
    if (nextToken) {
      setToken(nextToken);
      setCurrentToken(nextToken);
    }
    const nextUser = responseUser(data) ?? await refreshUser();
    if (!nextUser) throw new Error("Login succeeded but no user profile was returned.");
    setUser(nextUser);
    return nextUser;
  }, [refreshUser]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    await api.post("/auth/signup", { name, email, password });
  }, []);

  const logout = useCallback(async () => {
    try { await api.post("/auth/logout"); } finally {
      clearToken();
      setCurrentToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({
    user, token, loading, isAuthenticated: Boolean(user), login, signup, logout, refreshUser,
  }), [user, token, loading, login, signup, logout, refreshUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
