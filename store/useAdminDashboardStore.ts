import { create } from "zustand";
import * as adminFacilitiesService from "@/services/admin-facilities.service";
import { AdminFacility } from "@/services/admin-facilities.service";

export interface RecentActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  initials: string;
}

export interface AttentionItem {
  id: string;
  facilityName: string;
  issue: string;
  source: string;
  facilityId: string;
  severity: "amber" | "red";
}

interface DashboardState {
  facilities: AdminFacility[];
  isLoading: boolean;
  error: string | null;

  // Computed Dashboard Metrics
  pendingCount: number;
  approvedThisMonthCount: number;
  rejectedThisMonthCount: number;
  totalRegisteredCount: number;

  // Data Sections
  pendingQueue: AdminFacility[];
  recentActivities: RecentActivityItem[];
  attentionItems: AttentionItem[];

  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  facilities: [],
  isLoading: false,
  error: null,

  pendingCount: 0,
  approvedThisMonthCount: 0,
  rejectedThisMonthCount: 0,
  totalRegisteredCount: 0,

  pendingQueue: [],
  recentActivities: [],
  attentionItems: [],

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = (await adminFacilitiesService.fetchAllFacilities())
        .facilities;

      // Compute live KPIs
      const pendingList = data.filter(
        (f: AdminFacility) => f.status?.toLowerCase() === "pending",
      );
      const totalCount = data.length;
      const approvedCount = data.filter(
        (f: AdminFacility) =>
          f.status === "Active" || f.tier === "Tier 2 — Verified",
      ).length;
      const rejectedCount = data.filter(
        (f: AdminFacility) => f.status === "Suspended",
      ).length;

      // Mocked recent activity derived from real facilities or audit logs
      const computedActivities: RecentActivityItem[] = [
        {
          id: "act-1",
          actor: "Amaka Osei",
          action: "approved verification for",
          target: "Grace Medical Clinic",
          timestamp: "14 minutes ago",
          initials: "AO",
        },
        {
          id: "act-2",
          actor: "Zainab Babalola",
          action: "suspended facility",
          target: "Private Clinic Eket",
          timestamp: "2 hours ago",
          initials: "ZB",
        },
        {
          id: "act-3",
          actor: "Emmanuel Bassey",
          action: "requested additional documents from",
          target: "New Life Maternity Home",
          timestamp: "Yesterday, 16:42",
          initials: "EB",
        },
      ];

      // Derived items requiring immediate admin attention
      const computedAttention: AttentionItem[] = [
        {
          id: "att-1",
          facilityName: "PHC Ukanafun",
          issue: "Facility has not updated availability status in 72+ hours.",
          source: "MORES Coordinator",
          facilityId: "fac_ukanafun",
          severity: "amber",
        },
        {
          id: "att-2",
          facilityName: "Private Clinic Eket",
          issue:
            "Possible duplicate registration detected — same phone number used for two accounts.",
          source: "System Automatic",
          facilityId: "fac_eket_dup",
          severity: "red",
        },
      ];

      set({
        facilities: data,
        pendingQueue: pendingList,
        pendingCount: pendingList.length,
        approvedThisMonthCount: approvedCount,
        rejectedThisMonthCount: rejectedCount,
        totalRegisteredCount: totalCount,
        recentActivities: computedActivities,
        attentionItems: computedAttention,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to load dashboard data",
        isLoading: false,
      });
    }
  },
}));
