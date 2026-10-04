import { AuthCard } from "@/components/layout/AuthCard";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { OnboardingForm } from "@/components/forms/OnboardingForm";

export default function CandidateOnboardingPage() {
  return <ProtectedRoute requiredRole="candidate" allowIncomplete><AuthCard title="Build your candidate profile" description="A few details help the right teams find you."><OnboardingForm role="candidate" /></AuthCard></ProtectedRoute>;
}
