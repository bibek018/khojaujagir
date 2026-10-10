"use client";
import { useEffect } from "react";
import api from "@/lib/app";
import { useAuthStore } from "@/stores/authStore";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const init = async () => {
      const { setAuth, setInitialized } = useAuthStore.getState();
      try {
        const { data } = await api.post("/auth/v1/refresh");
        setAuth(data.user, data.accessToken);
      } catch {
        setAuth(null, null);
      } finally {
        setInitialized();
      }
    };

    init();
  }, []);

  return <>{children}</>;
}
