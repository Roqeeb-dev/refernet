"use client";

import React, { useState } from "react";
import {
  X,
  AlertTriangle,
  FileX2,
  Building2,
  CopyX,
  Ban,
  ShieldAlert,
  MoreHorizontal,
} from "lucide-react";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilityName?: string;
}

export default function RejectModal({
  isOpen,
  onClose,
  facilityName = "Grace Medical Clinic",
}: RejectModalProps) {
  const [reason, setReason] = useState("invalid_doc");
  const [internalNote, setInternalNote] = useState("");
  const [facilityMessage, setFacilityMessage] = useState("");
  const [waitingPeriod, setWaitingPeriod] = useState("30");
  const [confirmInput, setConfirmInput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const isConfirmed = confirmInput.trim() === facilityName;

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed) return;
    setIsSuccess(true);
  };

  const handleCloseAll = () => {
    setIsSuccess(false);
    onClose();
  };

  const rejectionReasons = [
    {
      id: "invalid_doc",
      icon: FileX2,
      title: "Invalid Document",
      subtitle: "Expired, forged, irrelevant, or unreadable document.",
    },
    {
      id: "not_exist",
      icon: Building2,
      title: "Facility Does Not Exist",
      subtitle:
        "Address does not correspond to a known facility, or facility appears to be closed.",
    },
    {
      id: "duplicate",
      icon: CopyX,
      title: "Duplicate Registration",
      subtitle:
        "This facility is already registered under a different account.",
    },
    {
      id: "ineligible",
      icon: Ban,
      title: "Ineligible Facility Type",
      subtitle:
        "This type of facility is not eligible for ReferNet registration.",
    },
    {
      id: "terms",
      icon: ShieldAlert,
      title: "Terms Violation",
      subtitle: "The application violates ReferNet's terms of service.",
    },
    {
      id: "other",
      icon: MoreHorizontal,
      title: "Other",
      subtitle: "Provide a detailed reason below.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-sm backdrop-blur-xs">
      {!isSuccess ? (
        <div className="relative w-full max-w-[640px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-md shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between pb-xs border-b border-gray-100">
            <h2 className="font-heading text-body-md font-bold text-red-700">
              Reject Application for {facilityName}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Warning Banner */}
          <div className="mt-sm rounded-xl bg-red-600 p-xs text-[11px] font-semibold text-white flex items-center gap-xs">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>
              Rejection will notify the facility immediately. This action is
              logged permanently. The facility can re-apply after 30 days.
            </span>
          </div>

          <form onSubmit={handleReject} className="mt-sm flex flex-col gap-sm">
            {/* Rejection Reason Choice */}
            <div>
              <label className="block font-body text-[11px] font-bold text-text-primary mb-xs">
                Why are you rejecting this application?
              </label>
              <div className="flex flex-col gap-xs">
                {rejectionReasons.map((item) => {
                  const Icon = item.icon;
                  const isSelected = reason === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setReason(item.id)}
                      className={`flex items-start gap-xs rounded-xl border p-xs cursor-pointer transition-all ${
                        isSelected
                          ? "border-red-500 bg-red-50/20"
                          : "border-gray-200 hover:bg-gray-50/60"
                      }`}
                    >
                      <Icon className="mt-0.5 h-3.5 w-3.5 text-text-secondary shrink-0" />
                      <div>
                        <p className="font-body text-[11px] font-bold text-text-primary">
                          {item.title}
                        </p>
                        <p className="font-body text-[10px] text-text-secondary">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Internal Rejection Note */}
            <div>
              <label className="block font-body text-[11px] font-bold text-text-primary mb-2xs">
                Internal rejection note{" "}
                <span className="text-red-600">
                  (required — for audit purposes)
                </span>
              </label>
              <input
                type="text"
                required
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Explain the decision in enough detail for a Super Admin to understand the reasoning..."
                className="w-full rounded-xl border border-gray-200 px-sm py-1.5 font-body text-[11px] text-text-primary outline-none focus:border-red-500"
              />
            </div>

            {/* Message to Facility */}
            <div>
              <label className="block font-body text-[11px] font-bold text-text-primary mb-2xs">
                Message to facility{" "}
                <span className="text-red-600">(editable, required)</span>
              </label>
              <textarea
                rows={2.5}
                required
                value={facilityMessage}
                onChange={(e) => setFacilityMessage(e.target.value)}
                placeholder="Detail reasons for rejection..."
                className="w-full rounded-xl border border-gray-200 p-xs font-body text-[11px] text-text-primary outline-none focus:border-red-500 resize-none"
              />
            </div>

            {/* Waiting Period Selection */}
            <div>
              <label className="block font-body text-[11px] font-bold text-text-primary mb-xs">
                Re-application waiting period
              </label>
              <div className="grid grid-cols-3 gap-xs">
                <button
                  type="button"
                  onClick={() => setWaitingPeriod("30")}
                  className={`rounded-xl border p-xs text-left transition-all ${
                    waitingPeriod === "30"
                      ? "border-red-500 bg-red-50/30"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-body text-[11px] font-bold text-red-600">
                    30 days
                  </p>
                  <p className="font-body text-[9px] text-text-disabled">
                    Document issues
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setWaitingPeriod("90")}
                  className={`rounded-xl border p-xs text-left transition-all ${
                    waitingPeriod === "90"
                      ? "border-red-500 bg-red-50/30"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-body text-[11px] font-bold text-text-primary">
                    90 days
                  </p>
                  <p className="font-body text-[9px] text-text-disabled">
                    Duplicate or eligibility
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setWaitingPeriod("perm")}
                  className={`rounded-xl border p-xs text-left transition-all ${
                    waitingPeriod === "perm"
                      ? "border-red-500 bg-red-50/30"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-body text-[11px] font-bold text-text-primary">
                    Permanent ban
                  </p>
                  <p className="font-body text-[9px] text-text-disabled">
                    Super Admin only
                  </p>
                </button>
              </div>
            </div>

            {/* Type Facility Name Confirmation */}
            <div className="rounded-xl border border-red-100 bg-red-50/40 p-xs">
              <label className="block font-body text-[10px] font-bold text-red-700">
                Confirm rejection by typing the facility name
              </label>
              <p className="mt-2xs font-body text-[10px] text-red-600">
                Type <strong>"{facilityName}"</strong> exactly to enable the
                reject button.
              </p>
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder={facilityName}
                className="mt-xs w-full rounded-xl border border-gray-200 bg-white px-sm py-1.5 font-body text-[11px] text-text-primary outline-none focus:border-red-500"
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
                disabled={!isConfirmed}
                className={`rounded-xl px-md py-1.5 font-body text-[11px] font-bold transition-colors ${
                  isConfirmed
                    ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Application Rejected Screen */
        <div className="relative w-full max-w-[580px] rounded-2xl bg-white p-lg text-center shadow-xl">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <X className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="mt-xs font-heading text-body-md font-bold text-red-700">
            Application Rejected
          </h3>
          <p className="mt-2xs font-body text-[12px] text-text-secondary">
            <strong className="text-text-primary">{facilityName}</strong> has
            been notified. This action has been logged in the audit trail.
          </p>
          <button
            type="button"
            onClick={handleCloseAll}
            className="mt-md w-full rounded-xl bg-slate-900 py-2 font-body text-[12px] font-bold text-white hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
