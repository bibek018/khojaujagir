import { FilterIndustry } from "./filterIndustry";
import { DisplayJobCard } from "./displayJobCard";
import { findLiveJobs } from "@/services/jobs.services";
export const OpenJobs = async () => {
  const liveJobs = await findLiveJobs();
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-2">
          <h2 className="text-2xl font-bold text-neutral-active md:text-4xl">
            Explore Live Open Roles
          </h2>
          <p className="text-sm text-muted-foreground">
            Browse real-time listings with verified compensation bands. Click
            any job to inspect full tech stack specifications, team size, and
            immediate hiring loops.
          </p>
        </div>
        <FilterIndustry />
      </div>

      <DisplayJobCard jobs={liveJobs.jobs} />
    </section>
  );
};