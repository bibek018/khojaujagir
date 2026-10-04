"use client";

import { useCallback, useState } from "react";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobList } from "@/components/jobs/JobList";
import { useJobs, type JobFilters as JobFilterValues } from "@/hooks/useJobs";
import { ErrorMessage } from "@/components/ui/error-message";
import { Spinner } from "@/components/ui/spinner";

export default function CandidateJobsPage() {
  const [filters, setFilters] = useState<JobFilterValues>({});
  const onFilterChange = useCallback((next: JobFilterValues) => setFilters(next), []);
  const { jobs, pagination, loading, error } = useJobs(filters);
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-primary">Open roles</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Find your next role</h1><p className="mt-2 text-sm text-muted-foreground">Search verified openings with salary details available before you apply.</p></div><JobFilters onFilterChange={onFilterChange} />{error && <ErrorMessage message={error} />}{loading ? <div className="flex justify-center py-16"><Spinner className="size-6 text-primary" /></div> : <><JobList jobs={jobs} />{pagination && <p className="text-center text-xs text-muted-foreground">Showing {jobs.length} of {pagination.totalJobs} roles</p>}</>}</div>;
}
