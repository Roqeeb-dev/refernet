"use client";

import { Download, Flag, Eye, FileText } from "lucide-react";

export default function VerificationDocCard() {
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

      {/* Document Box */}
      <div className="mt-sm rounded-xl border border-gray-200 bg-gray-50/50 p-md text-center">
        <div className="flex items-center justify-between pb-sm">
          <span className="font-body text-caption font-bold text-text-primary">
            CAC Certificate — Grace Medical Clinic.pdf
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2xs text-caption font-bold text-emerald-800"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </button>
        </div>

        {/* Document Preview Placeholder */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-lg">
          <FileText className="h-10 w-10 text-gray-300" />
          <p className="mt-xs font-body text-caption text-text-disabled">
            Document preview — CAC Certificate
          </p>
          <button
            type="button"
            className="mt-xs inline-flex items-center gap-2xs rounded-lg border border-gray-200 px-sm py-1 font-body text-caption font-bold text-text-secondary hover:bg-gray-50"
          >
            <Eye className="h-3.5 w-3.5" /> View Full Screen
          </button>
        </div>
      </div>

      <button
        type="button"
        className="mt-xs inline-flex items-center gap-2xs font-body text-caption font-bold text-text-secondary hover:text-red-600"
      >
        <Flag className="h-3.5 w-3.5" /> Flag an issue with this document
      </button>
    </div>
  );
}
