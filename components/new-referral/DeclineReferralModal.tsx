"use client";

import { useState } from "react";
import { RotateCcw, ArrowRightLeft } from "lucide-react";
import Button from "@/components/shared/Button";

interface DeclineReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, actionType: "return" | "re-refer") => void;
  patientName: string;
  referenceNumber: string;
  referringFacilityName: string;
  isSubmitting?: boolean;
}

export default function DeclineReferralModal({
  isOpen,
  onClose,
  onConfirm,
  patientName,
  referenceNumber,
  referringFacilityName,
  isSubmitting = false,
}: DeclineReferralModalProps) {
  const [reason, setReason] = useState("");
  const [nextAction, setNextAction] = useState<"return" | "re-refer">("return");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm(reason, nextAction);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-base backdrop-blur-xs">
      <div className="w-full max-w-[500px] rounded-2xl bg-white p-lg shadow-xl border border-gray-100">
        <h2 className="font-heading text-heading-xs font-bold text-text-primary">
          Decline Referral
        </h2>

        {/* Patient Summary Header Tag */}
        <div className="mt-base rounded-xl bg-red-50/60 p-sm border border-red-100 font-body text-body-xs font-bold text-red-800">
          {patientName} · {referenceNumber}
        </div>

        {/* Reason Textarea */}
        <div className="mt-base flex flex-col gap-xs">
          <label className="font-body text-caption font-bold text-text-primary">
            Reason for declining
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why you are unable to accept this referral. This will be shared with the referring facility."
            className="w-full rounded-xl border border-gray-200 p-sm font-body text-body-xs text-text-primary placeholder:text-text-disabled focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* What Happens Next Radio Group */}
        <div className="mt-base flex flex-col gap-xs">
          <label className="font-body text-caption font-bold text-text-primary">
            What happens next for the patient?
          </label>

          <div className="flex flex-col gap-sm">
            {/* Option 1: Return to Referring Facility */}
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
                  Patient is sent back to the referring facility
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

            {/* Option 2: Refer to Another Facility */}
            <div
              onClick={() => setNextAction("re-refer")}
              className={`flex cursor-pointer items-start gap-sm rounded-xl border p-sm transition-all ${
                nextAction === "re-refer"
                  ? "border-red-500 bg-red-50/20 shadow-xs"
                  : "border-gray-100 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="mt-[2px] flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                <ArrowRightLeft size={16} />
              </div>
              <div className="flex-1">
                <p className="font-body text-body-xs font-bold text-text-primary">
                  Refer to Another Facility
                </p>
                <p className="font-body text-caption text-text-disabled">
                  You select a suitable facility and initiate a new referral
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

        {/* Action Buttons */}
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
            disabled={isSubmitting || !reason.trim()}
            className="w-full bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300"
          >
            {isSubmitting ? "Declining..." : "Confirm Decline"}
          </Button>
        </div>
      </div>
    </div>
  );
}
