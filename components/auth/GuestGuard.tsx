"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const router = useRouter();

  useEffect(() => {
    if (!isInitialized || !user) return;

    if (user.onboardingComplete) {
      toast.info("You're already signed in. Redirecting to your dashboard.", {
        id: "guest-dashboard-redirect",
      });

      router.replace("/dashboard");
      return;
    }

    if (user.role) {
      toast.info("Please complete your profile to continue.", {
        id: "guest-onboarding-redirect",
      });

      router.replace(`/onboarding/${user.role}`);
      return;
    }

    toast.info("Choose your account type to get started.", {
      id: "guest-role-redirect",
    });

    router.replace("/onboarding/set-role");
  }, [user, isInitialized, router]);

  if (!isInitialized || user) {
    return null;
  }

  return <>{children}</>;
}
