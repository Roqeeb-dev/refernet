"use client";

import { useState } from "react";

export default function ReviewActionCard() {
  const [checklist, setChecklist] = useState({
    detailsMatch: false,
    addressVerified: false,
    notExpired: false,
    appropriateType: false,
  });

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const canApprove = completedCount >= 4;

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="sticky top-md rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
      <p className="font-body text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
        VERIFICATION CHECKLIST
      </p>

      <div className="mt-sm flex flex-col gap-xs font-body text-caption text-text-secondary">
        <label className="flex items-start gap-xs cursor-pointer">
          <input
            type="checkbox"
            checked={checklist.detailsMatch}
            onChange={() => toggleCheck("detailsMatch")}
            className="mt-1 rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
          />
          <span>Facility name and location match official documents.</span>
        </label>

        <label className="flex items-start gap-xs cursor-pointer">
          <input
            type="checkbox"
            checked={checklist.addressVerified}
            onChange={() => toggleCheck("addressVerified")}
            className="mt-1 rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
          />
          <span>Physical address verified via MoH registry or call.</span>
        </label>

        <label className="flex items-start gap-xs cursor-pointer">
          <input
            type="checkbox"
            checked={checklist.notExpired}
            onChange={() => toggleCheck("notExpired")}
            className="mt-1 rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
          />
          <span>Document is not visibly expired.</span>
        </label>

        <label className="flex items-start gap-xs cursor-pointer">
          <input
            type="checkbox"
            checked={checklist.appropriateType}
            onChange={() => toggleCheck("appropriateType")}
            className="mt-1 rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
          />
          <span>Document type is appropriate for this facility type.</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="mt-md flex flex-col gap-xs">
        <button
          type="button"
          disabled={!canApprove}
          className={`w-full rounded-xl py-2 font-body text-caption font-bold transition-all ${
            canApprove
              ? "bg-emerald-800 text-white hover:bg-emerald-900"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Approve — Grant Tier 2 Access
        </button>

        {!canApprove && (
          <p className="text-center font-body text-[10px] text-text-disabled">
            Complete at least 4 checklist items to enable
          </p>
        )}

        <button
          type="button"
          className="w-full rounded-xl bg-amber-500 py-2 font-body text-caption font-bold text-white hover:bg-amber-600"
        >
          Request Additional Documents
        </button>

        <button
          type="button"
          className="w-full rounded-xl border border-red-500 py-2 font-body text-caption font-bold text-red-600 hover:bg-red-50"
        >
          Reject Application
        </button>
      </div>
    </div>
  );
}
