"use client";

import { useRouter } from "next/navigation";
import { BriefcaseBusiness, UserRound } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AuthCard } from "@/components/layout/AuthCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/app";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { ErrorMessage } from "@/components/ui/error-message";

export default function SelectRolePage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  async function chooseRole(role: "candidate" | "employer") {
    setSaving(true); setError(null);
    try { await api.patch("/auth/role", { role }); await refreshUser(); router.push(`/onboarding/${role}`); }
    catch { setError("We could not save your role. Please try again."); }
    finally { setSaving(false); }
  }
  return <ProtectedRoute allowIncomplete><AuthCard title="How will you use खोजौ JAGIR?" description="Choose the path that best matches what you want to do.">{error && <ErrorMessage message={error} />}<div className="mt-4 grid gap-4 sm:grid-cols-2"><Card className="cursor-pointer border-border-light transition hover:-translate-y-1 hover:border-primary" onClick={() => void chooseRole("candidate")}><CardContent className="space-y-4 p-5"><UserRound className="size-7 text-primary" /><h2 className="font-bold">I am looking for work</h2><p className="text-sm text-muted-foreground">Discover verified roles and track every application.</p><Button disabled={saving} className="w-full">Continue as candidate</Button></CardContent></Card><Card className="cursor-pointer border-border-light transition hover:-translate-y-1 hover:border-primary" onClick={() => void chooseRole("employer")}><CardContent className="space-y-4 p-5"><BriefcaseBusiness className="size-7 text-emerald-700" /><h2 className="font-bold">I am hiring talent</h2><p className="text-sm text-muted-foreground">Publish transparent roles and manage applicants.</p><Button disabled={saving} variant="secondary" className="w-full">Continue as employer</Button></CardContent></Card></div></AuthCard></ProtectedRoute>;
}
