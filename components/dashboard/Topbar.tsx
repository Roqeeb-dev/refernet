"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFacility } from "@/hooks/useFacility";
import {
  getFacilityAvailabilityOption,
  type FacilityAvailabilityStatus,
} from "@/lib/facility";
import { useFacilityStatusStore } from "@/store/useFacilityStatusStore";
import UpdateFacilityStatusModal from "./UpdateFacilityStatusModal";

interface TopbarProps {
  facilityName: string;
  onMenuClick: () => void;
  hasNotifications?: boolean;
}

export default function Topbar({
  facilityName,
  onMenuClick,
  hasNotifications = true,
}: TopbarProps) {
  const { user, loading: authLoading } = useAuth();
  const {
    facility,
    updateStatus,
    isLoading: facilityLoading,
    isUpdatingStatus,
  } = useFacility();

  const initials = user?.email ? user.email.charAt(0).toUpperCase() : null;
  const { status, lastUpdated } = useFacilityStatusStore();
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Fallback to Zustand state or backend state
  const currentStatus = status ?? facility?.availability_status ?? "accepting";
  const statusOption = getFacilityAvailabilityOption(currentStatus);

  async function handleSaveStatus(newStatus: FacilityAvailabilityStatus) {
    const { error } = await updateStatus(newStatus);

    if (error) {
      window.alert(`Couldn't update facility status: ${error}`);
      return;
    }

    setIsStatusModalOpen(false);
  }

  const isLoading = authLoading || facilityLoading;

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
            <span className="font-semibold text-green-700">
              {facility?.facility_name || facilityName}
            </span>
          </p>
          <p className="font-body text-caption text-text-secondary">
            Status updated at {lastUpdated}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-sm">
        <div
          className={`hidden items-center gap-xs rounded-full px-base py-xs sm:flex ${statusOption.bgColor}`}
        >
          <span className={`h-2 w-2 rounded-full ${statusOption.dotColor}`} />
          <span
            className={`whitespace-nowrap font-body text-body-sm font-medium ${statusOption.textColor}`}
          >
            {statusOption.label}
          </span>
          <button
            type="button"
            disabled={isUpdatingStatus}
            onClick={() => setIsStatusModalOpen(true)}
            className={`ml-xs font-body text-caption font-semibold underline underline-offset-2 transition-colors hover:opacity-80 disabled:opacity-50 ${statusOption.textColor}`}
          >
            {isUpdatingStatus ? "Saving..." : "Edit"}
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

        {isLoading ? (
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

      <UpdateFacilityStatusModal
        open={isStatusModalOpen}
        currentStatus={currentStatus}
        onClose={() => setIsStatusModalOpen(false)}
        onSave={handleSaveStatus}
      />
    </header>
  );
}
