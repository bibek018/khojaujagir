"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "../ui/spinner";

export function ProtectedRoute({ children, requiredRole, allowIncomplete = false }: { children: React.ReactNode; requiredRole?: "candidate" | "employer"; allowIncomplete?: boolean }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`); return; }
    if (requiredRole && user.role !== requiredRole) { router.replace(user.role === "employer" ? "/employer/dashboard" : "/candidate/dashboard"); return; }
    if (!allowIncomplete && user.role && user.onboardingComplete === false) router.replace(`/onboarding/${user.role}`);
  }, [allowIncomplete, loading, pathname, requiredRole, router, user]);

  if (loading || !user || (requiredRole && user.role !== requiredRole)) {
    return <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="size-6 text-primary" /></div>;
  }
  return <>{children}</>;
}
