import { NoOfLiveJobs } from "@/app/services/jobs.services";
export const HeroSection = async () => {
  const totalLiveJobs = await NoOfLiveJobs();

  return (
    <section className="flex w-full flex-col items-center justify-center px-4 pb-6 pt-8 sm:px-6 sm:pb-10 sm:pt-16 lg:px-8 lg:pb-14 lg:pt-20">
      <div className="flex w-full max-w-300 flex-col items-center justify-center gap-2">
        {/*            JOBS BADGE */}
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-primary-soft px-4 py-1.5 text-[11px] font-semibold text-primary sm:mb-6 sm:text-xs">
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

        {/*MAIN HEADING */}
        <h1 className="w-full text-center text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[#111827] sm:text-4xl md:text-5xl">
          Find tech roles with{" "}
          <span
            className="
              bg-linear-to-r
              from-[#7C3AED]
              via-[#A78BFA]
              to-[#DDD6FE]
              bg-clip-text
              text-transparent
            "
          >
            transparent
          </span>{" "}
          <span className="text-primary">salaries</span> and direct engineering
          access.
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            mt-5
            max-w-170
            text-center
            text-sm
            font-medium
            leading-6
            text-muted-foreground

            sm:mt-6
            sm:text-base
            sm:leading-7
          "
        >
          Discover verified tech jobs at fast-moving startups and premier tech
          companies. Search and browse live opportunities freely—no account
          required.
        </p>
      </div>
    </section>
  );
};
