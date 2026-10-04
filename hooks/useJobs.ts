"use client";

import { useEffect, useState } from "react";
import api from "@/lib/app";
import type { Job, JobsResponse } from "@/app/types/jobs.types";

export interface JobFilters {
  search?: string;
  location?: string;
  type?: string;
  page?: number;
}

export function useJobs(filters: JobFilters = {}) {
  const { search, location, type, page } = filters;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<JobsResponse["pagination"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    api.get<JobsResponse>("/jobs/v1", { params: { search, location, type, page } })
      .then(({ data }) => {
        if (!active) return;
        setError(null);
        setJobs(data.jobs ?? []);
        setPagination(data.pagination ?? null);
      })
      .catch(() => active && setError("We could not load jobs right now."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [search, location, type, page]);

  return { jobs, pagination, loading, error };
}
