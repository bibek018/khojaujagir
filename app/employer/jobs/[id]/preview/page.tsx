"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/app";
import type { Job } from "@/app/types/jobs.types";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ErrorMessage } from "@/components/ui/error-message";

export default function JobPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get<{ job: Job }>(`/jobs/v1/${id}`).then(({ data }) => setJob(data.job)).catch(() => undefined).finally(() => setLoading(false)); }, [id]);
  if (loading) return <div className="flex justify-center py-16"><Spinner className="size-6 text-primary" /></div>;
  if (!job) return <ErrorMessage message="We could not load this job preview." />;
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-emerald-700">Job preview</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{job.title}</h1><p className="mt-2 text-sm text-muted-foreground">{job.location} · {job.type}</p></div><Card><CardContent className="space-y-6 p-6"><div><h2 className="font-bold">Compensation</h2><p className="mt-2 text-emerald-700">{job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.period}</p></div><div><h2 className="font-bold">Description</h2><p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">{job.description}</p></div></CardContent></Card></div>;
}
