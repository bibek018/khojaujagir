import { AuthCard } from "@/components/layout/AuthCard";
import { SignupForm } from "@/components/forms/SignupForm";

export default function SignupPage() {
  return <AuthCard title="Create your account" description="Join a transparent job market built for candidates and hiring teams."><SignupForm /></AuthCard>;
}
