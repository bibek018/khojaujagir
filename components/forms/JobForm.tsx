"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/app";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ErrorMessage } from "../ui/error-message";
import { Spinner } from "../ui/spinner";

export function JobForm({ jobId }: { jobId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "Full-time",
    min: "",
    max: "",
    currency: "USD",
    period: "year",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const update = (field: string, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.location.trim() ||
      !form.min ||
      !form.max
    ) {
      setError("Complete the title, description, location, and salary fields.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      type: form.type,
      salary: {
        min: Number(form.min),
        max: Number(form.max),
        currency: form.currency,
        period: form.period,
      },
    };
    try {
      if (jobId) await api.patch(`/jobs/${jobId}`, payload);
      else await api.post("/jobs/v1", payload);
      router.push(jobId ? `/employer/jobs/${jobId}/preview` : "/employer/jobs");
    } catch {
      setError("We could not save this job. Check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <ErrorMessage message={error} />}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Job title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            placeholder="Senior Frontend Engineer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
            placeholder="Remote / Kathmandu"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Employment type</Label>
          <select
            id="type"
            value={form.type}
            onChange={(event) => update("type", event.target.value)}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Freelance</option>
            <option>Internship</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="min">Minimum salary</Label>
          <Input
            id="min"
            type="number"
            value={form.min}
            onChange={(event) => update("min", event.target.value)}
            placeholder="80000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max">Maximum salary</Label>
          <Input
            id="max"
            type="number"
            value={form.max}
            onChange={(event) => update("max", event.target.value)}
            placeholder="120000"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="min-h-40"
          value={form.description}
          onChange={(event) => update("description", event.target.value)}
          placeholder="What will this person own?"
        />
      </div>
      <Button type="submit" className="gap-2" disabled={submitting}>
        {submitting && <Spinner className="size-4" />}{" "}
        {jobId ? "Save changes" : "Create job"}
      </Button>
    </form>
  );
}
