import Image from "next/image";

export function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-surface-muted px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border-light bg-card p-6 shadow-[0_12px_35px_rgba(31,20,72,0.08)] sm:p-8 ">
        <div className="mb-6 flex items-center gap-2 ">
          <div className="flex flex-row justify-center items-center w-full">
            <Image
              src="/icon.png"
              alt="खोजौ JAGIR logo"
              width={32}
              height={32}
              className="size-8 rounded-lg object-contain"
            />{" "}
            <span className="font-heading text-lg font-bold text-center">
              &nbsp; खोजौ JAGIR
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
