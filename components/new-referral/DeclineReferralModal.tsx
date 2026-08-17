"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";
import FacilitySelector, { Facility } from "./FacilitySelector";
import DeclineSuccessModal from "./DeclineSuccessModal";

interface DeclineReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  referenceNumber: string;
  referringFacilityName: string;
  onConfirm: (
    reason: string,
    actionType: "return" | "re-refer",
    targetFacilityId?: string,
  ) => Promise<void>;
  isSubmitting?: boolean;
}

export default function DeclineReferralModal({
  isOpen,
  onClose,
  patientName,
  referenceNumber,
  referringFacilityName,
  onConfirm,
  isSubmitting = false,
}: DeclineReferralModalProps) {
  const [reason, setReason] = useState("");
  const [nextAction, setNextAction] = useState<"return" | "re-refer">("return");
  const [selectedFacility, setSelectedFacility] = useState<
    Facility | undefined
  >();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isOpen) return null;

  const isReRefer = nextAction === "re-refer";
  const isSubmitDisabled =
    isSubmitting || !reason.trim() || (isReRefer && !selectedFacility);

  const handleSubmit = async () => {
    try {
      await onConfirm(reason, nextAction, selectedFacility?.id);
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    onClose();
  };

  if (showSuccessModal) {
    return (
      <DeclineSuccessModal
        isOpen={true}
        onClose={handleFinish}
        referringFacilityName={referringFacilityName}
        reasonGiven={reason}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
      <div className="max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-2xl transition-all">
        {/* Header */}
        <h2 className="font-serif text-[22px] font-bold text-[#0F392B]">
          Decline Referral
        </h2>
        <div className="mt-3 border-b border-gray-100" />

        {/* Patient Red Banner Tag */}
        <div className="mt-4 rounded-xl bg-[#FDE8E8] px-4 py-2.5 text-center text-xs font-bold text-[#C81E1E]">
          {patientName} · {referenceNumber}
        </div>

        {/* Reason Textarea Section */}
        <div className="mt-4 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#2D3748]">
            Reason for declining
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why you are unable to accept this referral. This will be shared with the referring facility."
            className="w-full resize-none rounded-xl border border-gray-200 p-3 text-xs text-[#2D3748] placeholder:text-gray-400 focus:border-[#1B7340] focus:outline-none focus:ring-1 focus:ring-[#1B7340]"
          />
        </div>

        {/* What Happens Next Section */}
        <div className="mt-4 flex flex-col gap-2">
          <label className="text-xs font-bold text-[#2D3748]">
            What happens next for the patient?
          </label>

          <div className="flex flex-col gap-2.5">
            {/* Option 1: Return */}
            <div
              onClick={() => setNextAction("return")}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${
                nextAction === "return"
                  ? "border-emerald-200 bg-white"
                  : "border-gray-100 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="pt-0.5">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    nextAction === "return"
                      ? "border-[#1B7340] bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {nextAction === "return" && (
                    <span className="h-2 w-2 rounded-full bg-[#1B7340]" />
                  )}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#2D3748]">
                  Return to {referringFacilityName}
                </p>
                <p className="mt-0.5 text-[11px] text-[#718096]">
                  Patient is sent back to the referring facility
                </p>
              </div>
            </div>

            {/* Option 2: Re-refer */}
            <div
              onClick={() => setNextAction("re-refer")}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${
                nextAction === "re-refer"
                  ? "border-emerald-200 bg-white"
                  : "border-gray-100 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="pt-0.5">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    nextAction === "re-refer"
                      ? "border-[#1B7340] bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {nextAction === "re-refer" && (
                    <span className="h-2 w-2 rounded-full bg-[#1B7340]" />
                  )}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#2D3748]">
                  Refer to Another Facility
                </p>
                <p className="mt-0.5 text-[11px] text-[#718096]">
                  You select a suitable facility and initiate a new referral
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Facility Selector when re-referring */}
        {isReRefer && (
          <div className="mt-3">
            <FacilitySelector
              selectedFacilityId={selectedFacility?.id}
              onSelectFacility={(fac) => setSelectedFacility(fac)}
            />
          </div>
        )}

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
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
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="w-full rounded-xl bg-[#1B7340] py-3 text-sm font-bold text-white hover:bg-[#145A32] disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Proceed"}
          </Button>
        </div>
      </div>
    </div>
  );
}
