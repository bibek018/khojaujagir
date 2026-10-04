import { JobForm } from "@/components/forms/JobForm";

export default function NewJobPage() {
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-emerald-700">Hiring workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Post a new role</h1><p className="mt-2 text-sm text-muted-foreground">Clear compensation and expectations help the right candidates self-select.</p></div><div className="rounded-xl border border-border-light bg-card p-5 sm:p-7"><JobForm /></div></div>;
}
