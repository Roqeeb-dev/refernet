"use client";

import { Check } from "lucide-react";
import Button from "@/components/shared/Button";

interface DeclineSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  referringFacilityName: string;
  reasonGiven: string;
}

export default function DeclineSuccessModal({
  isOpen,
  onClose,
  referringFacilityName,
  reasonGiven,
}: DeclineSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-base backdrop-blur-xs">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-lg text-center shadow-xl border border-gray-100">
        {/* Success Icon */}
        <div className="mx-auto mb-md flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <Check className="h-7 w-7 stroke-[2.5]" />
        </div>

        <h2 className="font-heading text-heading-xs font-bold text-text-primary">
          Referral Declined
        </h2>
        <p className="mt-xs font-body text-body-xs text-text-secondary">
          <strong className="font-semibold text-text-primary">
            {referringFacilityName}
          </strong>{" "}
          has been notified of the decline and the reason provided.
        </p>

        {/* Reason Box */}
        <div className="mt-base rounded-xl bg-gray-50/70 p-sm text-left border border-gray-100">
          <span className="font-body text-caption font-bold tracking-wider text-text-disabled uppercase">
            REASON SENT TO REFERRING FACILITY
          </span>
          <p className="mt-xs font-body text-body-xs font-medium text-text-primary">
            {reasonGiven || "No reason specified."}
          </p>
        </div>

        {/* Done Button */}
        <Button
          variant="primary"
          onClick={onClose}
          className="mt-lg w-full bg-slate-900 hover:bg-slate-800 text-white py-sm rounded-xl font-body text-body-xs font-bold"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
