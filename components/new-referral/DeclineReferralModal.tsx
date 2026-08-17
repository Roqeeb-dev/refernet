"use client";

import { useState } from "react";
import { RotateCcw, ArrowRightLeft } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-base backdrop-blur-xs">
      <div className="max-h-[90vh] w-full max-w-[500px] overflow-y-auto rounded-2xl bg-white p-lg shadow-xl border border-gray-100">
        <h2 className="font-heading text-heading-xs font-bold text-text-primary">
          Decline Referral
        </h2>

        <div className="mt-base rounded-xl bg-red-50/60 p-sm border border-red-100 font-body text-body-xs font-bold text-red-800">
          {patientName} · {referenceNumber}
        </div>

        <div className="mt-base flex flex-col gap-xs">
          <label className="font-body text-caption font-bold text-text-primary">
            Reason for declining
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why you are unable to accept this referral."
            className="w-full rounded-xl border border-gray-200 p-sm font-body text-body-xs text-text-primary focus:border-red-400 focus:outline-none"
          />
        </div>

        <div className="mt-base flex flex-col gap-xs">
          <label className="font-body text-caption font-bold text-text-primary">
            What happens next for the patient?
          </label>

          <div className="flex flex-col gap-sm">
            <div
              onClick={() => setNextAction("return")}
              className={`flex cursor-pointer items-start gap-sm rounded-xl border p-sm transition-all ${
                nextAction === "return"
                  ? "border-red-500 bg-red-50/20 shadow-xs"
                  : "border-gray-100 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="mt-[2px] flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-700">
                <RotateCcw size={16} />
              </div>
              <div className="flex-1">
                <p className="font-body text-body-xs font-bold text-text-primary">
                  Return to {referringFacilityName}
                </p>
                <p className="font-body text-caption text-text-disabled">
                  Patient is sent back to referring facility
                </p>
              </div>
              <input
                type="radio"
                name="nextAction"
                checked={nextAction === "return"}
                onChange={() => setNextAction("return")}
                className="mt-xs accent-red-600"
              />
            </div>

            <div
              onClick={() => setNextAction("re-refer")}
              className={`flex cursor-pointer items-start gap-sm rounded-xl border p-sm transition-all ${
                nextAction === "re-refer"
                  ? "border-red-500 bg-red-50/20 shadow-xs"
                  : "border-gray-100 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="mt-[2px] flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-700">
                <ArrowRightLeft size={16} />
              </div>
              <div className="flex-1">
                <p className="font-body text-body-xs font-bold text-red-800">
                  Refer to Another Facility
                </p>
                <p className="font-body text-caption text-text-disabled">
                  Initiate a new referral to another facility
                </p>
              </div>
              <input
                type="radio"
                name="nextAction"
                checked={nextAction === "re-refer"}
                onChange={() => setNextAction("re-refer")}
                className="mt-xs accent-red-600"
              />
            </div>
          </div>
        </div>

        {isReRefer && (
          <FacilitySelector
            selectedFacilityId={selectedFacility?.id}
            onSelectFacility={(fac) => setSelectedFacility(fac)}
          />
        )}

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
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="w-full bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300"
          >
            {isSubmitting
              ? "Processing..."
              : isReRefer
                ? "Confirm & Re-refer"
                : "Confirm Decline"}
          </Button>
        </div>
      </div>
    </div>
  );
}
