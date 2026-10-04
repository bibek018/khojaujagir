import { AuthCard } from "@/components/layout/AuthCard";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to manage your jobs, applications, and profile."
    >
      <LoginForm />
    </AuthCard>
  );
}
