import DashboardGuard from "@/components/auth/DashBoardGuard";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardGuard >{children}</DashboardGuard>;
}
