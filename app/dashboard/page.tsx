"use client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { EmployerDashboard } from "@/components/employerDashboard/page";
import { CandidateDashboard } from "@/components/candidateDashboard/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Dashboard() {
  const router = useRouter();
  const user = useAuthStore((store) => store.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      toast.error("Please log in to continue.");
      router.replace("/login");
      return;
    }
    if (!user.role) {
      toast.warning("Please select your role first");
      router.replace("/onboarding/set-role");
      return;
    }
    if (!user.onboardingComplete) {
      router.push(`/onboarding/${user.role}`);
      return;
    }
  }, [user, isInitialized, router]);

  return user?.role === "employer" ? (
    <CandidateDashboard />
  ) : (
    <EmployerDashboard />
  );
}
