import { AuthCard } from "@/components/layout/AuthCard";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { OnboardingForm } from "@/components/forms/OnboardingForm";

export default function EmployerOnboardingPage() {
  return <ProtectedRoute requiredRole="employer" allowIncomplete><AuthCard title="Set up your hiring profile" description="Tell candidates a little about the team behind your roles."><OnboardingForm role="employer" /></AuthCard></ProtectedRoute>;
}
