"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function JobFilters({ onFilterChange }: { onFilterChange: (filters: { search: string; location: string; type: string }) => void }) {
  const [filters, setFilters] = useState({ search: "", location: "", type: "" });
  useEffect(() => { const timer = window.setTimeout(() => onFilterChange(filters), 350); return () => window.clearTimeout(timer); }, [filters, onFilterChange]);
  return <div className="grid gap-3 rounded-xl border border-border-light bg-card p-4 md:grid-cols-[1.5fr_1fr_1fr]"><div className="relative"><Search className="absolute left-3 top-2 size-4 text-muted-foreground" /><Input className="pl-9" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} placeholder="Search title or skill" /></div><Input value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })} placeholder="Remote or location" /><select value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })} className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm"><option value="">All employment types</option><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Freelance</option><option>Internship</option></select></div>;
}
