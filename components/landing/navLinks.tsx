"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-row gap-8">
        <Link
          className="text-muted-foreground font-semibold"
          href="/"
        >
          Explore Jobs
        </Link>

        <Link
          className="text-muted-foreground font-semibold"
          href="#"
        >
          Companies
        </Link>

        <Link
          className="text-muted-foreground font-semibold"
          href="#"
        >
          Salaries
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 flex w-52 flex-col gap-2 rounded-lg border bg-card p-4 shadow-lg md:hidden">
          <Link
            className="text-muted-foreground font-semibold"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            Explore Jobs
          </Link>

          <Link
            className="text-muted-foreground font-semibold"
            href="#"
            onClick={() => setIsOpen(false)}
          >
            Companies
          </Link>

          <Link
            className="text-muted-foreground font-semibold"
            href="#"
            onClick={() => setIsOpen(false)}
          >
            Salaries
          </Link>
        </div>
      )}
    </nav>
  );
}