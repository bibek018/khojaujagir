"use client";

import Link from "next/link";
import { useJobs } from "@/hooks/useJobs";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";

export default function EmployerJobsPage() {
  const { jobs, loading, error } = useJobs();
  return <div className="space-y-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-emerald-700">Hiring workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Manage your jobs</h1><p className="mt-2 text-sm text-muted-foreground">Keep role details, status, and applicant pipelines organized.</p></div><Link href="/employer/jobs/new"><Button>Post a new job</Button></Link></div>{error && <ErrorMessage message={error} />}{loading ? <div className="flex justify-center py-16"><Spinner className="size-6 text-primary" /></div> : jobs.length ? <div className="space-y-3">{jobs.map((job, index) => <Card key={job.id ?? `${job.title}-${index}`}><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold">{job.title}</p><p className="mt-1 text-sm text-muted-foreground">{job.location} · {job.type}</p></div><div className="flex flex-wrap gap-2"><Link href={`/employer/jobs/${job.id ?? encodeURIComponent(job.title)}/preview`}><Button size="sm" variant="outline">Preview</Button></Link><Link href={`/employer/jobs/${job.id ?? encodeURIComponent(job.title)}/edit`}><Button size="sm" variant="ghost">Edit</Button></Link><Link href={`/employer/jobs/${job.id ?? encodeURIComponent(job.title)}/applicants`}><Button size="sm" variant="secondary">Applicants</Button></Link></div></CardContent></Card>)}</div> : <div className="rounded-xl border border-dashed border-border-medium px-6 py-12 text-center text-sm text-muted-foreground">You have not posted a job yet.</div>}</div>;
}
