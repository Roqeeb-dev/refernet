"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../shared/Logo";

const NAV_LINKS = [
  { label: "Emergency", href: "#emergency" },
  { label: "Facilities", href: "#facilities" },
  { label: "Get Care", href: "#get-care" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
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
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-md text-green-900 md:hidden"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-gray-200 bg-white px-base py-base md:hidden">
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
          <div className="mt-base flex flex-col gap-sm border-t border-gray-200 pt-base">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="font-body text-body-md text-text-primary"
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
      )}
    </header>
  );
}
