import type { Job } from "@/app/types/jobs.types";
import { JobCard } from "./JobCard";

export function JobList({ jobs }: { jobs: Job[] }) {
  if (!jobs.length) return <div className="rounded-xl border border-dashed border-border-medium px-6 py-12 text-center text-sm text-muted-foreground">No jobs match those filters yet.</div>;
  return <div className="grid gap-4 lg:grid-cols-2">{jobs.map((job, index) => <JobCard key={job.id ?? `${job.title}-${index}`} job={job} />)}</div>;
}
