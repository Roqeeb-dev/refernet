"use client";

import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import RecentOutgoingReferralsCard from "@/components/dashboard/RecentOutgoingReferralsCard";
import UpdateFacilityStatusModal from "@/components/dashboard/UpdateFacilityStatusModal";
import ReferralLoadingState from "@/components/dashboard/ReferralLoadingState";
import ReferralErrorState from "@/components/dashboard/ReferralErrorState";
import { useFacility } from "@/hooks/useFacility";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardPage() {
  const { facility, updateStatus } = useFacility();
  const { stats, activities, recentOutgoing, isLoading, error, refetch } =
    useDashboardData();
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  if (isLoading) {
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
        <ReferralLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-lg">
        <div>
          <h1 className="font-display text-heading-xl font-bold text-text-primary">
            Dashboard
          </h1>
        </div>
        <ReferralErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

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

      {/* Dynamic Statistics Grid */}
      <div className="grid gap-base sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Actions and Recent Activity Timeline */}
      <div className="grid gap-lg lg:grid-cols-[280px_1fr]">
        <QuickActionsCard onUpdateStatus={() => setIsStatusModalOpen(true)} />
        <RecentActivityCard activities={activities} />
      </div>

      {/* Recent Outgoing Referrals */}
      <RecentOutgoingReferralsCard referrals={recentOutgoing} />

      {/* Facility Status Update Modal */}
      <UpdateFacilityStatusModal
        open={isStatusModalOpen}
        currentStatus={facility?.availability_status ?? "accepting"}
        onClose={() => setIsStatusModalOpen(false)}
        onSave={async (newStatus) => {
          const { error: statusError } = await updateStatus(newStatus);
          if (statusError) {
            window.alert(`Couldn't update status: ${statusError}`);
            return;
          }
          setIsStatusModalOpen(false);
        }}
      />
    </div>
  );
}
