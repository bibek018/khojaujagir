import { ArrowRight, Banknote, MessagesSquare, Radio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const trustCards = [
  {
    icon: Banknote,
    title: "Verified Compensation Upfront",
    description:
      "Every role includes hard salary, stock, and equity bands. Zero guessing, zero bait-and-switch salary discussions after three interview rounds.",
    link: "Audit our transparency pledge",
    tone: "bg-primary-soft text-primary",
  },
  {
    icon: MessagesSquare,
    title: "Direct Engineering & Hiring Lead Access",
    description:
      "Your technical submission goes straight to the Engineering Manager and VP of Product, bypassing standardized keyword-filter black holes.",
    link: "Learn how leads review applications",
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Radio,
    title: "Real-Time Application Status Radar",
    description:
      "Instant telemetry notifications when your portfolio or GitHub profile is opened, inspected, bookmarked, or escalated to interview scheduling.",
    link: "See live applicant telemetry demo",
    tone: "bg-violet-100 text-violet-700",
  },
];

export function TrustSection() {
  return (
    <section className="w-full border-y border-primary/5 bg-primary-subtle px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-300">
        <div className="mx-auto max-w-160 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Engineered for candidate velocity</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A radically transparent tech job market with zero gatekeeping
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Traditional recruiting boards waste weeks in opaque interview cycles. खोजौ JAGIR forces hard metrics and direct human communication from day one.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {trustCards.map(({ icon: Icon, title, description, link, tone }) => (
            <Card key={title} className="border-transparent bg-white shadow-none">
              <CardHeader className="gap-4">
                <div className={`flex size-10 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-base font-bold">{title}</CardTitle>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-7">
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                <a href="#" className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                  {link} <ArrowRight className="size-3" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-7 border-transparent bg-white shadow-[0_8px_25px_rgba(31,20,72,0.08)]">
          <CardContent className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-8">
            <div>
              <p className="text-xs font-bold text-primary">Salary Intelligence 2026</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Engineered for high-performing individual contributors & managers</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Compare your compensation against verified offers. See how base pay, equity vests, and bonus pools stack across Series A through Pre-IPO software companies.</p>
              <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-emerald-700">
                <span>Shield W2 & Offer-Letter Backed</span>
                <span>Updated Daily at 00:00 UTC</span>
              </div>
            </div>
            <div className="rounded-xl bg-primary-subtle p-5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Senior IC Benchmarks (SF/Remote)</span>
                <span className="text-emerald-700">+14.2% YoY</span>
              </div>
              <div className="mt-5 flex h-28 items-end justify-around gap-3 border-b border-primary/10">
                {["h-12 bg-violet-400", "h-18 bg-violet-600", "h-24 bg-violet-800", "h-20 bg-violet-600"].map((bar) => <div key={bar} className={`w-full rounded-t-md ${bar}`} />)}
              </div>
              <div className="mt-3 flex justify-between text-[9px] text-muted-foreground"><span>Design</span><span>Eng</span><span>AI/ML</span><span>DevOps</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
