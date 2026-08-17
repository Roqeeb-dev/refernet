"use client";

import { Search, Bell } from "lucide-react";

interface AdminTopbarProps {
  title?: string;
}

export default function AdminTopbar({ title = "Dashboard" }: AdminTopbarProps) {
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

        {/* Notifications Icon Button with Badge */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-amber-600 transition-colors hover:bg-amber-50"
        >
          <Bell className="h-4 w-4 stroke-[2.5] fill-amber-500 text-amber-500" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User Initials Avatar */}
        <div className="ml-xs flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 font-mono text-body-xs font-bold text-white shadow-2xs">
          ZB
        </div>
      </div>
    </header>
  );
}
