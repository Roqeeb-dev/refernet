"use client";

import Link from "next/link";
import { useDashboardStore } from "@/store/useAdminDashboardStore";

export default function PendingQueueCard() {
  const { pendingQueue, pendingCount } = useDashboardStore();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
      <div className="mb-md flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <h2 className="font-heading text-body-md font-bold text-text-primary">
            Pending Verification
          </h2>
          <span className="rounded-full bg-amber-100/80 px-2.5 py-0.5 text-body-xs font-bold text-amber-800">
            {pendingCount}
          </span>
        </div>
        <Link
          href="/admin/facilities/pending"
          className="text-[12px] font-semibold text-emerald-800 hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {pendingQueue.slice(0, 5).map((facility) => (
          <div
            key={facility.id}
            className="flex items-center justify-between py-sm text-[11px] hover:bg-gray-50/50 rounded-xl px-xs transition-colors"
          >
            <div>
              <p className="font-bold text-text-primary">{facility.name}</p>
              <p className="text-text-secondary">
                {facility.state} · {facility.lga}
              </p>
            </div>

            <div className="flex items-center gap-md">
              <span className="text-text-secondary">
                {facility.type || "Private Clinic"}
              </span>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
                CAC Certificate
              </span>
              <span className="text-text-disabled">
                {facility.registeredAt || "6h ago"}
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 border border-emerald-200">
                Within Target
              </span>
              <Link
                href={`/admin/facilities/pending/${facility.id}`}
                className="rounded-lg bg-emerald-800 px-3 py-1 font-bold text-white hover:bg-emerald-900 transition-colors"
              >
                Review
              </Link>
            </div>
          </div>
        ))}

        {pendingQueue.length === 0 && (
          <p className="py-md text-center text-text-disabled text-[12px]">
            No pending facilities awaiting review.
          </p>
        )}
      </div>
    </div>
  );
}
