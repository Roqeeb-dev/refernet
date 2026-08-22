"use client";

import { useEffect, useState } from "react";
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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, isLoading, logout } = useAdminAuth();

  const [collapsed, setCollapsed] = useState(true);

  const STORAGE_KEY = "admin-sidebar-collapsed";

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");

    function applyForViewport(isDesktop: boolean) {
      if (!isDesktop) {
        setCollapsed(true);
        return;
      }

      const saved = window.localStorage.getItem(STORAGE_KEY);
      setCollapsed(saved !== null ? saved === "true" : false);
    }

    applyForViewport(mql.matches);

    function handleChange(e: MediaQueryListEvent) {
      applyForViewport(e.matches);
    }

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  function toggleCollapsed() {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    setCollapsed((prev) => {
      const next = !prev;
      if (isDesktop) {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      }
      return next;
    });
  }

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
    <aside
      className={`flex h-screen shrink-0 flex-col justify-between bg-[#06321F] p-md text-white border-r border-emerald-950 transition-all duration-200 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <div>
        {/* Header / Brand + Toggle */}
        <div
          className={`flex items-center pt-xs pb-md ${
            collapsed ? "justify-center px-0" : "justify-between px-xs"
          }`}
        >
          {!collapsed && (
            <div>
              <Logo variant="inverse" className="h-7" />
              <p className="mt-1 font-body text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                ADMIN PORTAL
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-emerald-300/70 transition-colors hover:bg-emerald-900/50 hover:text-white"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* User Card */}
        <div
          className={`mb-lg flex items-center rounded-xl bg-emerald-900/40 border border-emerald-800/50 ${
            collapsed ? "justify-center p-xs" : "gap-xs p-xs"
          }`}
        >
          {isLoading ? (
            <>
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-emerald-800/60" />
              {!collapsed && (
                <div className="flex-1 overflow-hidden">
                  <div className="h-3 w-24 animate-pulse rounded bg-emerald-800/60" />
                  <div className="mt-1.5 h-3 w-16 animate-pulse rounded bg-emerald-800/40" />
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-mono text-body-xs font-bold text-white"
                title={collapsed ? displayName : undefined}
              >
                {initials}
              </div>
              {!collapsed && (
                <div className="overflow-hidden">
                  <p className="truncate font-body text-body-xs font-bold text-white">
                    {displayName}
                  </p>
                  <span className="inline-block rounded-md bg-emerald-800/80 px-xs py-[2px] font-body text-[10px] font-bold text-emerald-200">
                    {displayRole}
                  </span>
                </div>
              )}
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
                title={collapsed ? item.name : undefined}
                className={`group relative flex items-center rounded-xl py-2.5 font-body text-body-xs font-bold transition-all ${
                  collapsed ? "justify-center px-0" : "justify-between px-sm"
                } ${
                  isActive
                    ? "bg-emerald-900/80 text-white shadow-xs"
                    : "text-emerald-100/70 hover:bg-emerald-900/40 hover:text-white"
                }`}
              >
                <div
                  className={`flex items-center ${collapsed ? "" : "gap-sm"}`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive
                        ? "text-emerald-400"
                        : "text-emerald-300/60 group-hover:text-white"
                    }`}
                  />
                  {!collapsed && <span>{item.name}</span>}
                </div>

                {item.badge && !collapsed && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-mono text-[11px] font-extrabold text-white">
                    {item.badge}
                  </span>
                )}

                {/* Collapsed mode: show badge as a small dot instead of a number */}
                {item.badge && collapsed && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#06321F]" />
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
          title={collapsed ? "Sign Out" : undefined}
          className={`flex w-full items-center rounded-xl py-2.5 font-body text-body-xs font-bold text-emerald-200/70 transition-all hover:bg-emerald-900/40 hover:text-white ${
            collapsed ? "justify-center px-0" : "gap-sm px-sm"
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0 text-emerald-300/60" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
