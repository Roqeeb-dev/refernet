// MOCK DASHBOARD DATA

import { Inbox, Send, Clock, TrendingUp } from "lucide-react";
import { Facility } from "./facility";

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

export const MOCK_FACILITIES: Facility[] = [
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678901",
    name: "Lagos Island General Hospital",
    type: "general_hospital",
    distanceKm: 2.3,
    address: "Lagos Island, Lagos",
    updatedMinutesAgo: 8,
    status: "accepting",
  },
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678902",
    name: "Lagos University Teaching Hospital",
    type: "tertiary_hospital",
    distanceKm: 5.1,
    address: "Idi-Araba, Lagos",
    updatedMinutesAgo: 12,
    status: "limited",
    note: "Limited beds — confirm before sending",
  },
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678903",
    name: "Reddington Hospital",
    type: "specialist_hospital",
    distanceKm: 8.7,
    address: "Victoria Island, Lagos",
    updatedMinutesAgo: 3,
    status: "emergency_only",
    note: "Only emergency cases accepted",
  },
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678904",
    name: "St Nicholas Hospital",
    type: "specialist_hospital",
    distanceKm: 12.4,
    address: "Lagos Island, Lagos",
    updatedMinutesAgo: 6,
    status: "accepting",
  },
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678905",
    name: "UCH — University College Hospital",
    type: "tertiary_hospital",
    distanceKm: 134,
    address: "Ibadan North, Oyo",
    updatedMinutesAgo: 60,
    status: "unavailable",
  },
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678906",
    name: "Eko Hospital",
    type: "specialist_hospital",
    distanceKm: 3.9,
    address: "Surulere, Lagos",
    updatedMinutesAgo: 2,
    status: "accepting",
  },
];
