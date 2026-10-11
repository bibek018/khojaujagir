import { cn } from "@/lib/utils";

const sizes = {
  default: "max-w-6xl px-4 sm:px-6 lg:px-8", // hero, search, stats
  medium: "max-w-7xl px-4 ", // open jobs
  full: "max-w-none px-4 sm:px-6", // header, footer
};

export const Container = ({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
}) => (
  <div className={cn("mx-auto w-full", sizes[size], className)}>{children}</div>
);
