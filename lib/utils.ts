import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AdminRole } from "@/types/admin";
import { AdminFacility } from "@/services/admin-facilities.service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  if (!name) return "AD";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

export function formatLastLogin(isoString: string | null): string {
  if (!isoString) return "Never";
  const date = new Date(isoString);
  const isToday = date.toDateString() === new Date().toDateString();
  const timeStr = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return isToday
    ? `Today, ${timeStr}`
    : `${date.toLocaleDateString([], { month: "short", day: "numeric" })}, ${timeStr}`;
}

export function formatRoleName(role: AdminRole): string {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "verification_officer":
      return "Verification Officer";
    case "support_officer":
      return "Support Officer";
    default:
      return role;
  }
}

export function getRoleBadgeStyles(role: AdminRole): string {
  switch (role) {
    case "super_admin":
      return "bg-slate-100 text-slate-800 border-slate-200";
    case "verification_officer":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "support_officer":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export function getTierBadgeStyles(tier: AdminFacility["tier"]) {
  switch (tier) {
    case "Tier 3 — MoH":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Tier 2 — Verified":
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "Tier 1":
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export function getStatusBadgeStyles(status: AdminFacility["status"]) {
  switch (status) {
    case "Active":
      return "bg-emerald-100/70 text-emerald-800";
    case "Pending":
      return "bg-blue-100/70 text-blue-700";
    case "Suspended":
      return "bg-red-100/70 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
