import { NoOfLiveJobs } from "@/services/jobs.services";
export const HeroSection = async () => {
  const totalLiveJobs = await NoOfLiveJobs();

  return (
    <section className="w-full bg-[#faf9ff] px-4 py-2 sm:px-6 md:py-6 lg:px-8 lg:py-5 flex flex-col items-center justify-center">
      <div className=" flex w-full max-w-300 flex-col items-center justify-center gap-2">
        {/*            JOBS BADGE */}
        <div className=" inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-[#eeebff] px-4 py-1.5 text-xs font-semibold text-primary sm:mb-8 sm:text-sm">
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
        <h1
          className="
            w-full
            text-center
            text-[2.5rem]
            font-extrabold
            leading-[1.05]
            tracking-[-0.04em]
            text-[#111827]
            sm:text-[3.25rem]
            md:text-[4rem]
            lg:text-[4rem]
          "
        >
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
            mt-6
            max-w-170
            text-center
            text-sm
            font-medium
            leading-6
            text-muted-foreground

            sm:mt-7
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
