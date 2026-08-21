"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { getInitials, formatRole } from "@/lib/admin-display";
import {
  LayoutDashboard,
  Clock,
  Building2,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, isLoading, logout } = useAdminAuth();

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Pending Approval",
      href: "/admin/pending",
      icon: Clock,
      badge: 7,
    },
    {
      name: "All Facilities",
      href: "/admin/facilities",
      icon: Building2,
    },
    {
      name: "Admin Accounts",
      href: "/admin/accounts",
      icon: Users,
    },
    {
      name: "Audit Log",
      href: "/admin/audit-log",
      icon: FileText,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];
  const displayName = admin?.fullName ?? "Admin User";
  const displayRole = formatRole(admin?.role);
  const initials = getInitials(admin?.fullName);

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-[#06321F] p-md text-white border-r border-emerald-950">
      <div>
        {/* Header / Brand */}
        <div className="px-xs pt-xs pb-md">
          <Logo variant="inverse" className="h-7" />
          <p className="mt-1 font-body text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
            ADMIN PORTAL
          </p>
        </div>

        {/* User Card */}
        <div className="mb-lg flex items-center gap-xs rounded-xl bg-emerald-900/40 p-xs border border-emerald-800/50">
          {isLoading ? (
            <>
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-emerald-800/60" />
              <div className="flex-1 overflow-hidden">
                <div className="h-3 w-24 animate-pulse rounded bg-emerald-800/60" />
                <div className="mt-1.5 h-3 w-16 animate-pulse rounded bg-emerald-800/40" />
              </div>
            </>
          ) : (
            <>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-mono text-body-xs font-bold text-white">
                {initials}
              </div>
              <div className="overflow-hidden">
                <p className="truncate font-body text-body-xs font-bold text-white">
                  {displayName}
                </p>
                <span className="inline-block rounded-md bg-emerald-800/80 px-xs py-[2px] font-body text-[10px] font-bold text-emerald-200">
                  {displayRole}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between rounded-xl px-sm py-2.5 font-body text-body-xs font-bold transition-all ${
                  isActive
                    ? "bg-emerald-900/80 text-white shadow-xs"
                    : "text-emerald-100/70 hover:bg-emerald-900/40 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-sm">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive
                        ? "text-emerald-400"
                        : "text-emerald-300/60 group-hover:text-white"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-mono text-[11px] font-extrabold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Action */}
      <div className="pt-md border-t border-emerald-900/50">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-sm rounded-xl px-sm py-2.5 font-body text-body-xs font-bold text-emerald-200/70 transition-all hover:bg-emerald-900/40 hover:text-white"
        >
          <LogOut className="h-4 w-4 text-emerald-300/60" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
