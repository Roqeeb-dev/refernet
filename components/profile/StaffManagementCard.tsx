"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/shared/Button";
import { useFacilityProfileStore } from "@/store/useFacilityProfileStore";
import ProfileSectionCard from "./ProfileSectionCard";
import StaffAdditionModal from "./StaffAdditionModal";

export default function StaffManagementCard() {
  const staff = useFacilityProfileStore((s) => s.staff);
  const addStaff = useFacilityProfileStore((s) => s.addStaff);
  const toggleStaffStatus = useFacilityProfileStore((s) => s.toggleStaffStatus);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ProfileSectionCard
      title="Staff Management"
      subtitle="Manage who can access and operate this facility's ReferNet account."
      headerAction={
        <Button
          variant="primary"
          size="sm"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={16} />
          Add Staff
        </Button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap py-xs pr-lg font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
                Name
              </th>
              <th className="whitespace-nowrap py-xs pr-lg font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
                Role
              </th>
              <th className="whitespace-nowrap py-xs pr-lg font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
                Email
              </th>
              <th className="whitespace-nowrap py-xs pr-lg font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
                Status
              </th>
              <th className="whitespace-nowrap py-xs font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr
                key={member.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="whitespace-nowrap py-sm pr-lg font-body text-body-sm font-medium text-text-primary">
                  {member.name}
                </td>
                <td className="whitespace-nowrap py-sm pr-lg font-body text-body-sm text-text-secondary">
                  {member.role}
                </td>
                <td className="whitespace-nowrap py-sm pr-lg font-body text-body-sm text-text-secondary">
                  {member.email}
                </td>
                <td className="whitespace-nowrap py-sm pr-lg">
                  <span
                    className={`inline-flex items-center gap-xs rounded-full px-sm py-[2px] font-body text-caption font-semibold ${
                      member.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-text-secondary"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        member.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                    {member.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="whitespace-nowrap py-sm">
                  <button
                    type="button"
                    onClick={() => toggleStaffStatus(member.id)}
                    className="font-body text-body-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
                  >
                    {member.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StaffAdditionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addStaff}
      />
    </ProfileSectionCard>
  );
}
