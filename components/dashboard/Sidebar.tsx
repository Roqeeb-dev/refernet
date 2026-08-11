"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "New Referral", href: "/dashboard/referrals/new" },
  { label: "Outgoing Referrals", href: "/dashboard/referrals/outgoing" },
  {
    label: "Incoming Referrals",
    href: "/dashboard/referrals/incoming",
    badge: 3,
  },
  { label: "Facility Profile", href: "/dashboard/profile" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await signOut();
    } catch {
    } finally {
      setLoggingOut(false);
      router.push("/login");
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="navigation"
        aria-label="Dashboard navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col bg-green-900 px-base py-lg transition-transform duration-300 ease-out md:sticky md:top-0 md:h-dvh md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-xl flex items-start justify-between">
          <div>
            <p className="font-body text-heading-md font-bold text-white">
              ReferNet
            </p>
            <p className="font-body text-caption text-white/60">
              Facility Portal
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-white/70 transition-colors hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-xs">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-md px-base py-sm font-body text-body-sm transition-colors ${
                  active
                    ? "bg-white/10 font-semibold text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {item.badge != null && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emergency px-xs font-body text-caption font-semibold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-base">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-xs rounded-md px-base py-sm font-body text-body-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-60"
          >
            <LogOut size={16} />
            {loggingOut ? "Logging out…" : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
