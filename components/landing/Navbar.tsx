"use client";

import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "../shared/Logo";

const NAV_LINKS = [
  { label: "Emergency", href: "/emergency" },
  { label: "Facilities", href: "/facilities" },
  { label: "Get Care", href: "/get-care" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the drawer is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-base py-sm md:px-xl md:py-md">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-xl md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-body-md text-text-secondary transition-colors hover:text-green-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-base md:flex">
          <Link
            href="/login"
            className="font-body text-body-md text-text-primary transition-colors hover:text-green-700"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-green-900 px-lg font-body text-body-sm font-semibold text-text-inverse transition-colors hover:bg-green-700"
          >
            Create Facility Account
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-md text-green-900 md:hidden"
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-green-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer — slides in from the right, full height, half width */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-1/2 min-w-[260px] max-w-sm transform flex-col bg-white shadow-floating transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-base py-sm">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-md text-green-900"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-base py-lg">
          <ul className="flex flex-col gap-base">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-xs font-body text-body-md text-text-secondary transition-colors hover:text-green-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-sm border-t border-gray-200 pt-base">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[44px] items-center font-body text-body-md text-text-primary"
            >
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-green-900 px-lg font-body text-body-sm font-semibold text-text-inverse transition-colors hover:bg-green-700"
            >
              Create Facility Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
