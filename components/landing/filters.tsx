export const Filters = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 text-xs">
      <span className="mr-1 font-semibold uppercase tracking-wide text-muted-foreground">
        Popular Filters
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
