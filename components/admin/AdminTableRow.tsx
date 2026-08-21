"use client";

import { Check, AlertTriangle } from "lucide-react";
import { AdminProfile, AdminRole } from "@/types/admin";

interface AdminTableRowProps {
  admin: AdminProfile;
  isActionLoading: boolean;
  onEdit: (admin: AdminProfile) => void;
  onToggleSuspend: (admin: AdminProfile) => void;
  getInitials: (name: string) => string;
  formatLastLogin: (date: string | null) => string;
  formatRoleName: (role: AdminRole) => string;
  getRoleBadgeStyles: (role: AdminRole) => string;
}

export default function AdminTableRow({
  admin,
  isActionLoading,
  onEdit,
  onToggleSuspend,
  getInitials,
  formatLastLogin,
  formatRoleName,
  getRoleBadgeStyles,
}: AdminTableRowProps) {
  return (
    <tr className="hover:bg-gray-50/40">
      <td className="py-sm px-sm font-semibold text-text-primary">
        <div className="flex items-center gap-xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 font-bold text-white text-[10px]">
            {getInitials(admin.fullName)}
          </div>
          <span>{admin.fullName}</span>
        </div>
      </td>

      <td className="py-sm px-sm text-text-secondary font-mono text-[10px]">
        {admin.email}
      </td>

      <td className="py-sm px-sm">
        <span
          className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getRoleBadgeStyles(
            admin.role,
          )}`}
        >
          {formatRoleName(admin.role)}
        </span>
      </td>

      <td className="py-sm px-sm">
        <div className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              admin.status === "active" ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          <span
            className={`font-bold text-[10px] capitalize ${
              admin.status === "active" ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            {admin.status}
          </span>
        </div>
      </td>

      <td className="py-sm px-sm text-text-secondary text-[10px]">
        {formatLastLogin(admin.lastLoginAt)}
      </td>

      <td className="py-sm px-sm">
        {admin.twoFactorEnabled ? (
          <div className="flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
            <Check className="h-3.5 w-3.5" />
            <span>Enabled</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600 font-bold text-[10px]">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Not configured</span>
          </div>
        )}
      </td>

      <td className="py-sm px-sm text-center">
        <div className="flex items-center justify-center gap-xs">
          <button
            type="button"
            onClick={() => onEdit(admin)}
            className="rounded-lg border border-gray-200 px-2.5 py-1 text-[10px] font-bold text-text-secondary hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>

          {admin.role !== "super_admin" && (
            <button
              type="button"
              disabled={isActionLoading}
              onClick={() => onToggleSuspend(admin)}
              className="rounded-lg border border-amber-200 bg-amber-50/50 px-2.5 py-1 text-[10px] font-bold text-amber-800 hover:bg-amber-100 transition-colors disabled:opacity-50"
            >
              {isActionLoading
                ? "Updating..."
                : admin.status === "active"
                  ? "Suspend"
                  : "Unsuspend"}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
