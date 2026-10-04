import Link from "next/link";
import { Bookmark, MapPin } from "lucide-react";
import type { Job } from "@/app/types/jobs.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export function JobCard({ job }: { job: Job }) {
  const id = job.id ?? encodeURIComponent(job.title);
  const currency = job.salary.currency === "USD" ? "$" : "NPR ";
  return <Card className="border-transparent bg-white shadow-[0_8px_24px_rgba(31,20,72,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(31,20,72,0.12)]">
    <CardHeader className="flex-row items-start justify-between gap-3"><div className="flex min-w-0 gap-3"><div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-sm font-bold text-primary">{job.title.slice(0, 2).toUpperCase()}</div><div className="min-w-0"><CardTitle className="line-clamp-2 text-base font-bold">{job.title}</CardTitle><p className="mt-1 text-xs text-muted-foreground">{job.companyName ?? job.company ?? "Verified hiring team"}</p></div></div><button aria-label={`Save ${job.title}`} className="text-muted-foreground hover:text-primary"><Bookmark className="size-4" /></button></CardHeader>
    <CardContent className="space-y-4"><div className="rounded-xl bg-surface-muted px-3 py-2.5"><p className="text-sm font-bold text-emerald-700">{currency}{job.salary.min.toLocaleString()} - {currency}{job.salary.max.toLocaleString()}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" /> {job.location}</p></div><p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{job.description}</p><div className="flex items-center justify-between gap-2"><Badge className="bg-primary-soft text-primary">{job.type}</Badge><Link href={`/candidate/jobs/${id}`} className="text-xs font-bold text-primary hover:underline">View role</Link></div></CardContent>
  </Card>;
}
