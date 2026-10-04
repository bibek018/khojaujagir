export function ErrorMessage({ message = "Something went wrong. Please try again." }: { message?: string }) {
  return (
    <div role="alert" className="rounded-lg border border-destructive/20 bg-destructive-soft px-4 py-3 text-sm text-destructive-text">
      {message}
    </div>
  );
}
