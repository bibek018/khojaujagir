"use client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      toast.error("Please log in to access your dashboard.", {
        id: "dashboard-login-required",
      });

      router.replace("/login");
      return;
    }

    if (!user.role) {
      toast.warning("Please select your account type first.", {
        id: "dashboard-role-required",
      });

      router.replace("/onboarding/set-role");
      return;
    }

    if (!user.onboardingComplete) {
      toast.info("Complete your profile to access your dashboard.", {
        id: "dashboard-onboarding-required",
      });

      router.replace(`/onboarding/${user.role}`);
    }
  }, [user, isInitialized, router]);
  
  // Don't display the dashboard until access is allowed.
  if (!isInitialized || !user) {
    return null;
  }

  if (!user.role || !user.onboardingComplete) {
    return null;
  }

  return <>{children}</>;
}
