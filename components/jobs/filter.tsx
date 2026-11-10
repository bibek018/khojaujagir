
"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  RotateCcw,
  MapPin,
  Briefcase,
  Banknote,
  SlidersHorizontal,
  Check,
} from "lucide-react";

export type SalaryCurrency = "NPR" | "USD" | "INR";

export interface FilterState {
  workModes: string[];
  employmentTypes: string[];
  salaryCurrency: SalaryCurrency;
  salaryRange: [number, number];
}

interface JobFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
}

const WORK_MODES = [
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
  { id: "onsite", label: "On-site" },
];

const EMPLOYMENT_TYPES = [
  { id: "Full-time", label: "Full-time" },
  { id: "Part-time", label: "Part-time" },
  { id: "Internship", label: "Internship" },
  { id: "Contract", label: "Contract" },
  { id: "Freelance", label: "Freelance" },
];

// Currency configuration
const CURRENCIES = {
  NPR: {
    symbol: "रु",
    label: "NPR",
    max: 300000,
    step: 5000,
  },
  USD: {
    symbol: "$",
    label: "USD",
    max: 10000,
    step: 100,
  },
  INR: {
    symbol: "₹",
    label: "INR",
    max: 300000,
    step: 5000,
  },
};

export const JobFilter = ({
  filters,
  onFilterChange,
  onReset,
  className = "",
}: JobFilterProps) => {
  const currency = CURRENCIES[filters.salaryCurrency];

  // Change currency and reset salary range
  const handleCurrencyChange = (newCurrency: SalaryCurrency) => {
    onFilterChange({
      ...filters,
      salaryCurrency: newCurrency,
      salaryRange: [0, CURRENCIES[newCurrency].max],
    });
  };

  // Toggle work mode
  const toggleWorkMode = (mode: string) => {
    const updated = filters.workModes.includes(mode)
      ? filters.workModes.filter((m) => m !== mode)
      : [...filters.workModes, mode];

    onFilterChange({ ...filters, workModes: updated });
  };

  // Toggle employment type
  const toggleEmploymentType = (type: string) => {
    const updated = filters.employmentTypes.includes(type)
      ? filters.employmentTypes.filter((t) => t !== type)
      : [...filters.employmentTypes, type];

    onFilterChange({ ...filters, employmentTypes: updated });
  };

  // Salary range change
  const handleSalaryChange = (
    value: number | readonly number[]
  ) => {
    if (Array.isArray(value) && value.length === 2) {
      onFilterChange({
        ...filters,
        salaryRange: [value[0], value[1]],
      });
    }
  };

  const activeCount =
    filters.workModes.length +
    filters.employmentTypes.length +
    (filters.salaryCurrency !== "NPR" ||
      filters.salaryRange[0] > 0 ||
      filters.salaryRange[1] < currency.max
      ? 1
      : 0);

  return (
    <aside
      className={`flex flex-col rounded-2xl border border-border/70 bg-white ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <SlidersHorizontal className="h-4 w-4" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground">
              Filters
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Refine your job search
            </p>
          </div>
        </div>

        {activeCount > 0 && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            {activeCount} active
          </span>
        )}
      </div>

      <div className="flex flex-col gap-6 p-5">

        {/* Salary Filter */}
        <section className="flex flex-col gap-4">

          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-bold text-foreground">
              Salary Range
            </h4>
          </div>

          {/* Currency Selector */}
          <div>
            <p className="mb-2 text-[11px] text-muted-foreground">
              Compare salaries in
            </p>

            <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
              {(Object.keys(CURRENCIES) as SalaryCurrency[]).map(
                (code) => {
                  const selected = filters.salaryCurrency === code;

                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleCurrencyChange(code)}
                      aria-pressed={selected}
                      className={`rounded-lg px-2 py-2 text-xs font-bold transition-all ${selected
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {code === "NPR" && "🇳🇵 "}
                      {code === "USD" && "🇺🇸 "}
                      {code === "INR" && "🇮🇳 "}
                      {code}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Salary Values */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 rounded-xl border border-border/70 bg-slate-50 px-3 py-2">
              <p className="text-[10px] text-muted-foreground">
                Minimum
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground">
                {currency.symbol}{" "}
                {filters.salaryRange[0].toLocaleString("en-IN")}
              </p>
            </div>

            <span className="text-xs text-muted-foreground">—</span>

            <div className="flex-1 rounded-xl border border-border/70 bg-slate-50 px-3 py-2">
              <p className="text-[10px] text-muted-foreground">
                Maximum
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground">
                {currency.symbol}{" "}
                {filters.salaryRange[1].toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Salary Slider */}
          <div className="px-1 pt-1">
            <Slider
              key={filters.salaryCurrency}
              min={0}
              max={currency.max}
              step={currency.step}
              value={filters.salaryRange}
              onValueChange={handleSalaryChange}
              className="my-2"
            />
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>
              {currency.symbol} 0
            </span>
            <span>
              {currency.symbol}{" "}
              {currency.max.toLocaleString("en-IN")}+
            </span>
          </div>

          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Showing salary comparisons in {filters.salaryCurrency}.
            Jobs listed in other currencies will not be included.
          </p>
        </section>

        <div className="border-t border-border/60" />

        {/* Work Mode */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-bold text-foreground">
              Work Mode
            </h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {WORK_MODES.map((mode) => {
              const selected = filters.workModes.includes(mode.id);

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => toggleWorkMode(mode.id)}
                  aria-pressed={selected}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/70 bg-white text-muted-foreground hover:border-primary/40 hover:text-primary"
                    }`}
                >
                  {selected && <Check className="h-3 w-3" />}
                  {mode.label}
                </button>
              );
            })}
          </div>
        </section>

        <div className="border-t border-border/60" />

        {/* Employment Type */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-bold text-foreground">
              Employment Type
            </h4>
          </div>

          <div className="flex flex-col gap-1.5">
            {EMPLOYMENT_TYPES.map((type) => {
              const selected =
                filters.employmentTypes.includes(type.id);

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => toggleEmploymentType(type.id)}
                  aria-pressed={selected}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-all ${selected
                    ? "bg-primary/5 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                    }`}
                >
                  <span>{type.label}</span>

                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border ${selected
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white"
                      }`}
                  >
                    {selected && <Check className="h-3 w-3" />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t border-border/60 px-5 py-3">
        <Button
          variant="ghost"
          onClick={onReset}
          disabled={activeCount === 0}
          className="h-9 w-full justify-center gap-2 rounded-lg text-xs font-semibold text-muted-foreground hover:bg-primary/5 hover:text-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset all filters
        </Button>
      </div>
    </aside>
  );
};
