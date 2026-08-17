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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[460px] rounded-[20px] bg-white p-6 shadow-2xl transition-all">
        {/* Header */}
        <h2 className="font-serif text-[22px] font-bold text-[#0F392B]">
          Accept Referral
        </h2>
        <div className="mt-4 border-b border-gray-100" />

        {/* Patient Summary Card */}
        <div className="mt-5 rounded-2xl bg-[#E8F5E9]/60 p-4 border border-[#C8E6C9]/60">
          <p className="text-[15px] font-bold text-[#1B4332]">
            {patientName}, {patientAge} {patientSex}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#FFEBEE] px-2 py-0.5 text-xs font-semibold text-[#D32F2F] border border-[#FFCDD2]/50">
              <span className="text-[10px]">●</span> {urgency}
            </span>
            <span className="text-xs font-medium text-[#558B2F]">
              {referenceNumber}
            </span>
          </div>
        </div>

        {/* Confirmation Text */}
        <p className="mt-5 text-sm leading-relaxed text-[#4A5568]">
          By accepting, you confirm that your facility is able to receive and
          treat this patient. The referring facility will be notified
          immediately.
        </p>

        {/* Divider */}
        <div className="mt-6 border-b border-gray-100" />

        {/* Modal Actions */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-[#4A5568] hover:bg-gray-50 hover:text-[#2D3748]"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#1B7340] py-3 text-sm font-bold text-white hover:bg-[#145A32] disabled:opacity-50"
          >
            {isSubmitting ? "Accepting..." : "Confirm Accept"}
          </Button>
        </div>
      </div>
    </div>
  );
}
