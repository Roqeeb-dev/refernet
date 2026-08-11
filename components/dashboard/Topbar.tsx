"use client";

import Link from "next/link";
import { Bell, Menu, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface TopbarProps {
  facilityName: string;
  statusLabel: string;
  lastUpdated: string;
  onMenuClick: () => void;
  onEditStatus?: () => void;
  hasNotifications?: boolean;
}

export default function Topbar({
  facilityName,
  statusLabel,
  lastUpdated,
  onMenuClick,
  onEditStatus,
  hasNotifications = true,
}: TopbarProps) {
  const { user, loading } = useAuth();
  const initials = user?.email ? user.email.charAt(0).toUpperCase() : null;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-base py-sm md:px-xl">
      <div className="flex min-w-0 items-center gap-base">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-text-primary md:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <p className="truncate font-body text-body-md text-text-primary">
            Welcome back,{" "}
            <span className="font-semibold text-green-700">{facilityName}</span>
          </p>
          <p className="font-body text-caption text-text-secondary">
            Status updated at {lastUpdated}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-sm">
        <div className="hidden items-center gap-xs rounded-full bg-green-50 px-base py-xs sm:flex">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="whitespace-nowrap font-body text-body-sm font-medium text-green-700">
            {statusLabel}
          </span>
          <button
            type="button"
            onClick={onEditStatus}
            className="ml-xs font-body text-caption font-semibold text-green-700 underline underline-offset-2 transition-colors hover:text-green-900"
          >
            Edit
          </button>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-gray-100"
        >
          <Bell size={18} />
          {hasNotifications && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emergency" />
          )}
        </button>

        {loading ? (
          <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
        ) : (
          <Link
            href="/dashboard/profile"
            aria-label="Facility profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-body text-body-sm font-semibold text-green-700 transition-colors hover:bg-green-200"
          >
            {initials ?? <User size={16} />}
          </Link>
        )}
      </div>
    </header>
  );
}
