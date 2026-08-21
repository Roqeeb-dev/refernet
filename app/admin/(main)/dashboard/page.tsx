"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/useAdminDashboardStore";
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import PendingQueueCard from "@/components/admin/PendingQueueCard";
import RecentActivityFeed from "@/components/admin/RecentActivityFeed";
import NeedsAttentionCard from "@/components/admin/NeedsAttentioncard";
import {
  PageLoadingState,
  PageErrorState,
} from "@/components/admin/AdminPageStates";

export default function DashboardPage() {
  const { fetchDashboardData, isLoading, error } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <PageLoadingState message="Loading dashboard statistics..." />;
  }

  if (error) {
    return (
      <PageErrorState
        title="Unable to load dashboard"
        errorMsg={error}
        onRetry={fetchDashboardData}
      />
    );
  }

  return (
    <div className="flex flex-col gap-md font-body">
      {/* Title */}
      <h1 className="font-heading text-xl font-bold text-text-primary">
        Dashboard
      </h1>

      {/* Top 4 Metrics Cards */}
      <DashboardMetrics />

      {/* Middle Pending Queue Section */}
      <PendingQueueCard />

      {/* Bottom 2-Column Section */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        <RecentActivityFeed />
        <NeedsAttentionCard />
      </div>
    </div>
  );
}
