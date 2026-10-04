import { LoaderCircle } from "lucide-react";

export function Spinner({ className = "" }: { className?: string }) {
  return <LoaderCircle aria-label="Loading" className={`animate-spin ${className}`} />;
}
