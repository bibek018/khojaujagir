
"use client";

import { useEffect, useState, FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight, X } from "lucide-react";
import { Button } from "../ui/button";

interface SearchBarProps {
  className?: string;
  isLoading?: boolean;
  initialKeyword?: string;
  initialLocation?: string;
  onSearch?: (params: {
    keyword: string;
    location: string;
  }) => void;
}

export const SearchBar = ({
  className = "",
  isLoading = false,
  initialKeyword = "",
  initialLocation = "",
  onSearch,
}: SearchBarProps) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  const pathname = usePathname();
  const router = useRouter();

  // Update inputs when initial values change from URL
  useEffect(() => {
    setKeyword(initialKeyword);
    setLocation(initialLocation);
  }, [initialKeyword, initialLocation]);

  const handleJobSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchValues = {
      keyword: keyword.trim(),
      location: location.trim(),
    };

    const params = new URLSearchParams();

    if (searchValues.keyword) {
      params.set("keyword", searchValues.keyword);
    }

    if (searchValues.location) {
      params.set("location", searchValues.location);
    }

    // Landing page: Navigate to jobs page
    if (pathname === "/") {
      const query = params.toString();

      router.push(query ? `/jobs?${query}` : "/jobs");
      return;
    }

    // Jobs page: Trigger parent's search function
    if (pathname === "/jobs") {
      onSearch?.(searchValues);
    }
  };

  return (
    <form
      onSubmit={handleJobSearch}
      className={`
        flex w-full flex-col gap-3 rounded-2xl
        border border-border bg-background p-3
        shadow-md transition-shadow duration-200
        sm:flex-row sm:items-center sm:gap-2 sm:p-2
        ${className}
      `}
    >
      {/* Keyword Search */}
      <div className="group flex h-12 w-full min-w-0 items-center gap-3 rounded-xl bg-muted/50 px-4 transition-colors duration-200 sm:h-14 sm:flex-[1.6]">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <label htmlFor="job-keyword" className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            What are you looking for?
          </label>

          <input
            id="job-keyword"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skills or company"
            className="h-5 w-full min-w-0 bg-transparent text-sm text-foreground outline-none"
          />
        </div>

        {keyword && (
          <button
            type="button"
            onClick={() => setKeyword("")}
            aria-label="Clear keyword"
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="hidden h-9 w-px bg-border sm:block" />

      {/* Location Search */}
      <div className="group flex h-12 w-full min-w-0 items-center gap-3 rounded-xl bg-muted/50 px-4 transition-colors duration-200 sm:h-14 sm:flex-1">
        <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <label htmlFor="job-location" className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Where?
          </label>

          <input
            id="job-location"
            type="search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, country or Remote"
            className="h-5 w-full min-w-0 bg-transparent text-sm text-foreground outline-none"
          />
        </div>

        {location && (
          <button
            type="button"
            onClick={() => setLocation("")}
            aria-label="Clear location"
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full shrink-0 gap-2 rounded-xl px-6 text-sm font-semibold shadow-sm transition-colors sm:h-14 sm:w-auto"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Searching...
          </>
        ) : (
          <>
            Search Jobs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
};
