"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Bell } from "lucide-react";
import Button from "@/components/shared/Button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminProfile } from "@/types/admin";
import {
  fetchAllAdminProfiles,
  toggleAdminSuspension,
} from "@/services/admin-management.service";

import EditAdminModal from "@/components/admin/EditAdminModal";
import AdminTableRow from "@/components/admin/AdminTableRow";
import {
  AdminLoadingState,
  AdminErrorState,
  AdminEmptyState,
} from "@/components/admin/AdminPageStates";

import {
  getInitials,
  formatLastLogin,
  formatRoleName,
  getRoleBadgeStyles,
} from "@/lib/utils";

export default function AdminAccountsPage() {
  const { admin: currentAdmin, isSuperAdmin } = useAdminAuth();

  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [selectedAdmin, setSelectedAdmin] = useState<AdminProfile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadAdmins = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    const { admins: data, error } = await fetchAllAdminProfiles();
    if (error) {
      setErrorMsg(error);
    } else {
      setAdmins(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  const handleOpenEdit = (adminToEdit: AdminProfile) => {
    setSelectedAdmin(adminToEdit);
    setIsEditModalOpen(true);
  };

  const handleToggleSuspend = async (adminToToggle: AdminProfile) => {
    setActionLoadingId(adminToToggle.id);
    const { success, error } = await toggleAdminSuspension(adminToToggle);
    if (!success) alert(`Error: ${error}`);
    else await loadAdmins();
    setActionLoadingId(null);
  };

  const filteredAdmins = admins.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-md font-body">
      {/* Top Bar Header */}
      <div className="mb-md flex items-center justify-between border-b border-gray-200 pb-sm">
        <h1 className="font-heading text-body-md font-bold text-text-primary">
          Admin Accounts
        </h1>
        <div className="flex items-center gap-sm">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-text-disabled" />
            <input
              type="text"
              placeholder="Search admins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 rounded-xl border border-gray-200 bg-white pl-8 pr-sm text-[11px] text-text-primary outline-none focus:border-emerald-600"
            />
          </div>
          <button
            type="button"
            className="relative rounded-xl border border-gray-200 bg-white p-xs text-text-secondary hover:bg-gray-50"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 font-bold text-white text-[11px]">
            {getInitials(currentAdmin?.fullName || "Admin")}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
        <div className="mb-md flex items-center justify-between">
          <div>
            <h2 className="font-heading text-body-lg font-bold text-text-primary">
              Admin Accounts
            </h2>
            <p className="mt-2xs text-[12px] text-text-secondary">
              Manage team members with access to the ReferNet Admin Portal.
            </p>
          </div>
          {isSuperAdmin && (
            <Button
              variant="primary"
              onClick={() =>
                alert("Super Admins manage registrations via Auth provider.")
              }
              className="flex items-center gap-xs bg-emerald-800 px-md py-2 text-[12px] font-bold text-white hover:bg-emerald-900 rounded-xl"
            >
              <Plus className="h-4 w-4" />
              Add Admin
            </Button>
          )}
        </div>

        {/* Dynamic States */}
        {isLoading && <AdminLoadingState />}
        {!isLoading && errorMsg && (
          <AdminErrorState errorMsg={errorMsg} onRetry={loadAdmins} />
        )}
        {!isLoading && !errorMsg && filteredAdmins.length === 0 && (
          <AdminEmptyState searchQuery={searchQuery} />
        )}

        {/* Table View */}
        {!isLoading && !errorMsg && filteredAdmins.length > 0 && (
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
                {filteredAdmins.map((admin) => (
                  <AdminTableRow
                    key={admin.id}
                    admin={admin}
                    isActionLoading={actionLoadingId === admin.id}
                    onEdit={handleOpenEdit}
                    onToggleSuspend={handleToggleSuspend}
                    getInitials={getInitials}
                    formatLastLogin={formatLastLogin}
                    formatRoleName={formatRoleName}
                    getRoleBadgeStyles={getRoleBadgeStyles}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal Component */}
      {selectedAdmin && (
        <EditAdminModal
          admin={selectedAdmin}
          currentAdminId={currentAdmin?.id}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={loadAdmins}
          getInitials={getInitials}
        />
      )}
    </div>
  );
}
