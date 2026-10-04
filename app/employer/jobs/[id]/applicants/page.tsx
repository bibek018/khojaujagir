"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/app";
import { ApplicantTable, type Applicant } from "@/components/applications/ApplicantTable";
import { Spinner } from "@/components/ui/spinner";
import { ErrorMessage } from "@/components/ui/error-message";

export default function ApplicantsPage() {
  const { id } = useParams<{ id: string }>();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { api.get<{ applicants: Applicant[] }>(`/jobs/${id}/applicants`).then(({ data }) => setApplicants(data.applicants ?? [])).catch(() => setError("We could not load applicants.")).finally(() => setLoading(false)); }, [id]);
  async function onStatusChange(applicationId: string, status: string) { try { await api.patch(`/applications/${applicationId}/status`, { status }); setApplicants((current) => current.map((applicant) => applicant.id === applicationId ? { ...applicant, status } : applicant)); } catch { setError("We could not update that application."); } }
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-emerald-700">Hiring workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Applicants</h1><p className="mt-2 text-sm text-muted-foreground">Review candidates and update their application status.</p></div>{error && <ErrorMessage message={error} />}{loading ? <div className="flex justify-center py-16"><Spinner className="size-6 text-primary" /></div> : <ApplicantTable applicants={applicants} onStatusChange={onStatusChange} />}</div>;
}
