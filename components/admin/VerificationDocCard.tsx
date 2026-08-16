"use client";

import React, { useState } from "react";
import {
  Download,
  Flag,
  Eye,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function VerificationDocCard() {
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [flagReasons, setFlagReasons] = useState({
    unclear: false,
    expired: false,
    mismatchName: false,
    wrongType: false,
    forgery: false,
    other: false,
  });

  const toggleReason = (key: keyof typeof flagReasons) => {
    setFlagReasons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
      <p className="font-body text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
        VERIFICATION DOCUMENT
      </p>

      <div className="mt-xs">
        <span className="rounded-md bg-blue-50 px-xs py-[2px] font-body text-[11px] font-bold text-blue-700">
          CAC Certificate
        </span>
      </div>

      {/* Document Preview Box */}
      <div className="mt-sm rounded-xl border border-gray-200 bg-gray-50/50 p-md text-center">
        <div className="flex items-center justify-between pb-sm">
          <span className="font-body text-[12px] font-bold text-text-primary">
            CAC Certificate — Grace Medical Clinic.pdf
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2xs font-body text-[12px] font-bold text-emerald-800 hover:text-emerald-900"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </button>
        </div>

        {/* Preview Frame */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-lg">
          <FileText className="h-10 w-10 text-gray-300" />
          <p className="mt-xs font-body text-[12px] text-text-disabled">
            Document preview — CAC Certificate
          </p>
          <button
            type="button"
            className="mt-xs inline-flex items-center gap-2xs rounded-lg border border-gray-200 px-sm py-1 font-body text-[12px] font-bold text-text-secondary hover:bg-gray-50"
          >
            <Eye className="h-3.5 w-3.5" /> View Full Screen
          </button>
        </div>
      </div>

      {/* Collapsible Flag Section */}
      <div className="mt-md overflow-hidden rounded-xl border border-gray-200/80 bg-gray-50/40">
        <button
          type="button"
          onClick={() => setIsFlagOpen((prev) => !prev)}
          className="flex w-full items-center gap-xs px-sm py-2.5 font-body text-[12px] font-bold text-text-primary hover:bg-gray-100/60 transition-colors"
        >
          {isFlagOpen ? (
            <ChevronDown className="h-3.5 w-3.5 text-text-disabled" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-text-disabled" />
          )}
          <Flag className="h-3.5 w-3.5 text-text-secondary" />
          <span>Flag an issue with this document</span>
        </button>

        {isFlagOpen && (
          <div className="border-t border-gray-200/60 bg-white p-sm">
            <div className="flex flex-col gap-xs font-body text-[12px] text-text-secondary">
              <label className="flex items-center gap-xs cursor-pointer hover:text-text-primary">
                <input
                  type="checkbox"
                  checked={flagReasons.unclear}
                  onChange={() => toggleReason("unclear")}
                  className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>Image is unclear or unreadable</span>
              </label>

              <label className="flex items-center gap-xs cursor-pointer hover:text-text-primary">
                <input
                  type="checkbox"
                  checked={flagReasons.expired}
                  onChange={() => toggleReason("expired")}
                  className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>Document appears expired</span>
              </label>

              <label className="flex items-center gap-xs cursor-pointer hover:text-text-primary">
                <input
                  type="checkbox"
                  checked={flagReasons.mismatchName}
                  onChange={() => toggleReason("mismatchName")}
                  className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>Document does not match facility name</span>
              </label>

              <label className="flex items-center gap-xs cursor-pointer hover:text-text-primary">
                <input
                  type="checkbox"
                  checked={flagReasons.wrongType}
                  onChange={() => toggleReason("wrongType")}
                  className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>Document is the wrong type</span>
              </label>

              <label className="flex items-center gap-xs cursor-pointer hover:text-text-primary">
                <input
                  type="checkbox"
                  checked={flagReasons.forgery}
                  onChange={() => toggleReason("forgery")}
                  className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>Possible forgery or alteration</span>
              </label>

              <label className="flex items-center gap-xs cursor-pointer hover:text-text-primary">
                <input
                  type="checkbox"
                  checked={flagReasons.other}
                  onChange={() => toggleReason("other")}
                  className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>Other</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
