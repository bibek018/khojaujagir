import { ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function SiteFooter() {
  return (
    <footer className="w-full bg-background px-4 pb-7 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-20">
      <div className="mx-auto grid max-w-300 gap-4 md:grid-cols-2">
        <Card className="border-transparent bg-primary-soft shadow-none">
          <CardContent className="p-6 sm:p-8">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white"><Users className="size-5" /></div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">For tech candidates</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Ready for your next career leap?</h2>
            <p className="mt-3 max-w-120 text-sm leading-6 text-muted-foreground">Create a verified profile in 2 minutes and let vetted engineering leaders and venture-backed founders apply directly to you.</p>
            <Button className="mx-auto mt-7 gap-2 sm:mx-0">Create Free Candidate Profile <ArrowRight className="size-4" /></Button>
            <p className="mt-3 text-[10px] text-muted-foreground">Always 100% free for candidates. Confidential search toggle available.</p>
          </CardContent>
        </Card>
        <Card className="border-transparent bg-emerald-50 shadow-none">
          <CardContent className="p-6 sm:p-8">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-700 text-white"><Users className="size-5" /></div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">For hiring teams</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Hiring senior engineers & designers?</h2>
            <p className="mt-3 max-w-120 text-sm leading-6 text-muted-foreground">Reach vetted monthly tech visitors. List your role today and connect directly with qualified applicants who meet your salary parameters.</p>
            <Button variant="outline" className="mx-auto mt-7 gap-2 border-foreground bg-foreground text-white hover:bg-foreground/90 sm:mx-0">Post a Role - First 30 Days Free <ArrowRight className="size-4" /></Button>
            <p className="mt-3 text-[10px] text-muted-foreground">No credit card needed to draft. ATS webhooks and Greenhouse/Lever sync.</p>
          </CardContent>
        </Card>
      </div>
      <div className="mx-auto mt-14 grid max-w-300 gap-8 border-t border-border-light pt-8 text-xs text-muted-foreground md:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr]">
        <div><p className="flex items-center gap-2 font-bold text-foreground"><Image src="/icon.png" alt="खोजौ JAGIR logo" width={24} height={24} className="size-6 rounded object-contain" /> खोजौ JAGIR</p><p className="mt-4 max-w-70 leading-5">Discover verified tech roles, transparent salary metrics, and fast-track hiring at high-growth engineering teams worldwide.</p></div>
        <div><p className="font-bold text-foreground">Candidates</p><a className="mt-4 block" href="#jobs">Explore Jobs</a><a className="mt-2 block" href="#">Salary Explorer</a><a className="mt-2 block" href="#">Tech Companies</a></div>
        <div><p className="font-bold text-foreground">Employers</p><a className="mt-4 block" href="#">Post a Role</a><a className="mt-2 block" href="#">Pricing Plans</a><a className="mt-2 block" href="#">Talent Sourcing</a></div>
        <div><p className="font-bold text-foreground">Platform</p><a className="mt-4 block" href="#">About Us</a><a className="mt-2 block" href="#">Privacy Policy</a><a className="mt-2 block" href="#">Terms of Service</a></div>
      </div>
      <div className="mx-auto mt-8 flex max-w-300 flex-col gap-3 border-t border-border-light pt-5 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 खोजौ JAGIR. All rights reserved.</span><span className="flex gap-4"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a></span></div>
    </footer>
  );
}
