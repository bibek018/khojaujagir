import { Job } from "@/app/types/jobs.types";
import { Bookmark, BriefcaseBusiness, MapPin } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Jobs {
  jobs: Job[];
}

const formatSalary = (job: Job) => {
  const currency = job.salary.currency === "USD" ? "$" : "NPR ";
  return `${currency}${job.salary.min.toLocaleString()} - ${currency}${job.salary.max.toLocaleString()}`;
};

export const DisplayJobCard = ({ jobs }: Jobs) => {
  if (!jobs.length) {
    return (
      <Card className="mt-6 border-dashed bg-white/70 shadow-none">
        <CardContent className="py-12 text-center text-sm text-muted-foreground">
          New verified roles are on the way. Check back soon.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card
          key={`${job.title}-${job.location}`}
          className="border-transparent bg-white shadow-[0_8px_24px_rgba(31,20,72,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(31,20,72,0.12)]"
        >
          <CardHeader className="gap-3 pb-1">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft font-heading text-sm font-bold text-primary">
                {job.title.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <CardTitle className="line-clamp-2 text-sm font-bold leading-5 text-foreground">
                  {job.title}
                </CardTitle>
                <CardDescription className="mt-1 flex items-center gap-1 text-xs">
                  <BriefcaseBusiness className="size-3" /> {job.type}
                </CardDescription>
              </div>
            </div>
            <CardAction>
              <button aria-label={`Save ${job.title}`} className="text-muted-foreground transition hover:text-primary">
                <Bookmark className="size-4" />
              </button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4 pt-3">
            <div className="rounded-xl bg-surface-muted px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-emerald-700">{formatSalary(job)}</span>
                <span className="text-[10px] text-muted-foreground">{job.salary.period}</span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" /> {job.location}
              </p>
            </div>
            <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">{job.description}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-1">
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-semibold text-primary">
                {job.status}
              </span>
              <span className="text-[10px] text-muted-foreground">Quick Apply</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
