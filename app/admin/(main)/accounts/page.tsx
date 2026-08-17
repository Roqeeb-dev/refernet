"use client";

import React, { useState } from "react";
import { Plus, Check, AlertTriangle, Search, Bell } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Verification Officer" | "Support Officer";
  status: "Active" | "Suspended";
  lastLogin: string;
  twoFactorEnabled: boolean;
  avatarInitials: string;
}

const mockAdmins: AdminUser[] = [
  {
    id: "1",
    name: "Zainab Babalola",
    email: "zainab@refernet.ng",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Today, 9:14 AM",
    twoFactorEnabled: true,
    avatarInitials: "ZB",
  },
  {
    id: "2",
    name: "Amaka Osei",
    email: "amaka@refernet.ng",
    role: "Verification Officer",
    status: "Active",
    lastLogin: "Today, 8:52 AM",
    twoFactorEnabled: true,
    avatarInitials: "AO",
  },
  {
    id: "3",
    name: "Emmanuel Bassey",
    email: "emmanuel@refernet.ng",
    role: "Support Officer",
    status: "Suspended",
    lastLogin: "Yesterday, 5:30 PM",
    twoFactorEnabled: false,
    avatarInitials: "EB",
  },
];

export default function AdminAccountsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdmins);

  const toggleSuspend = (id: string) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === "Active" ? "Suspended" : "Active",
            }
          : admin,
      ),
    );
  };

  const getRoleBadgeStyles = (role: AdminUser["role"]) => {
    switch (role) {
      case "Super Admin":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "Verification Officer":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Support Officer":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-md font-body">
      {/* Top Bar Header */}
      <div className="mb-md flex items-center justify-between border-b border-gray-200 pb-sm">
        <h1 className="font-heading text-body-md font-bold text-text-primary">
          Admin Accounts
        </h1>
        <div className="flex items-center gap-sm">
          <button
            type="button"
            className="rounded-xl border border-gray-200 bg-white p-xs text-text-secondary hover:bg-gray-50"
          >
            <Search className="h-4 w-4" />
          </button>
          <div className="relative">
            <button
              type="button"
              className="rounded-xl border border-gray-200 bg-white p-xs text-text-secondary hover:bg-gray-50"
            >
              <Bell className="h-4 w-4" />
            </button>

            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 font-bold text-white text-[11px]">
            ZB
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
        {/* Title Bar & Action */}
        <div className="mb-md flex items-center justify-between">
          <div>
            <h2 className="font-heading text-body-lg font-bold text-text-primary">
              Admin Accounts
            </h2>
            <p className="mt-2xs text-[12px] text-text-secondary">
              Manage team members with access to the ReferNet Admin Portal.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-xs rounded-xl bg-emerald-800 px-md py-2 font-body text-[12px] font-bold text-white hover:bg-emerald-900 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Admin
          </button>
        </div>

        {/* Admin Accounts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                <th className="py-2xs px-sm">NAME</th>
                <th className="py-2xs px-sm">EMAIL</th>
                <th className="py-2xs px-sm">ROLE</th>
                <th className="py-2xs px-sm">STATUS</th>
                <th className="py-2xs px-sm">LAST LOGIN</th>
                <th className="py-2xs px-sm">2FA</th>
                <th className="py-2xs px-sm text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50/40">
                  {/* Name & Avatar */}
                  <td className="py-sm px-sm font-semibold text-text-primary">
                    <div className="flex items-center gap-xs">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 font-bold text-white text-[10px]">
                        {admin.avatarInitials}
                      </div>
                      <span>{admin.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-sm px-sm text-text-secondary font-mono text-[10px]">
                    {admin.email}
                  </td>

                  {/* Role */}
                  <td className="py-sm px-sm">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getRoleBadgeStyles(
                        admin.role,
                      )}`}
                    >
                      {admin.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-sm px-sm">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          admin.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                      />
                      <span
                        className={`font-bold text-[10px] ${
                          admin.status === "Active"
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }`}
                      >
                        {admin.status}
                      </span>
                    </div>
                  </td>

                  {/* Last Login */}
                  <td className="py-sm px-sm text-text-secondary text-[10px]">
                    {admin.lastLogin}
                  </td>

                  {/* 2FA */}
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

                  {/* Actions */}
                  <td className="py-sm px-sm text-center">
                    <div className="flex items-center justify-center gap-xs">
                      <button
                        type="button"
                        className="rounded-lg border border-gray-200 px-2.5 py-1 text-[10px] font-bold text-text-secondary hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>

                      {admin.role !== "Super Admin" && (
                        <button
                          type="button"
                          onClick={() => toggleSuspend(admin.id)}
                          className="rounded-lg border border-amber-200 bg-amber-50/50 px-2.5 py-1 text-[10px] font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                        >
                          {admin.status === "Active" ? "Suspend" : "Unsuspend"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
