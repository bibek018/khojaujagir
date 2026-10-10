"use client";

import { useAuthStore } from "@/stores/authStore";
import { EmployerDashboard } from "@/components/employerDashboard/page";
import { CandidateDashboard } from "@/components/candidateDashboard/page";

export default function Dashboard() {
  const user = useAuthStore((store) => store.user);

  if (user?.role === "employer") {
    return <EmployerDashboard />;
  }

  if (user?.role === "candidate") {
    return <CandidateDashboard />;
  }

  return null;
}
