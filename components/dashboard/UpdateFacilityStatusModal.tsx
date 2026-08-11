"use client";

import { useEffect, useState } from "react";
import Button from "@/components/shared/Button";
import {
  FACILITY_STATUS_OPTIONS,
  type FacilityStatusValue,
} from "@/lib/facilityStatus";

interface UpdateFacilityStatusModalProps {
  isOpen: boolean;
  currentStatus: FacilityStatusValue;
  onClose: () => void;
  onSave: (status: FacilityStatusValue) => void;
}

export default function UpdateFacilityStatusModal({
  isOpen,
  currentStatus,
  onClose,
  onSave,
}: UpdateFacilityStatusModalProps) {
  const [selected, setSelected] = useState<FacilityStatusValue>(currentStatus);

  useEffect(() => {
    if (isOpen) setSelected(currentStatus);
  }, [isOpen, currentStatus]);

  if (!isOpen) return null;

  function handleSave() {
    onSave(selected);
    onClose();
  }

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-green-900/40 p-base backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Update facility status"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] rounded-2xl bg-white p-lg shadow-floating"
      >
        <h2 className="mb-base border-b border-gray-100 pb-base font-mono text-heading-lg font-bold text-green-900">
          Update Facility Status
        </h2>

        <div className="flex flex-col gap-sm">
          {FACILITY_STATUS_OPTIONS.map((option) => {
            const active = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelected(option.value)}
                aria-pressed={active}
                className={`flex items-center justify-between rounded-xl border p-md text-left transition-colors ${
                  active
                    ? `${option.bgColor} border-transparent`
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <span className="flex items-center gap-sm">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${option.dotColor}`}
                  />
                  <span
                    className={`font-body text-body-lg font-medium ${
                      active ? option.textColor : "text-text-primary"
                    }`}
                  >
                    {option.label}
                  </span>
                </span>
                {active && (
                  <span
                    className={`h-7 w-7 shrink-0 rounded-full ${option.dotColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-xl flex gap-sm border-t border-gray-100 pt-lg">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200 text-text-primary hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleSave}>
            Save Status
          </Button>
        </div>
      </div>
    </div>
  );
}
