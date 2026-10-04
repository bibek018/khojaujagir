"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileUser, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmployerDashboardPage() {
  const { user } = useAuth();
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-emerald-700">Hiring workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Welcome, {user?.name ?? "team"}.</h1><p className="mt-2 text-sm text-muted-foreground">Publish transparent roles and keep your hiring pipeline moving.</p></div><div className="grid gap-4 sm:grid-cols-3"><Card><CardContent className="space-y-3 p-5"><Plus className="size-6 text-primary" /><p className="text-xl font-bold">Create a role</p><p className="text-sm text-muted-foreground">Share salary and expectations upfront.</p><Link href="/employer/jobs/new"><Button size="sm">Post a job <ArrowRight className="size-4" /></Button></Link></CardContent></Card><Card><CardContent className="space-y-3 p-5"><BriefcaseBusiness className="size-6 text-emerald-700" /><p className="text-xl font-bold">Your roles</p><p className="text-sm text-muted-foreground">Review and edit open positions.</p><Link href="/employer/jobs"><Button variant="outline" size="sm">Manage jobs <ArrowRight className="size-4" /></Button></Link></CardContent></Card><Card><CardContent className="space-y-3 p-5"><FileUser className="size-6 text-primary" /><p className="text-xl font-bold">Applicants</p><p className="text-sm text-muted-foreground">Move qualified candidates forward.</p><Link href="/employer/jobs"><Button variant="outline" size="sm">View pipeline <ArrowRight className="size-4" /></Button></Link></CardContent></Card></div></div>;
}
