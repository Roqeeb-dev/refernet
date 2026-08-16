"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FacilityHeader() {
  return (
    <div className="flex flex-col gap-xs pb-sm border-b border-gray-100">
      {/* Back Link */}
      <Link
        href="/admin/pending"
        className="inline-flex items-center gap-2xs font-body text-[12px] font-bold text-text-secondary hover:text-emerald-800 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Pending Verification
      </Link>

      {/* Title & Metadata */}
      <div className="flex flex-wrap items-baseline justify-between gap-sm">
        <div>
          <h1 className="font-heading text-body-lg font-bold text-text-primary">
            Grace Medical Clinic
          </h1>
          <div className="mt-2xs flex items-center gap-xs font-body text-[12px] text-text-secondary">
            <span>Private Clinic</span>
            <span>·</span>
            <span>Eket, Akwa Ibom</span>
            <span>·</span>
            <span className="font-mono text-text-disabled">AKI-0048</span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-xs font-body text-[11px]">
          <span className="text-text-disabled">Received 6h ago</span>
          <span className="rounded-full bg-emerald-50 px-xs py-[2px] font-bold text-emerald-800">
            Within Target
          </span>
          <span className="text-text-secondary">
            Assigned to:{" "}
            <strong className="text-text-primary">Amaka Osei</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
