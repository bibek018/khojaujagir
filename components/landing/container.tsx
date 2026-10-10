import { cn } from "@/lib/utils";

export const Container = ({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) => (
  <div
    className={cn(
      "mx-auto w-full px-4 sm:px-6",
      wide ? "max-w-none" : "max-w-6xl lg:px-8",
      className,
    )}
  >
    {children}
  </div>
);
