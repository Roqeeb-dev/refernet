"use client";

import { Search, CircleUserRound, ChevronDown } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { getInitials } from "@/lib/admin-display";

interface AdminTopbarProps {
  title?: string;
}

export default function AdminTopbar({ title = "Dashboard" }: AdminTopbarProps) {
  const { admin, isLoading } = useAdminAuth();
  const initials = getInitials(admin?.fullName);

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-gray-200/80 bg-white px-lg">
      {/* Page Title */}
      <h1 className="font-heading text-heading-sm font-bold text-text-primary">
        {title}
      </h1>

      {/* Quick Action Icons & Profile Badge */}
      <div className="flex items-center gap-sm">
        {/* Search Icon Button */}
        <button
          type="button"
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-text-primary"
        >
          <Search className="h-4 w-4 stroke-[2.5]" />
        </button>

        {/* User Avatar + Dropdown Trigger */}
        {isLoading ? (
          <div className="ml-xs flex items-center gap-xs">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          </div>
        ) : (
          <button
            type="button"
            aria-label="Account menu"
            title={admin?.fullName ?? "Admin User"}
            className="ml-xs flex items-center gap-xs rounded-xl px-xs py-1 transition-colors hover:bg-gray-50"
          >
            {admin?.fullName ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 font-mono text-body-xs font-bold text-white shadow-2xs">
                {initials}
              </div>
            ) : (
              <CircleUserRound className="h-10 w-10 stroke-[1.5] text-gray-400" />
            )}
            <ChevronDown className="h-4 w-4 stroke-[2.5] text-gray-400" />
          </button>
        )}
      </div>
    </header>
  );
}
