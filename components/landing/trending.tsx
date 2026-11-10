interface TrendingProps {
  className?: string;
}

export const Trending = ({ className = "" }: TrendingProps) => {
  return (
    <div
      className={`flex w-full flex-wrap items-center justify-center gap-2 text-xs rounded-2xl bg-white p-3 shadow-[0_4px_20px_rgba(80,50,150,0.06)] border border-border/50 ${className}`}
    >
      <span className="mr-1 font-semibold uppercase tracking-wide text-muted-foreground">
        Trending
      </span>

      <button className="rounded-full bg-[#eeeaff] px-3 py-1.5 font-medium text-muted-foreground transition hover:bg-primary/10">
        🔥 Hot Roles
      </button>

      <button className="rounded-full bg-[#eeeaff] px-3 py-1.5 font-medium text-muted-foreground transition hover:bg-primary/10">
        Remote Only
      </button>

      <button className="rounded-full bg-[#eeeaff] px-3 py-1.5 font-medium text-muted-foreground transition hover:bg-primary/10">
        Staff / Lead
      </button>

      <button className="rounded-full bg-[#eeeaff] px-3 py-1.5 font-medium text-muted-foreground transition hover:bg-primary/10">
        Design Systems
      </button>

      <button className="rounded-full bg-[#eeeaff] px-3 py-1.5 font-medium text-muted-foreground transition hover:bg-primary/10">
        React / Next.js
      </button>

      <button className="rounded-full bg-emerald-100 px-3 py-1.5 font-semibold text-emerald-700">
        $140k+
      </button>

      <button className="rounded-full bg-[#eeeaff] px-3 py-1.5 font-medium text-muted-foreground transition hover:bg-primary/10">
        Series B+
      </button>
    </div>
  );
};
