"use client";

import Link from "next/link";
import { useDashboardStore } from "@/store/useAdminDashboardStore";

export default function NeedsAttentionCard() {
  const { attentionItems } = useDashboardStore();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
      <div className="mb-md flex items-center gap-xs">
        <h2 className="font-heading text-body-md font-bold text-text-primary">
          Needs Attention
        </h2>
        <span className="rounded-full bg-amber-100/80 px-2.5 py-0.5 text-body-xs font-bold text-amber-800">
          {attentionItems.length}
        </span>
      </div>

      <div className="space-y-sm">
        {attentionItems.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl p-sm text-[11px] border ${
              item.severity === "red"
                ? "bg-red-50/50 border-red-100"
                : "bg-amber-50/50 border-amber-100"
            }`}
          >
            <p className="font-bold text-text-primary">{item.facilityName}</p>
            <p className="mt-xs text-text-secondary">{item.issue}</p>
            <p className="mt-xs text-[10px] text-text-disabled">
              Source: {item.source}
            </p>
            <div className="mt-sm">
              <Link
                href={`/admin/facilities/${item.facilityId}`}
                className="inline-block rounded-md bg-amber-500 px-3 py-1 font-bold text-white text-[10px] hover:bg-amber-600 transition-colors"
              >
                Review
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
