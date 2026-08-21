"use client";

import { AdminFacility } from "@/services/admin-facilities.service";
import { Building2, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PendingRowProps {
  facility: AdminFacility;
}

export function PendingFacilityRow({ facility }: PendingRowProps) {
  return (
    <tr className="group hover:bg-gray-50/60 transition-colors">
      <td className="py-md px-md">
        <div className="flex items-center gap-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-text-primary group-hover:text-emerald-800">
              {facility.name}
            </p>
            <p className="font-mono text-[10px] text-text-disabled">
              {facility.id}
            </p>
          </div>
        </div>
      </td>
      <td className="py-md px-md text-text-secondary">
        {facility.type || "—"}
      </td>
      <td className="py-md px-md text-text-secondary">
        {facility.state}
        {facility.lga && (
          <span className="text-text-disabled"> · {facility.lga}</span>
        )}
      </td>
      <td className="py-md px-md">
        <span className="inline-flex items-center gap-1 text-text-secondary">
          <Clock className="h-3 w-3 text-gray-400" />
          {facility.registeredAt || "Recent"}
        </span>
      </td>
      <td className="py-md px-md">
        <span className="font-medium text-text-secondary">
          {facility.type || "Unassigned"}
        </span>
      </td>
      <td className="py-md px-md">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
          Within Target
        </span>
      </td>
      <td className="py-md px-md text-right">
        <Link
          href={`/admin/facilities/pending/${facility.id}`}
          className="inline-flex items-center gap-1 rounded-xl bg-emerald-800 px-md py-1.5 font-bold text-white hover:bg-emerald-900 transition-colors"
        >
          Review
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </td>
    </tr>
  );
}
