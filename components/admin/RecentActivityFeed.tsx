"use client";

import { useDashboardStore } from "@/store/useAdminDashboardStore";

export default function RecentActivityFeed() {
  const { recentActivities } = useDashboardStore();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
      <h2 className="mb-md font-heading text-body-md font-bold text-text-primary">
        Recent Activity
      </h2>

      <div className="space-y-md">
        {recentActivities.map((act) => (
          <div key={act.id} className="flex items-start gap-xs text-[11px]">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-800 font-bold text-white text-[10px]">
              {act.initials}
            </div>
            <div>
              <p className="text-text-primary">
                <strong className="font-bold">{act.actor}</strong> {act.action}{" "}
                <strong className="font-bold text-emerald-900">
                  {act.target}
                </strong>
                .
              </p>
              <p className="mt-0.5 text-[10px] text-text-disabled">
                {act.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
