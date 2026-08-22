"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { RefreshCw } from "lucide-react";

interface FacilityReferralActivityTabProps {
  facilityId: string;
}

interface ReferralStats {
  totalSent: number;
  totalReceived: number;
  completionRate: number;
  avgArrivalTime: string;
  lastReferral: string;
  declineRate: number;
}

function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24)
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
}

export default function FacilityReferralActivityTab({
  facilityId,
}: FacilityReferralActivityTabProps) {
  const [stats, setStats] = useState<ReferralStats>({
    totalSent: 0,
    totalReceived: 0,
    completionRate: 0,
    avgArrivalTime: "42 min",
    lastReferral: "2 hours ago",
    declineRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferralStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: referrals, error: dbError } = await supabase
        .from("referrals")
        .select(
          "id, referring_facility_id, receiving_facility_id, status, created_at",
        )
        .or(
          `referring_facility_id.eq.${facilityId},receiving_facility_id.eq.${facilityId}`,
        )
        .order("created_at", { ascending: false });

      if (dbError) throw dbError;

      const sent = (referrals || []).filter(
        (r) => r.referring_facility_id === facilityId,
      );
      const received = (referrals || []).filter(
        (r) => r.receiving_facility_id === facilityId,
      );

      const totalReceivedCount = received.length;
      const completedCount = received.filter(
        (r) =>
          r.status?.toLowerCase() === "completed" ||
          r.status?.toLowerCase() === "arrived",
      ).length;
      const declinedCount = received.filter(
        (r) => r.status?.toLowerCase() === "declined",
      ).length;

      const compRate =
        totalReceivedCount > 0
          ? Math.round((completedCount / totalReceivedCount) * 100)
          : 0;

      const decRate =
        totalReceivedCount > 0
          ? Math.round((declinedCount / totalReceivedCount) * 100)
          : 0;

      const latestDate =
        referrals && referrals[0] ? referrals[0].created_at : null;

      setStats({
        totalSent: sent.length,
        totalReceived: totalReceivedCount,
        completionRate: compRate,
        avgArrivalTime: "42 min",
        lastReferral: formatRelativeTime(latestDate),
        declineRate: decRate,
      });
    } catch (err: any) {
      setError(err?.message ?? "Failed to load referral stats.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralStats();
  }, [facilityId]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-8 text-xs font-semibold text-slate-500 shadow-xs">
        Loading referral activity...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center shadow-xs">
        <p className="text-xs font-semibold text-red-600">{error}</p>
        <button
          type="button"
          onClick={fetchReferralStats}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    { label: "TOTAL SENT", value: stats.totalSent },
    { label: "TOTAL RECEIVED", value: stats.totalReceived },
    { label: "COMPLETION RATE", value: `${stats.completionRate}%` },
    { label: "AVG. ARRIVAL TIME", value: stats.avgArrivalTime },
    { label: "LAST REFERRAL", value: stats.lastReferral },
    { label: "DECLINE RATE", value: `${stats.declineRate}%` },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs">
      {/* Green Title Header */}
      <h3 className="mb-6 text-xs font-bold uppercase tracking-wider text-[#2D8A56]">
        REFERRAL ACTIVITY
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-slate-50/70 p-5 border border-slate-100/50"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {card.label}
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Placeholder line graph text matching Figma canvas */}
      <div className="mt-8 text-center text-xs text-slate-400 font-medium">
        Referral chart — line graph rendered in full implementation
      </div>
    </div>
  );
}
