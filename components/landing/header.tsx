import Navbar from "@/components/landing/navLinks";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-row items-center justify-center border-b border-border-light bg-background/95 px-4 py-2 shadow-sm backdrop-blur sm:px-6 lg:px-8 md:h-16 md:py-0">
      <div className="mx-auto flex w-full max-w-300 flex-wrap items-center justify-between gap-2 md:flex-nowrap md:gap-4">
        <span className="flex flex-row items-center justify-center gap-2">
          <Image
            src="/icon.png"
            alt="खोजौ JAGIR logo"
            width={32}
            height={32}
            className="size-8 rounded-lg object-contain"
          />
          <h3 className="font-heading text-lg font-bold tracking-tight">
            खोजौ JAGIR
          </h3>
        </span>
        <Navbar />
        <div className="order-3 flex w-full items-center justify-center gap-2 md:order-none md:w-auto">
          <Link href="/auth/login"><Button variant="ghost" className="font-semibold text-foreground">Login</Button></Link>
          <Link href="/auth/signup"><Button variant="secondary" className="font-semibold">Sign Up</Button></Link>
          <Link href="/auth/login"><Button className="font-semibold">Post a Job</Button></Link>
        </div>
      </div>
    </header>
  );
}
