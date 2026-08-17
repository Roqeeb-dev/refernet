"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";
import UpdateFacilityStatusModal from "@/components/dashboard/UpdateFacilityStatusModal";
import { useFacilityStatusStore } from "@/store/useFacilityStatusStore";
import { useFacility } from "@/hooks/useFacility";
import {
  getFacilityAvailabilityOption,
  type FacilityAvailabilityStatus,
} from "@/lib/facility";

export default function CurrentStatusCard() {
  const status = useFacilityStatusStore((s) => s.status);
  const lastUpdated = useFacilityStatusStore((s) => s.lastUpdated);
  const { updateStatus, isUpdatingStatus } = useFacility();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusOption = getFacilityAvailabilityOption(status);

  async function handleSaveStatus(newStatus: FacilityAvailabilityStatus) {
    const { error } = await updateStatus(newStatus);

    if (error) {
      window.alert(`Couldn't update status: ${error}`);
      return;
    }

    setIsModalOpen(false);
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-lg">
      <h2 className="font-display text-heading-md font-bold text-text-primary">
        Current Status
      </h2>
      <p className="mb-base font-body text-body-sm text-text-secondary">
        Update your facility&apos;s live availability. This is visible to all
        referring facilities.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-base">
        <div
          className={`inline-flex items-center gap-sm rounded-lg border px-lg py-sm ${statusOption.bgColor} border-transparent`}
        >
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusOption.dotColor}`}
          />
          <div>
            <p className="font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
              Currently
            </p>
            <p
              className={`font-body text-body-md font-bold ${statusOption.textColor}`}
            >
              {statusOption.label}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          isLoading={isUpdatingStatus}
        >
          Update Status
        </Button>
      </div>

      <p className="mt-sm font-body text-caption text-text-disabled">
        Last Updated: {lastUpdated}
      </p>

      <UpdateFacilityStatusModal
        open={isModalOpen}
        currentStatus={status}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStatus}
      />
    </div>
  );
}
