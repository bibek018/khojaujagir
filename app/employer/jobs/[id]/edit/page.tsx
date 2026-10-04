import { JobForm } from "@/components/forms/JobForm";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-emerald-700">Hiring workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Edit role</h1></div><div className="rounded-xl border border-border-light bg-card p-5 sm:p-7"><JobForm jobId={id} /></div></div>;
}
