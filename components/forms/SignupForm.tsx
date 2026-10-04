"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Circle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ErrorMessage } from "../ui/error-message";
import { Spinner } from "../ui/spinner";

const passwordRules = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "One number", test: (value: string) => /\d/.test(value) },
  { label: "One special symbol", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

function isStrongPassword(value: string) {
  return passwordRules.every(({ test }) => test(value));
}

export function SignupForm() {
  const { signup, login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmation: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.name.trim().length < 2 || !form.email.includes("@") || !isStrongPassword(form.password) || form.password !== form.confirmation) { setError("Enter your name, a valid email, and a password that meets every requirement."); return; }
    setSubmitting(true); setError(null);
    try { await signup(form.name, form.email, form.password); await login(form.email, form.password); router.push("/select-role"); }
    catch { setError("We could not create your account. Please try again."); }
    finally { setSubmitting(false); }
  }

  return <form onSubmit={handleSubmit} className="space-y-5">
    {error && <ErrorMessage message={error} />}
    <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" autoComplete="name" /></div>
    <div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" autoComplete="email" /></div>
    <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Create a strong password" autoComplete="new-password" aria-describedby="password-requirements" /></div>
    <div id="password-requirements" className="grid grid-cols-1 gap-1 rounded-lg bg-surface-muted px-3 py-2.5 text-xs sm:grid-cols-2">
      {passwordRules.map(({ label, test }) => { const met = test(form.password); return <p key={label} className={`flex items-center gap-2 ${met ? "text-emerald-700" : "text-muted-foreground"}`}>{met ? <Check className="size-3.5" /> : <Circle className="size-3" />} {label}</p>; })}
    </div>
    <div className="space-y-2"><Label htmlFor="confirmation">Confirm password</Label><Input id="confirmation" type="password" value={form.confirmation} onChange={(event) => setForm({ ...form, confirmation: event.target.value })} placeholder="Repeat your password" autoComplete="new-password" /></div>
    <Button type="submit" className="h-10 w-full gap-2" disabled={submitting}>{submitting && <Spinner className="size-4" />} Create account</Button>
    <p className="text-center text-sm text-muted-foreground">Already registered? <Link href="/auth/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
  </form>;
}
