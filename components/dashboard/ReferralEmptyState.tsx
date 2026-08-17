"use client";

import { FileX2, RefreshCw } from "lucide-react";

interface ReferralEmptyStateProps {
  title?: string;
  description?: string;
  activeTab?: string;
  onRefresh?: () => void;
}

export default function ReferralEmptyState({
  title = "No referrals found",
  description,
  activeTab = "all",
  onRefresh,
}: ReferralEmptyStateProps) {
  const defaultDescription =
    activeTab === "all"
      ? "There are no referrals registered in the system yet."
      : `There are currently no referrals marked as "${activeTab}".`;

  return (
    <div className="relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/80 py-[64px] px-[24px] text-center shadow-2xs backdrop-blur-xs">
      {/* Decorative Outer Glow Ring */}
      <div className="relative mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-emerald-50/60 ring-8 ring-emerald-50/30">
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-100/80 text-emerald-800 shadow-2xs">
          <FileX2 className="h-[22px] w-[22px]" />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-heading text-[15px] font-bold tracking-tight text-gray-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-[6px] max-w-[320px] font-body text-[12px] leading-[18px] text-gray-500">
        {description ?? defaultDescription}
      </p>

      {/* Active Filter Pill context badge */}
      {activeTab !== "all" && (
        <span className="mt-[14px] inline-flex items-center rounded-full bg-gray-100 px-[10px] py-[3px] font-body text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
          Filter: {activeTab}
        </span>
      )}

      {/* Optional Refresh Trigger Action */}
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          className="mt-[18px] inline-flex items-center gap-[6px] rounded-xl border border-gray-200 bg-white px-[14px] py-[7px] font-body text-[11px] font-bold text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-[12px] w-[12px]" />
          Refresh list
        </button>
      )}
    </div>
  );
}
