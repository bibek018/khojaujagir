import Link from "next/link";
import { AppNavbar } from "./AppNavbar";
import { ProtectedRoute } from "./ProtectedRoute";

const links = {
  candidate: [
    ["Overview", "/candidate/dashboard"],
    ["Browse jobs", "/candidate/jobs"],
    ["Applications", "/candidate/applications"],
  ],
  employer: [
    ["Overview", "/employer/dashboard"],
    ["Manage jobs", "/employer/jobs"],
    ["Post a job", "/employer/jobs/new"],
  ],
} as const;

export function RoleLayout({ role, children }: { role: "candidate" | "employer"; children: React.ReactNode }) {
  return <ProtectedRoute requiredRole={role}>
    <AppNavbar />
    <div className="mx-auto flex w-full max-w-300 flex-1 flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
      <aside className="w-full shrink-0 md:w-52">
        <nav className="flex gap-1 overflow-x-auto rounded-xl border border-border-light bg-card p-2 md:flex-col">
          {links[role].map(([label, href]) => <Link key={href} href={href} className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-primary-soft hover:text-primary">{label}</Link>)}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  </ProtectedRoute>;
}
