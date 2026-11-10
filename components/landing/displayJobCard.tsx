
import Link from "next/link";
import { Job } from "@/types/jobs.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Banknote,
  Clock,
  ArrowRight,
  BriefcaseBusiness,
  SearchX,
} from "lucide-react";

interface Jobs {
  jobs?: Job[];
  isLoading?: boolean;
}

export const DisplayJobCard = ({
  jobs,
  isLoading = false,
}: Jobs) => {
  const jobList = jobs && jobs.length > 0 ? jobs : [];

 // Loading state
  if (isLoading) {
  return (
    <Card className="flex min-h-75 w-full items-center justify-center rounded-2xl border bg-white p-8">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        Finding jobs...
      </div>
    </Card>
  );
}
  // Empty State
  if (jobList.length === 0) {
    return (
      <Card className="flex min-h-75 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white px-6 py-12 text-center shadow-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <SearchX className="h-8 w-8" />
        </div>

        <h3 className="font-heading text-lg font-bold text-neutral-active">
          No Jobs Available Yet
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          We couldn't find any job openings at the moment.
          Don't worry! New opportunities are added regularly.
          Check back soon.
        </p>

        <Link href="/jobs" className="mt-5">
          <Button
            variant="outline"
            className="rounded-xl border-primary/25 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Explore All Jobs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {jobList.map((job) => {
        const companyName =
          typeof job.postedBy === "object"
            ? (job.postedBy as any)?.profile?.companyName ||
            (job.postedBy as any)?.name ||
            "Verified Employer"
            : job.postedBy || "Verified Employer";

        const companyInitials = companyName
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((w: string) => w[0])
          .join("")
          .toUpperCase() || "JB";

        const currencySymbol =
          job.salary?.currency === "USD" ? "$" : "NPR ";

        const periodStr = job.salary?.period
          ? `/${job.salary.period}`
          : "/mo";

        const salaryText =
          job.salary?.min && job.salary?.max
            ? `${currencySymbol}${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${periodStr}`
            : "Competitive Salary";

        return (
          <Card
            key={job._id}
            className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_32px_rgba(109,40,217,0.08)]"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xs font-bold text-primary shadow-xs transition-transform duration-200 group-hover:scale-105">
                    {companyInitials}
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <h3 className="truncate font-heading text-base font-bold text-neutral-active transition-colors group-hover:text-primary">
                      {job.title}
                    </h3>

                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5 shrink-0 text-text-subtle" />
                      <span className="truncate font-medium">
                        {companyName}
                      </span>
                    </div>
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className="shrink-0 rounded-full border border-primary-light/40 bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary"
                >
                  {job.type}
                </Badge>
              </div>

              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {job.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{job.location}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-lg bg-tertiary-soft px-2.5 py-1 text-xs font-medium text-tertiary">
                  <Banknote className="h-3.5 w-3.5 shrink-0" />
                  <span>{salaryText}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-text-subtle" />
                <span>Posted recently</span>
              </div>

              <Link href={`/jobs/${job._id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="group/btn h-8 rounded-xl border-primary/25 bg-background px-3 text-xs font-semibold text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
