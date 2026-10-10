import Image from "next/image";
import icon from "@/app/icon.png";
import Link from "next/link";
import { Container } from "./container";

const linkGroups = [
  {
    title: "Candidates",
    links: [
      { label: "Explore Jobs", href: "#" },
      { label: "Salary Explorer", href: "#" },
      { label: "Tech Companies", href: "#" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Role", href: "#" },
      { label: "Pricing Plans", href: "#" },
      { label: "Talent Sourcing", href: "#" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "About Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Security", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-primary-footer py-6 md:py-8">
      <Container wide className="flex flex-col gap-6 lg:gap-8">
        {/* Top: brand + link columns */}
        <section className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-1.5 md:col-span-3 lg:col-span-2 lg:pr-15">
            <Link href="/" className="flex w-fit items-center gap-2">
              <Image
                src={icon}
                alt="खोजौ JAGIR logo"
                className="h-8 w-8 -translate-y-0.5 object-contain md:-translate-y-1"
              />
              <span className="text-base font-bold text-foreground md:text-lg">
                खोजौ JAGIR
              </span>
            </Link>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground md:text-sm">
              Discover verified tech roles, transparent salary metrics, and
              fast-track hiring at high-growth engineering teams worldwide.
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="flex flex-col gap-3"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2 text-xs text-muted-foreground md:text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </section>

        {/* Bottom bar */}
        <section className="flex flex-col-reverse gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 खोजौ JAGIR. All rights reserved.</span>
          <div className="flex flex-row flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </footer>
  );
};
