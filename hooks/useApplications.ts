"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/app";

export interface Application {
  id: string;
  jobId?: string;
  jobTitle?: string;
  candidateName?: string;
  status: string;
  createdAt?: string;
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(() => api.get<{ applications: Application[] }>("/applications")
      .then(({ data }) => setApplications(data.applications ?? []))
      .catch(() => setError("We could not load applications right now."))
      .finally(() => setLoading(false)), []);

  useEffect(() => {
    void api.get<{ applications: Application[] }>("/applications")
      .then(({ data }) => setApplications(data.applications ?? []))
      .catch(() => setError("We could not load applications right now."))
      .finally(() => setLoading(false));
  }, []);
  return { applications, loading, error, refresh };
}
