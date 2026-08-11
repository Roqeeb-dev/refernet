// MOCK DASHBOARD DATA

import { Inbox, Send, Clock, TrendingUp } from "lucide-react";

export const DASHBOARD_STATS = [
  {
    label: "Incoming Referrals",
    sublabel: "This month",
    value: "12",
    icon: Inbox,
    iconBg: "bg-info-light",
    iconColor: "text-info",
    valueColor: "text-info",
  },
  {
    label: "Outgoing Referrals",
    sublabel: "This month",
    value: "8",
    icon: Send,
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    valueColor: "text-green-700",
  },
  {
    label: "Pending Acceptance",
    sublabel: "Awaiting response",
    value: "3",
    icon: Clock,
    iconBg: "bg-urgent-light",
    iconColor: "text-urgent",
    valueColor: "text-urgent",
  },
  {
    label: "Acceptance Rate",
    sublabel: "Last 30 days",
    value: "87%",
    icon: TrendingUp,
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    valueColor: "text-green-700",
  },
];

export const DASHBOARD_RECENT_ACTIVITY = [
  {
    text: "New referral received from General Hospital Ikeja (REF-2026-0043)",
    time: "2 min ago",
  },
  {
    text: "Referral REF-2026-0041 accepted by Lagos Island General Hospital",
    time: "15 min ago",
  },
  {
    text: "Patient status updated for REF-2026-0038 — arrived safely",
    time: "1 hr ago",
  },
  {
    text: "New referral received from Reddington Hospital Abuja",
    time: "3 hrs ago",
  },
  {
    text: "REF-2026-0035 marked as completed successfully",
    time: "Yesterday",
  },
];

export const DASHBOARD_RECENT_OUTGOING = [
  {
    referenceCode: "REF-2026-0043",
    facility: "Amina Okoye",
    dateSent: "Aug 9, 2026",
  },
  {
    referenceCode: "REF-2026-0041",
    facility: "Lagos Island General Hospital",
    dateSent: "Aug 8, 2026",
  },
  {
    referenceCode: "REF-2026-0038",
    facility: "Reddington Hospital Abuja",
    dateSent: "Aug 7, 2026",
  },
];
