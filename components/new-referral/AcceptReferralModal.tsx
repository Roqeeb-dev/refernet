"use client";

import Button from "@/components/shared/Button";

interface AcceptReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patientName: string;
  patientAge: string;
  patientSex: string;
  urgency: string;
  referenceNumber: string;
  isSubmitting?: boolean;
}

export default function AcceptReferralModal({
  isOpen,
  onClose,
  onConfirm,
  patientName,
  patientAge,
  patientSex,
  urgency,
  referenceNumber,
  isSubmitting = false,
}: AcceptReferralModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-base backdrop-blur-xs">
      <div className="w-full max-w-[500px] rounded-2xl bg-white p-lg shadow-xl border border-gray-100">
        <h2 className="font-heading text-heading-xs font-bold text-text-primary">
          Accept Referral
        </h2>

        {/* Patient Summary Card */}
        <div className="mt-base rounded-xl bg-emerald-50/50 p-base border border-emerald-100/60">
          <p className="font-body text-body-sm font-bold text-emerald-950">
            {patientName}, {patientAge} {patientSex}
          </p>
          <div className="mt-xs flex items-center gap-xs">
            <span className="rounded-full bg-red-100 px-sm py-[2px] font-body text-caption font-bold text-red-700">
              ● {urgency}
            </span>
            <span className="font-body text-caption font-medium text-emerald-800">
              {referenceNumber}
            </span>
          </div>
        </div>

        {/* Confirmation Text */}
        <p className="mt-base font-body text-body-xs text-text-secondary leading-relaxed">
          By accepting, you confirm that your facility is able to receive and
          treat this patient. The referring facility will be notified
          immediately.
        </p>

        {/* Modal Actions */}
        <div className="mt-lg flex items-center justify-end gap-sm">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full border-gray-200 text-text-primary hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            {isSubmitting ? "Accepting..." : "Confirm Accept"}
          </Button>
        </div>
      </div>
    </div>
  );
}
