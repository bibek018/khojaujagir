"use client";

import { useApplications } from "@/hooks/useApplications";
import { ErrorMessage } from "@/components/ui/error-message";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

export default function CandidateApplicationsPage() {
  const { applications, loading, error } = useApplications();
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-primary">Candidate workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Your applications</h1><p className="mt-2 text-sm text-muted-foreground">See where each application stands.</p></div>{error && <ErrorMessage message={error} />}{loading ? <div className="flex justify-center py-16"><Spinner className="size-6 text-primary" /></div> : applications.length ? <div className="space-y-3">{applications.map((application) => <div key={application.id} className="flex flex-col gap-3 rounded-xl border border-border-light bg-card p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{application.jobTitle ?? "Application"}</p><p className="text-sm text-muted-foreground">Applied {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "recently"}</p></div><Badge className="w-fit bg-primary-soft text-primary">{application.status}</Badge></div>)}</div> : <div className="rounded-xl border border-dashed border-border-medium px-6 py-12 text-center text-sm text-muted-foreground">You have not applied to a role yet.</div>}</div>;
}
