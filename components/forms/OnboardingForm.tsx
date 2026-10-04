"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/app";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/app/types/auth.types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ErrorMessage } from "../ui/error-message";
import { Spinner } from "../ui/spinner";

export function OnboardingForm({ role }: { role: UserRole }) {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ headline: "", company: "", bio: "", location: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isCandidate = role === "candidate";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.headline.trim() || !form.location.trim()) { setError("Please complete the required fields."); return; }
    setSubmitting(true); setError(null);
    try { await api.patch(`/onboarding/${role}`, form); await refreshUser(); router.push(isCandidate ? "/candidate/dashboard" : "/employer/dashboard"); }
    catch { setError("We could not save your profile. Please try again."); }
    finally { setSubmitting(false); }
  }

  return <form onSubmit={handleSubmit} className="space-y-4">
    {error && <ErrorMessage message={error} />}
    <div className="space-y-2"><Label htmlFor="headline">{isCandidate ? "Professional headline" : "Company name"}</Label><Input id="headline" value={form.headline} onChange={(event) => setForm({ ...form, headline: event.target.value })} placeholder={isCandidate ? "Senior frontend engineer" : "Your company"} /></div>
    {!isCandidate && <div className="space-y-2"><Label htmlFor="company">Hiring team or website</Label><Input id="company" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="https://example.com" /></div>}
    <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Kathmandu, Nepal or Remote" /></div>
    <div className="space-y-2"><Label htmlFor="bio">{isCandidate ? "About you" : "About the company"}</Label><Textarea id="bio" value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} placeholder="A short introduction" /></div>
    <Button type="submit" className="h-10 w-full gap-2" disabled={submitting}>{submitting && <Spinner className="size-4" />} Finish profile</Button>
  </form>;
}
