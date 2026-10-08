"use client";
import { useAuthStore } from "@/stores/authStore";
import { EmployerDashboard } from "@/components/employerDashboard/page";
import { CandidateDashboard } from "@/components/candidateDashboard/page";
import { useRouter } from "next/navigation";
export default function Dashboard() {
    const router = useRouter();
    const user = useAuthStore((store) => store.user);
    if(!user){
        router.replace("/");
    }
  return user?.role === "employer" ? (
    <EmployerDashboard />
  ) : (
    <CandidateDashboard />
  );
}
