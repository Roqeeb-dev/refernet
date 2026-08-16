"use client";

import React, { useState } from "react";
import RequestDocumentsModal from "./RequestDocumentModal";

export default function ReviewActionCard() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [checklist, setChecklist] = useState({
    profileComplete: true,
    phoneUnique: true,
    legible: true,
    nameMatch: true,
    notExpired: true,
    typeAppropriate: true,
  });

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const canApprove = completedCount === 6;

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <div className="sticky top-md rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
        <div className="mb-xs flex items-center justify-between">
          <p className="font-body text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
            VERIFICATION CHECKLIST
          </p>
          <span className="font-body text-[11px] text-text-disabled">
            {completedCount} of 6 completed
          </span>
        </div>

        <div className="mt-sm flex flex-col gap-xs font-body text-[12px] text-text-secondary">
          <label className="flex items-start gap-xs cursor-pointer">
            <input
              type="checkbox"
              checked={checklist.profileComplete}
              onChange={() => toggleCheck("profileComplete")}
              className="mt-[2px] rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
            />
            <span>Facility profile is complete and consistent.</span>
          </label>

          <label className="flex items-start gap-xs cursor-pointer">
            <input
              type="checkbox"
              checked={checklist.phoneUnique}
              onChange={() => toggleCheck("phoneUnique")}
              className="mt-[2px] rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
            />
            <span>Phone number is unique (no duplicate).</span>
          </label>

          <label className="flex items-start gap-xs cursor-pointer">
            <input
              type="checkbox"
              checked={checklist.legible}
              onChange={() => toggleCheck("legible")}
              className="mt-[2px] rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
            />
            <span>Document is legible and readable.</span>
          </label>

          <label className="flex items-start gap-xs cursor-pointer">
            <input
              type="checkbox"
              checked={checklist.nameMatch}
              onChange={() => toggleCheck("nameMatch")}
              className="mt-[2px] rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
            />
            <span>Document matches the facility name.</span>
          </label>

          <label className="flex items-start gap-xs cursor-pointer">
            <input
              type="checkbox"
              checked={checklist.notExpired}
              onChange={() => toggleCheck("notExpired")}
              className="mt-[2px] rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
            />
            <span>Document is not visibly expired.</span>
          </label>

          <label className="flex items-start gap-xs cursor-pointer">
            <input
              type="checkbox"
              checked={checklist.typeAppropriate}
              onChange={() => toggleCheck("typeAppropriate")}
              className="mt-[2px] rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
            />
            <span>Document type is appropriate for this facility type.</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-md flex flex-col gap-xs">
          <button
            type="button"
            disabled={!canApprove}
            className={`w-full rounded-xl py-2.5 font-body text-[12px] font-bold transition-all ${
              canApprove
                ? "bg-emerald-800 text-white hover:bg-emerald-900"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Approve — Grant Access
          </button>

          <button
            type="button"
            onClick={() => setIsRequestModalOpen(true)}
            className="w-full rounded-xl bg-amber-500 py-2.5 font-body text-[12px] font-bold text-white hover:bg-amber-600 transition-colors"
          >
            Request Additional Documents
          </button>

          <button
            type="button"
            className="w-full rounded-xl border border-red-500 py-2.5 font-body text-[12px] font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            Reject Application
          </button>
        </div>
      </div>

      {/* Linked Modal */}
      <RequestDocumentsModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        facilityName="Grace Medical Clinic"
      />
    </>
  );
}
