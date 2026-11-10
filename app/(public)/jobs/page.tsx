import { Suspense } from "react";
import JobsPageContent from "@/components/jobs/jobsPageContent";

function JobsPageFallback() {
  return (
    <div className="min-h-screen bg-[#faf9ff] py-6 md:py-10">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Skeleton sidebar */}
          <div className="hidden w-72 shrink-0 lg:block">
            <div className="h-96 animate-pulse rounded-2xl bg-white" />
          </div>

          {/* Skeleton main */}
          <div className="flex flex-1 flex-col gap-5">
            <div className="h-20 animate-pulse rounded-2xl bg-white" />
            <div className="h-12 animate-pulse rounded-2xl bg-white" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-2xl bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<JobsPageFallback />}>
      <JobsPageContent />
    </Suspense>
  );
}
