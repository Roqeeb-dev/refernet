"use client";

import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import RecentOutgoingReferralsCard from "@/components/dashboard/RecentOutgoingReferralsCard";
import UpdateFacilityStatusModal from "@/components/dashboard/UpdateFacilityStatusModal";
import { useFacility } from "@/hooks/useFacility";
import {
  DASHBOARD_STATS,
  DASHBOARD_RECENT_ACTIVITY,
  DASHBOARD_RECENT_OUTGOING,
} from "@/lib/data";

export default function DashboardPage() {
  const { facility, updateStatus } = useFacility();
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

      {/* TODO: still mock data -- wire once patients/referrals table
          shapes are confirmed */}
      <div className="grid gap-base sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-lg lg:grid-cols-[280px_1fr]">
        <QuickActionsCard onUpdateStatus={() => setIsStatusModalOpen(true)} />
        {/* TODO: still mock data */}
        <RecentActivityCard activities={DASHBOARD_RECENT_ACTIVITY} />
      </div>

      {/* TODO: still mock data */}
      <RecentOutgoingReferralsCard referrals={DASHBOARD_RECENT_OUTGOING} />

      <UpdateFacilityStatusModal
        open={isStatusModalOpen}
        currentStatus={facility?.availability_status ?? "accepting"}
        onClose={() => setIsStatusModalOpen(false)}
        onSave={async (newStatus) => {
          const { error } = await updateStatus(newStatus);
          if (error) {
            window.alert(`Couldn't update status: ${error}`);
            return;
          }
          setIsStatusModalOpen(false);
        }}
      />
    </div>
  );
}
