"use client";

import { useCallback, useEffect, useState } from "react";
import { Inbox, Send, Clock, TrendingUp } from "lucide-react";
import {
  getIncomingReferrals,
  getOutgoingReferrals,
} from "@/services/referral.service";
import type { ReferralRow } from "@/components/dashboard/ReferralsTable";

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
}

export interface RecentOutgoing {
  referenceCode: string;
  facility: string;
  dateSent: string;
}

export interface DashboardStat {
  label: string;
  sublabel: string;
  value: string;
  icon: typeof Inbox;
  iconBg: string;
  iconColor: string;
  valueColor: string;
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [recentOutgoing, setRecentOutgoing] = useState<RecentOutgoing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const [incomingRes, outgoingRes] = await Promise.all([
      getIncomingReferrals(),
      getOutgoingReferrals(),
    ]);

    if (incomingRes.error || outgoingRes.error) {
      setError(incomingRes.error || outgoingRes.error);
      setIsLoading(false);
      return;
    }

    const incoming: ReferralRow[] = incomingRes.data || [];
    const outgoing: ReferralRow[] = outgoingRes.data || [];

    // Helper function to safely parse dates from receivedAt strings
    const parseReceivedDate = (dateStr?: string) => {
      if (!dateStr) return new Date();
      const parsed = new Date(dateStr);
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    };

    // --- 1. Compute Monthly Stats ---
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const incomingThisMonth = incoming.filter(
      (r) => parseReceivedDate(r.receivedAt) >= startOfMonth,
    ).length;

    const outgoingThisMonth = outgoing.filter(
      (r) => parseReceivedDate(r.receivedAt) >= startOfMonth,
    ).length;

    const pendingCount =
      incoming.filter((r) => r.status === "new").length +
      outgoing.filter((r) => r.status === "new").length;

    // Acceptance Rate calculations
    const processedIncoming = incoming.filter((r) =>
      ["accepted", "declined", "arrived", "closed"].includes(r.status),
    );
    const acceptedCount = incoming.filter((r) =>
      ["accepted", "arrived", "closed"].includes(r.status),
    ).length;

    const acceptanceRate = processedIncoming.length
      ? Math.round((acceptedCount / processedIncoming.length) * 100)
      : 100;

    setStats([
      {
        label: "Incoming Referrals",
        sublabel: "This month",
        value: incomingThisMonth.toString(),
        icon: Inbox,
        iconBg: "bg-info-light",
        iconColor: "text-info",
        valueColor: "text-info",
      },
      {
        label: "Outgoing Referrals",
        sublabel: "This month",
        value: outgoingThisMonth.toString(),
        icon: Send,
        iconBg: "bg-green-50",
        iconColor: "text-green-700",
        valueColor: "text-green-700",
      },
      {
        label: "Pending Acceptance",
        sublabel: "Awaiting response",
        value: pendingCount.toString(),
        icon: Clock,
        iconBg: "bg-urgent-light",
        iconColor: "text-urgent",
        valueColor: "text-urgent",
      },
      {
        label: "Acceptance Rate",
        sublabel: "Last 30 days",
        value: `${acceptanceRate}%`,
        icon: TrendingUp,
        iconBg: "bg-green-50",
        iconColor: "text-green-700",
        valueColor: "text-green-700",
      },
    ]);

    // --- 2. Build Recent Activity Timeline ---
    const combinedActivity: { text: string; date: Date }[] = [];

    incoming.slice(0, 5).forEach((r) => {
      combinedActivity.push({
        text: `New referral received from ${r.facilityName} (${r.reference})`,
        date: parseReceivedDate(r.receivedAt),
      });
    });

    outgoing.slice(0, 5).forEach((r) => {
      combinedActivity.push({
        text: `Referral ${r.reference} sent to ${r.facilityName} (${r.status})`,
        date: parseReceivedDate(r.receivedAt),
      });
    });

    combinedActivity.sort((a, b) => b.date.getTime() - a.date.getTime());

    setActivities(
      combinedActivity.slice(0, 5).map((item, index) => ({
        id: index.toString(),
        text: item.text,
        time: item.date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      })),
    );

    // --- 3. Recent Outgoing Referrals ---
    setRecentOutgoing(
      outgoing.slice(0, 3).map((r) => ({
        referenceCode: r.reference,
        facility: r.facilityName,
        dateSent: r.receivedAt,
      })),
    );

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    activities,
    recentOutgoing,
    isLoading,
    error,
    refetch: fetchDashboardData,
  };
}
