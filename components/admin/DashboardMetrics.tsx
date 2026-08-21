"use client";

import Link from "next/link";
import { useDashboardStore } from "@/store/useAdminDashboardStore";

export default function DashboardMetrics() {
  const {
    pendingCount,
    approvedThisMonthCount,
    rejectedThisMonthCount,
    totalRegisteredCount,
  } = useDashboardStore();

  return (
    <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
      {/* Pending Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-disabled">
            PENDING VERIFICATION
          </span>
          <div className="mt-xs flex items-baseline gap-xs">
            <span className="font-heading text-2xl font-bold text-text-primary">
              {pendingCount}
            </span>
            <span className="rounded-full bg-amber-100/80 px-2 py-0.5 text-[10px] font-bold text-amber-800">
              Action needed
            </span>
          </div>
          <p className="mt-xs text-[11px] text-text-secondary">
            Facilities awaiting document review
          </p>
        </div>
        <Link
          href="/admin/facilities/pending"
          className="mt-md text-[11px] font-bold text-amber-900 hover:underline inline-block"
        >
          Review Now →
        </Link>
      </div>

      {/* Approved This Month */}
      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-disabled">
          APPROVED THIS MONTH
        </span>
        <div className="mt-xs">
          <span className="font-heading text-2xl font-bold text-text-primary">
            {approvedThisMonthCount}
          </span>
        </div>
        <p className="mt-xs text-[11px] text-text-secondary">
          Facilities verified and upgraded to Tier 2
        </p>
      </div>

      {/* Rejected This Month */}
      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-disabled">
          REJECTED THIS MONTH
        </span>
        <div className="mt-xs">
          <span className="font-heading text-2xl font-bold text-text-primary">
            {rejectedThisMonthCount}
          </span>
        </div>
        <p className="mt-xs text-[11px] text-text-secondary">
          Applications rejected or returned for more information
        </p>
      </div>

      {/* Total Registered */}
      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-disabled">
          TOTAL REGISTERED FACILITIES
        </span>
        <div className="mt-xs">
          <span className="font-heading text-2xl font-bold text-text-primary">
            {totalRegisteredCount}
          </span>
        </div>
        <p className="mt-xs text-[11px] text-text-secondary">
          Across all tiers and states
        </p>
      </div>
    </div>
  );
}
