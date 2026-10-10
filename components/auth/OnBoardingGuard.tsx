"use client";
import {toast} from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnBoardingGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      toast.error("Please log in to continue.", {
        id: "onboarding-login-required",
      });

      router.replace("/login");
      return;
    }

    if (user.onboardingComplete) {
      toast.info(
        "Your profile is already complete. Redirecting to your dashboard.",
        {
          id: "onboarding-already-complete",
        },
      );

      router.replace("/dashboard");
      return;
    }

    if (pathname === "/onboarding/set-role") {
      if (user.role) {
        toast.info("You've already selected your account type.", {
          id: "onboarding-role-already-selected",
        });

        router.replace(`/onboarding/${user.role}`);
      }
      return;
    }

    if (!user.role) {
      toast.warning("Please select your account type first.", {
        id: "onboarding-role-required",
      });

      router.replace("/onboarding/set-role");
      return;
    }

    if (pathname === "/onboarding/candidate" && user.role !== "candidate") {
      toast.info("Redirecting to your employer onboarding.", {
        id: "onboarding-employer-redirect",
      });

      router.replace(`/onboarding/${user.role}`);
      return;
    }

    if (pathname === "/onboarding/employer" && user.role !== "employer") {
      toast.info("Redirecting to your candidate onboarding.", {
        id: "onboarding-candidate-redirect",
      });

      router.replace(`/onboarding/${user.role}`);
    }
  }, [user, isInitialized, pathname, router]);

  // Don't display a page that the user isn't allowed to access.
  if (!isInitialized || !user || user.onboardingComplete) {
    return null;
  }

  if (pathname === "/onboarding/set-role") {
    return user.role ? null : <>{children}</>;
  }

  if (!user.role) {
    return null;
  }

  if (pathname === "/onboarding/candidate") {
    return user.role === "candidate" ? <>{children}</> : null;
  }

  if (pathname === "/onboarding/employer") {
    return user.role === "employer" ? <>{children}</> : null;
  }

  return null;
}
