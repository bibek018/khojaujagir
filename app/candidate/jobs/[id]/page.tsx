"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/app";
import type { Job } from "@/app/types/jobs.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/error-message";
import { Spinner } from "@/components/ui/spinner";

export default function CandidateJobDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => { api.get<{ job: Job }>(`/jobs/v1/${params.id}`).then(({ data }) => setJob(data.job)).catch(() => setMessage("We could not load this role.")).finally(() => setLoading(false)); }, [params.id]);
  async function apply() { setMessage(null); try { await api.post("/applications", { jobId: params.id }); setMessage("Application submitted successfully."); } catch { setMessage("We could not submit your application."); } }
  if (loading) return <div className="flex justify-center py-16"><Spinner className="size-6 text-primary" /></div>;
  if (!job) return <ErrorMessage message={message ?? "Role not found."} />;
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-primary">Role details</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{job.title}</h1><p className="mt-2 text-sm text-muted-foreground">{job.location} · {job.type}</p></div>{message && <p className="rounded-lg bg-success-soft px-4 py-3 text-sm text-success-text">{message}</p>}<Card><CardContent className="space-y-6 p-6"><div><h2 className="text-lg font-bold">Compensation</h2><p className="mt-2 text-emerald-700">{job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.period}</p></div><div><h2 className="text-lg font-bold">About the role</h2><p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">{job.description}</p></div><Button onClick={() => void apply()}>Apply to this role</Button></CardContent></Card><Button variant="link" onClick={() => router.back()}>Back to roles</Button></div>;
}
