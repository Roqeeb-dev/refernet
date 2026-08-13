"use client";

import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import RecentOutgoingReferralsCard from "@/components/dashboard/RecentOutgoingReferralsCard";
import UpdateFacilityStatusModal from "@/components/dashboard/UpdateFacilityStatusModal";
import { useFacilityStatusStore } from "@/store/useFacilityStatusStore";
import {
  DASHBOARD_STATS,
  DASHBOARD_RECENT_ACTIVITY,
  DASHBOARD_RECENT_OUTGOING,
} from "@/lib/data";

export default function DashboardPage() {
  const { status, setStatus } = useFacilityStatusStore();
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-lg">
      <div>
        <h1 className="font-display text-heading-xl font-bold text-text-primary">
          Dashboard
        </h1>
        <p className="font-body text-body-sm text-text-secondary">
          Overview of your facility&apos;s referral activity
        </p>
      </div>

      <div className="grid gap-base sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-lg lg:grid-cols-[280px_1fr]">
        <QuickActionsCard onUpdateStatus={() => setIsStatusModalOpen(true)} />
        <RecentActivityCard activities={DASHBOARD_RECENT_ACTIVITY} />
      </div>

      <RecentOutgoingReferralsCard referrals={DASHBOARD_RECENT_OUTGOING} />

      <UpdateFacilityStatusModal
        open={isStatusModalOpen}
        currentStatus={status}
        onClose={() => setIsStatusModalOpen(false)}
        onSave={(newStatus) => {
          setStatus(newStatus);
          setIsStatusModalOpen(false);
        }}
      />
    </div>
  );
}
