import { NoOfLiveJobs } from "@/services/jobs.services";

export const HeroSection = async () => {
  const totalLiveJobs = await NoOfLiveJobs();

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-5 text-center">
      <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-[#eeebff] px-4 py-1.5 text-xs font-semibold text-primary sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span>
            {totalLiveJobs.toLocaleString()} Verified Openings Live Now
          </span>
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">
          Zero Login Required to Browse
        </span>
      </div>

      <h1 className="text-[2.25rem] lg:min-w-250 font-extrabold leading-[1.1] tracking-[-0.04em] text-[#111827] sm:text-5xl md:text-[3.5rem] lg:text-6xl">
        Find tech roles with{" "}
        <span className="bg-linear-to-r from-[#7C3AED] via-[#A78BFA] to-[#DDD6FE] bg-clip-text text-transparent">
          transparent
        </span>{" "}
        <span className="text-primary">salaries</span> and direct engineering
        access.
      </h1>

      <p className="max-w-2xl text-sm font-medium leading-6 text-muted-foreground sm:text-base sm:leading-7">
        Discover verified tech jobs at fast-moving startups and premier tech
        companies. Search and browse live opportunities freely—no account
        required.
      </p>
    </div>
  );
};
