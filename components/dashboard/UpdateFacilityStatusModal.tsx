"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";
import {
  FACILITY_AVAILABILITY_OPTIONS,
  type FacilityAvailabilityStatus,
} from "@/lib/facility";

interface UpdateFacilityStatusModalProps {
  open: boolean;
  currentStatus: FacilityAvailabilityStatus;
  onClose: () => void;
  onSave: (status: FacilityAvailabilityStatus) => void | Promise<void>;
}

export default function UpdateFacilityStatusModal({
  open,
  currentStatus,
  onClose,
  onSave,
}: UpdateFacilityStatusModalProps) {
  const [selected, setSelected] =
    useState<FacilityAvailabilityStatus>(currentStatus);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(selected);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-base">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Update Facility Status"
        className="w-full max-w-[500px] rounded-2xl bg-white p-xl shadow-floating"
      >
        <h2 className="mb-lg font-display text-heading-lg font-bold text-green-900">
          Update Facility Status
        </h2>

        <div className="flex flex-col gap-sm">
          {FACILITY_AVAILABILITY_OPTIONS.map((option) => {
            const active = option.value === selected;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelected(option.value)}
                className={`flex items-center justify-between rounded-lg border px-base py-base text-left transition-colors ${
                  active
                    ? `${option.bgColor} border-green-200`
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-sm">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${option.dotColor}`}
                  />
                  <span
                    className={`font-body text-body-md font-semibold ${
                      active ? option.textColor : "text-text-primary"
                    }`}
                  >
                    {option.longLabel}
                  </span>
                </span>
                {active && (
                  <span className={`h-5 w-5 rounded-full ${option.dotColor}`} />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-xl flex items-center gap-sm">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleSave}
            isLoading={saving}
          >
            Save Status
          </Button>
        </div>
      </div>
    </div>
  );
}
