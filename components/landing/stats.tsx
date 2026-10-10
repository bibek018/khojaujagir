import { NoOfLiveJobs } from "@/services/jobs.services";
import { BadgeCheck, DollarSign, Zap } from "lucide-react";
export const Stats = async () => {
  const totalLiveJobs = await NoOfLiveJobs();
  return (
    <div className="grid w-full grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(80,50,150,0.08)] sm:grid-cols-4">
      {/* Stat 1 */}
      <div className="flex flex-col items-center justify-center px-4 py-5 text-center">
        <BadgeCheck className="mb-2 h-5 w-5 text-primary" />

        <span className="text-lg font-bold text-[#111827]">
          {totalLiveJobs.toLocaleString()}+
        </span>

        <span className="text-xs text-muted-foreground">
          Live Verified Roles
        </span>
      </div>

      {/* Stat 2 */}
      <div className="flex flex-col items-center justify-center px-4 py-5 text-center">
        <DollarSign className="mb-2 h-5 w-5 text-emerald-600" />

        <span className="text-lg font-bold text-[#111827]">100%</span>

        <span className="text-xs text-muted-foreground">
          Salary Transparency
        </span>
      </div>

      {/* Stat 3 */}
      <div className="flex flex-col items-center justify-center px-4 py-5 text-center">
        <BadgeCheck className="mb-2 h-5 w-5 text-primary" />

        <span className="text-lg font-bold text-[#111827]">Zero</span>

        <span className="text-xs text-muted-foreground">Ghost Postings</span>
      </div>

      {/* Stat 4 */}
      <div className="flex flex-col items-center justify-center px-4 py-5 text-center">
        <Zap className="mb-2 h-5 w-5 text-primary" />

        <span className="text-lg font-bold text-[#111827]">&lt; 48 Hours</span>

        <span className="text-xs text-muted-foreground">
          Avg Response Speed
        </span>
      </div>
    </div>
  );
};
