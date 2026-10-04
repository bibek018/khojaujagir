import { findLiveJobs } from "@/app/services/jobs.services";
import { FilterIndustry } from "./filterIndustry";
import { DisplayJobCard } from "./displayJobCard";
export const OpenJobs = async () => {
  const liveJobs = await findLiveJobs();
  return (
    <section className="mt-6">
      <div className="flex flex-col  md:flex-row md:justify-between  gap-3">
        <div className=" flex flex-col items-center justify-center gap-1">
          <h2 className="text-xl font-semibold text-neutral-active text-center md:text-start w-full md:text-4xl">
            Explore Live Open Roles
          </h2>
          <p className="w-full text-muted-foreground text-sm ">
            Browse real-time listings with verified compensation bands. Click
            any job to inspect full tech stack specifications, team size, and
            immediate hiring loops.
          </p>
        </div>
        {/* <FilterJobs /> */}
        <FilterIndustry/>
      </div>

      <div>
        <DisplayJobCard jobs={liveJobs.jobs}/>
      </div>
    </section>
  );
};
