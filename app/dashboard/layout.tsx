import { DashboardFooter } from "./DashboardFooter";
import { DashboardHeader } from "./DashboardHeader";
import DashboardGuard from "@/components/auth/DashBoardGuard";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardGuard>
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </DashboardGuard>
  );
}
