"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

export function AppNavbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const home = user?.role === "employer" ? "/employer/dashboard" : "/candidate/dashboard";

  return <header className="sticky top-0 z-40 border-b border-border-light bg-background/95 backdrop-blur">
    <div className="mx-auto flex min-h-16 max-w-300 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <Link href={home} className="flex items-center gap-2" onClick={() => setOpen(false)}>
        <Image src="/icon.png" alt="खोजौ JAGIR logo" width={32} height={32} className="size-8 rounded-lg object-contain" />
        <span className="font-heading text-lg font-bold">खोजौ JAGIR</span>
      </Link>
      <nav className="hidden items-center gap-5 text-sm font-semibold text-muted-foreground md:flex">
        {user?.role === "employer" ? <><Link href="/employer/jobs/new">Post a job</Link><Link href="/employer/jobs">Manage jobs</Link></> : <><Link href="/candidate/jobs">Browse jobs</Link><Link href="/candidate/applications">Applications</Link></>}
        <span className="text-foreground">{user?.name ?? "Account"}</span>
        <Button variant="ghost" size="sm" onClick={() => void logout()}><LogOut className="size-4" /> Log out</Button>
      </nav>
      <button className="p-2 md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="border-t border-border-light bg-card px-4 py-4 md:hidden">
      <nav className="flex flex-col gap-3 text-sm font-semibold">
        {user?.role === "employer" ? <><Link href="/employer/jobs/new" onClick={() => setOpen(false)}>Post a job</Link><Link href="/employer/jobs" onClick={() => setOpen(false)}>Manage jobs</Link></> : <><Link href="/candidate/jobs" onClick={() => setOpen(false)}>Browse jobs</Link><Link href="/candidate/applications" onClick={() => setOpen(false)}>Applications</Link></>}
        <Button variant="outline" className="justify-start" onClick={() => void logout()}><LogOut className="size-4" /> Log out</Button>
      </nav>
    </div>}
  </header>;
}
