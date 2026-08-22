"use client";

import { useState } from "react";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import RecentOutgoingReferralsCard from "@/components/dashboard/RecentOutgoingReferralsCard";
import UpdateFacilityStatusModal from "@/components/dashboard/UpdateFacilityStatusModal";
import ReferralLoadingState from "@/components/dashboard/ReferralLoadingState";
import ReferralErrorState from "@/components/dashboard/ReferralErrorState";
import Button from "@/components/shared/Button";
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

  const hasNoActivity = activities.length === 0 && recentOutgoing.length === 0;

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

      {/* Global Empty Banner for New Accounts */}
      {hasNoActivity && (
        <div className="flex flex-col items-start justify-between gap-base rounded-lg border border-gray-200 bg-white p-lg sm:flex-row sm:items-center">
          <div>
            <h3 className="font-body text-body-md font-semibold text-text-primary">
              Welcome to ReferNet!
            </h3>
            <p className="font-body text-body-sm text-text-secondary">
              No referral activity recorded yet. Create your first outgoing
              referral to get started.
            </p>
          </div>
          <Link href="/dashboard/new-referral/type">
            <Button variant="primary" size="sm">
              + New Referral
            </Button>
          </Link>
        </div>
      )}

      {/* Dynamic Statistics Grid */}
      <div className="grid gap-base grid-cols-2 lg:grid-cols-4">
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
