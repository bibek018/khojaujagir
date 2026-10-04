import { findLiveJobs } from "@/app/services/jobs.services";
import { FilterIndustry } from "./filterIndustry";
import { DisplayJobCard } from "./displayJobCard";
import { Button } from "../ui/button";
import { ArrowRight, CircleCheck } from "lucide-react";
export const OpenJobs = async () => {
  const liveJobs = await findLiveJobs();
  return (
    <section className="w-full max-w-300 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
            <CircleCheck className="size-3.5" /> Unauthenticated open access
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore Live Open Roles
          </h2>
          <p className="max-w-150 text-sm leading-6 text-muted-foreground">
            Browse real-time listings with verified compensation bands. Click
            any job to inspect full tech stack specifications, team size, and
            immediate hiring loops.
          </p>
        </div>
        {/* <FilterJobs /> */}
        <FilterIndustry />
      </div>

      <DisplayJobCard jobs={liveJobs.jobs} />
      <div className="flex justify-center pt-8">
        <Button className="h-11 gap-2 rounded-lg px-6 font-semibold shadow-lg shadow-primary/20">
          View All {liveJobs.pagination.totalJobs.toLocaleString()} Open Jobs
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
};
