"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileCheck2, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CandidateDashboardPage() {
  const { user } = useAuth();
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-primary">Candidate workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Good to see you, {user?.name ?? "there"}.</h1><p className="mt-2 text-sm text-muted-foreground">Keep your search moving with verified roles and transparent application updates.</p></div><div className="grid gap-4 sm:grid-cols-3"><Card><CardContent className="space-y-3 p-5"><Search className="size-6 text-primary" /><p className="text-2xl font-bold">Browse</p><p className="text-sm text-muted-foreground">Explore live roles with clear salary bands.</p><Link href="/candidate/jobs"><Button variant="outline" size="sm">Find a role <ArrowRight className="size-4" /></Button></Link></CardContent></Card><Card><CardContent className="space-y-3 p-5"><FileCheck2 className="size-6 text-emerald-700" /><p className="text-2xl font-bold">Applications</p><p className="text-sm text-muted-foreground">Track every application in one place.</p><Link href="/candidate/applications"><Button variant="outline" size="sm">View applications <ArrowRight className="size-4" /></Button></Link></CardContent></Card><Card><CardContent className="space-y-3 p-5"><BriefcaseBusiness className="size-6 text-primary" /><p className="text-2xl font-bold">Profile</p><p className="text-sm text-muted-foreground">Make it easier for teams to find you.</p><Button variant="outline" size="sm">Edit profile</Button></CardContent></Card></div></div>;
}
