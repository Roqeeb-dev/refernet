"use client";

import React, { useState } from "react";
import { X, Check, Building2 } from "lucide-react";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilityName?: string;
}

export default function ApproveModal({
  isOpen,
  onClose,
  facilityName = "Grace Medical Clinic",
}: ApproveModalProps) {
  const [selectedTier, setSelectedTier] = useState<"tier1" | "tier2">("tier1");
  const [internalNote, setInternalNote] = useState("");
  const [approvalMessage, setApprovalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleCloseAll = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-sm backdrop-blur-xs">
      {!isSuccess ? (
        <div className="relative w-full max-w-[640px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-md shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between pb-xs border-b border-gray-100">
            <h2 className="font-heading text-body-md font-bold text-text-primary">
              Approve Verification for {facilityName}?
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Info Banner */}
          <div className="mt-sm rounded-xl bg-emerald-50/70 p-xs text-[11px] border border-emerald-100/80 border-l-4 border-l-emerald-600">
            <p className="font-bold text-emerald-900 uppercase tracking-wider text-[9px]">
              WHEN YOU APPROVE:
            </p>
            <p className="mt-2xs font-bold text-emerald-900">
              {facilityName}{" "}
              <span className="font-normal text-emerald-800">
                will be upgraded to Tier 1 — Verified.
              </span>
            </p>
            <p className="text-emerald-700">
              A "Verified" badge will appear on their facility card in the
              directory.
            </p>
            <p className="text-emerald-700">
              The facility account holder will receive an SMS and in-app
              notification.
            </p>
          </div>

          <form onSubmit={handleConfirm} className="mt-sm flex flex-col gap-sm">
            {/* Confirm Tier Selection */}
            <div>
              <label className="block font-body text-[11px] font-bold text-text-primary mb-2xs">
                Confirm verification tier:
              </label>
              <div className="flex flex-col gap-xs">
                {/* Tier 1 Option */}
                <div
                  onClick={() => setSelectedTier("tier1")}
                  className={`flex items-start justify-between rounded-xl border p-xs cursor-pointer transition-all ${
                    selectedTier === "tier1"
                      ? "border-emerald-600 bg-emerald-50/20"
                      : "border-gray-200 hover:bg-gray-50/60"
                  }`}
                >
                  <div className="flex items-start gap-xs">
                    <Check className="mt-[2px] h-3.5 w-3.5 text-emerald-700" />
                    <div>
                      <p className="font-body text-[11px] font-bold text-emerald-900">
                        Tier 1 — Verified
                      </p>
                      <p className="font-body text-[10px] text-text-secondary">
                        Standard verification — document submitted and reviewed.
                      </p>
                    </div>
                  </div>
                  {selectedTier === "tier1" && (
                    <Check className="h-3.5 w-3.5 text-emerald-700" />
                  )}
                </div>

                {/* Tier 2 Option */}
                <div
                  onClick={() => setSelectedTier("tier2")}
                  className={`flex items-start justify-between rounded-xl border p-xs cursor-pointer transition-all ${
                    selectedTier === "tier2"
                      ? "border-emerald-600 bg-emerald-50/20"
                      : "border-gray-200 hover:bg-gray-50/60"
                  }`}
                >
                  <div className="flex items-start gap-xs">
                    <Building2 className="mt-[2px] h-3.5 w-3.5 text-amber-700" />
                    <div>
                      <p className="font-body text-[11px] font-bold text-text-primary">
                        Tier 2 — MoH-Linked
                      </p>
                      <p className="font-body text-[10px] text-text-secondary">
                        Government facility linked to state MoH dashboard.
                      </p>
                    </div>
                  </div>
                  {selectedTier === "tier2" && (
                    <Check className="h-3.5 w-3.5 text-emerald-700" />
                  )}
                </div>
              </div>
            </div>

            {/* Internal Note */}
            <div>
              <label className="block font-body text-[11px] font-bold text-text-primary mb-2xs">
                Internal approval note{" "}
                <span className="font-normal text-text-disabled">
                  (optional — not shared with facility)
                </span>
              </label>
              <input
                type="text"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="e.g. NHIA number manually confirmed with AKSHIA call centre."
                className="w-full rounded-xl border border-gray-200 px-sm py-1.5 font-body text-[11px] text-text-primary outline-none focus:border-emerald-700"
              />
            </div>

            {/* Message to Facility */}
            <div>
              <label className="block font-body text-[11px] font-bold text-text-primary mb-2xs">
                Approval message to facility (editable)
              </label>
              <textarea
                rows={2.5}
                value={approvalMessage}
                onChange={(e) => setApprovalMessage(e.target.value)}
                placeholder="Optional custom message..."
                className="w-full rounded-xl border border-gray-200 p-xs font-body text-[11px] text-text-primary outline-none focus:border-emerald-700 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-xs pt-2xs">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-200 px-md py-1.5 font-body text-[11px] font-bold text-text-secondary hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-800 px-md py-1.5 font-body text-[11px] font-bold text-white hover:bg-emerald-900 transition-colors"
              >
                Confirm Approval
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Verification Approved Success Screen */
        <div className="relative w-full max-w-[580px] rounded-2xl bg-white p-lg text-center shadow-xl">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-5 w-5 text-emerald-800" />
          </div>
          <h3 className="mt-xs font-heading text-body-md font-bold text-text-primary">
            Verification Approved
          </h3>
          <p className="mt-2xs font-body text-[12px] text-text-secondary">
            <strong className="text-text-primary">{facilityName}</strong> has
            been upgraded to Tier 1 — Verified.
          </p>
          <button
            type="button"
            onClick={handleCloseAll}
            className="mt-md w-full rounded-xl bg-emerald-800 py-2 font-body text-[12px] font-bold text-white hover:bg-emerald-900 transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
