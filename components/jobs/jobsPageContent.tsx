
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Job } from "@/types/jobs.types";
import { findLiveJobs } from "@/services/jobs.services";
import { SearchBar } from "@/components/landing/searchBar";
import { Trending } from "@/components/landing/trending";
import { DisplayJobCard } from "@/components/landing/displayJobCard";
import { JobFilter, FilterState } from "@/components/jobs/filter";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ──────────────────────────── Constants ──────────────────────────── */

const JOBS_PER_PAGE = 10;

const INITIAL_FILTERS: FilterState = {
  workModes: [],
  employmentTypes: [],
  salaryRange: [0, 300000],
  salaryCurrency: "NPR",
};

/* ──────────────────────────── Component ──────────────────────────── */

export default function JobsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ── Read URL on every render (source of truth) ── */
  const keyword = searchParams.get("keyword") ?? "";
  const location = searchParams.get("location") ?? "";
  const type = searchParams.get("type") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  /* ── Job data state ── */
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  /* ── Filter state (local, not in URL yet) ── */
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /* Guard to prevent double-fetch in strict mode */
  const fetchId = useRef(0);

  /* ── URL helper: builds new URL from params and navigates ── */
  const updateURL = useCallback(
    (overrides: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(overrides).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const query = params.toString();
      router.push(query ? `/jobs?${query}` : "/jobs");
    },
    [router, searchParams]
  );

  /* ── Fetch jobs whenever URL params change ── */
  useEffect(() => {
    const currentFetchId = ++fetchId.current;

    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await findLiveJobs({
          keyword: keyword || undefined,
          location: location || undefined,
          type: type || undefined,
          page,
          limit: JOBS_PER_PAGE,
        });

        // Only update state if this is still the latest fetch
        if (currentFetchId !== fetchId.current) return;

        setJobs(data.jobs ?? []);
        setTotalPages(data.pagination?.totalPages ?? 1);
        setTotalJobs(data.pagination?.totalJobs ?? 0);
      } catch (err) {
        if (currentFetchId !== fetchId.current) return;
        console.error("Job search failed:", err);
        setError("Unable to load jobs. Please try again.");
        setJobs([]);
      } finally {
        if (currentFetchId === fetchId.current) {
          setIsLoading(false);
        }
      }
    };

    fetchJobs();
  }, [keyword, location, type, page]);

  /* ── SearchBar submit → update URL (resets to page 1) ── */
  const handleSearch = useCallback(
    (values: { keyword: string; location: string }) => {
      updateURL({
        keyword: values.keyword || undefined,
        location: values.location || undefined,
        page: undefined, // reset to page 1
      });
    },
    [updateURL]
  );

  /* ── Filter change → sync employment type to URL ── */
  const handleFilterChange = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);

      // Sync employment type filter to URL
      const typeParam =
        newFilters.employmentTypes.length > 0
          ? newFilters.employmentTypes.join(",")
          : undefined;

      updateURL({
        type: typeParam,
        page: undefined, // reset to page 1
      });
    },
    [updateURL]
  );

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    updateURL({
      type: undefined,
      page: undefined,
    });
  }, [updateURL]);

  /* ── Pagination handlers ── */
  const goToPage = useCallback(
    (newPage: number) => {
      updateURL({ page: String(newPage) });
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateURL]
  );

  /* ── Sync employment type filter FROM URL on mount ── */
  useEffect(() => {
    if (type) {
      setFilters((prev) => ({
        ...prev,
        employmentTypes: type.split(","),
      }));
    }
  // Only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9ff] py-6 md:py-10">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">

        {/* Mobile Filter Header */}
        <div className="flex items-center justify-between pb-4 lg:hidden">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            <span className="text-sm font-bold text-foreground">
              Explore Jobs
            </span>
            {totalJobs > 0 && !isLoading && (
              <span className="text-xs text-muted-foreground">
                ({totalJobs} found)
              </span>
            )}
          </div>

          <Sheet
            open={mobileFilterOpen}
            onOpenChange={setMobileFilterOpen}
          >
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white text-xs font-semibold shadow-xs"
                >
                  <Filter className="size-3.5 text-primary" />
                  <span>Filters</span>

                  {(filters.workModes.length > 0 ||
                    filters.employmentTypes.length > 0 ||
                    filters.salaryRange[0] > 0 ||
                    filters.salaryRange[1] < 300000) && (
                    <span className="flex h-2 w-2 rounded-full bg-primary" />
                  )}
                </Button>
              }
            />

            <SheetContent
              side="left"
              className="w-[85vw] overflow-y-auto p-4 sm:max-w-md"
            >
              <div className="pt-2">
                <JobFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                  className="border-none p-0 shadow-none"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Desktop Sidebar Filters */}
          <div className="sticky top-20 hidden h-fit w-72 shrink-0 lg:block">
            <JobFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex w-full min-w-0 flex-1 flex-col gap-5">

            {/* Search + Trending */}
            <div className="flex flex-col gap-3">
              <SearchBar
                className="bg-white"
                initialKeyword={keyword}
                initialLocation={location}
                onSearch={handleSearch}
                isLoading={isLoading}
              />

              <Trending className="bg-white" />
            </div>

            {/* Results count */}
            {!isLoading && !error && totalJobs > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {(page - 1) * JOBS_PER_PAGE + 1}–
                    {Math.min(page * JOBS_PER_PAGE, totalJobs)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {totalJobs}
                  </span>{" "}
                  jobs
                  {keyword && (
                    <>
                      {" "}for &ldquo;
                      <span className="font-medium text-primary">
                        {keyword}
                      </span>
                      &rdquo;
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-10 text-center">
                <p className="text-sm font-medium text-destructive">
                  {error}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleSearch({ keyword, location })
                  }
                  className="rounded-xl border-destructive/25 text-destructive hover:bg-destructive hover:text-white"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Job Results */}
            {!error && (
              <div className="pt-2">
                <DisplayJobCard jobs={jobs} isLoading={isLoading} />
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !error && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4 pb-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => goToPage(page - 1)}
                  className="gap-1.5 rounded-xl"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      // Show first, last, current, and neighbors
                      if (p === 1 || p === totalPages) return true;
                      if (Math.abs(p - page) <= 1) return true;
                      return false;
                    })
                    .reduce<(number | "ellipsis")[]>((acc, p, idx, arr) => {
                      // Insert ellipsis between non-consecutive pages
                      if (idx > 0) {
                        const prev = arr[idx - 1];
                        if (p - prev > 1) acc.push("ellipsis");
                      }
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((item, idx) =>
                      item === "ellipsis" ? (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-2 text-xs text-muted-foreground"
                        >
                          …
                        </span>
                      ) : (
                        <Button
                          key={item}
                          variant={item === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(item)}
                          className={`h-9 w-9 rounded-xl p-0 text-xs font-semibold ${
                            item === page
                              ? "pointer-events-none"
                              : ""
                          }`}
                        >
                          {item}
                        </Button>
                      )
                    )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => goToPage(page + 1)}
                  className="gap-1.5 rounded-xl"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

