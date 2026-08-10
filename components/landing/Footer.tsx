import Link from "next/link";
import Logo from "../shared/Logo";

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Find Care", href: "/find-care/emergency" },
      { label: "Emergency Mode", href: "/find-care/emergency" },
      { label: "Guided Care", href: "/find-care/guided-care" },
      { label: "Referral Portal", href: "#" },
    ],
  },
  {
    heading: "Facility",
    links: [
      { label: "Create Account", href: "/register" },
      { label: "Log In", href: "/login" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-900">
      <div className="mx-auto max-w-7xl px-base py-2xl md:px-xl md:py-3xl">
        <div className="grid grid-cols-1 gap-2xl sm:grid-cols-2 md:grid-cols-4 md:gap-xl">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex">
              <Logo variant="inverse" />
            </Link>
            <p className="mt-base max-w-[220px] font-body text-body-sm text-green-100/70">
              Healthcare coordination for Nigeria. Connecting patients and
              facilities in real time.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="mb-base font-body text-overline uppercase text-green-100/60">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-body-md text-green-50/90 transition-colors hover:text-text-inverse"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-2xl flex flex-col gap-base border-t border-white/10 pt-lg sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-body-sm text-green-100/60">
            © {year} ReferNet Nigeria. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-lg">
            <span className="font-body text-overline uppercase text-green-100/60">
              NDPA Compliant
            </span>
            <span className="font-body text-overline uppercase text-green-100/60">
              End-to-end Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
