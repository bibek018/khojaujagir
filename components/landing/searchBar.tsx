import { Search, MapPin, Banknote, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const SearchBar = () => {
  return (
    <section className="w-full bg-[#faf9ff] px-4 pb-2 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-300">
        <div
          className="
            flex
            flex-col
            gap-3
            rounded-2xl
            bg-white
            p-3
            shadow-[0_10px_35px_rgba(80,50,150,0.12)]

            sm:flex-row
            sm:items-center
            sm:gap-2
            sm:rounded-xl
            sm:p-2
          "
        >
          <div className="flex h-10 md:h-13 w-full sm:flex-[2.2] min-w-0 sm:min-w-55 items-center gap-3 rounded-xl bg-[#f6f5fc] px-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full min-w-0 bg-transparent h-10 md:h-full text-base sm:text-sm font-medium outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Location Input: Kept as flex-1 */}
          <div className="flex h-10 md:h-13 w-full sm:flex-1 min-w-0 items-center gap-3 rounded-xl bg-[#f6f5fc] px-4">
            <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Remote / Location"
              className="w-full min-w-0 h-10 md:h-full bg-transparent text-base sm:text-sm font-medium outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Salary Input: Kept as flex-1 */}
          <div className="flex h-10 md:h-13 w-full sm:flex-1 min-w-0 items-center gap-3 rounded-xl bg-[#f6f5fc] px-4">
            <Banknote className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Salary"
              className="w-full min-w-0 h-10 md:h-full bg-transparent text-base sm:text-sm font-medium outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Search Button: shrink-0 prevents flex squeeze */}
          <Button
            type="button"
            className="
              flex
              h-10
              md:h-13
              w-full
              sm:w-auto
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-primary
              px-6
              text-base
              sm:text-sm
              font-semibold
              text-white
              transition
              hover:bg-primary/90
            "
          >
            Search Jobs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
