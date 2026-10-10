import OnBoardingGuard from "@/components/auth/OnBoardingGuard";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OnBoardingGuard>{children}</OnBoardingGuard>;
}
