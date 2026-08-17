"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

const PENDING_FACILITIES = [
  {
    id: "grace-medical-clinic",
    name: "Grace Medical Clinic",
    location: "Akwa Ibom · Eket",
    type: "Private Clinic",
    cert: "CAC Certificate",
    submitted: "14 Aug 2026, 11:32 AM",
    timeAgo: "6h ago",
    sla: "Within Target",
    slaVariant: "emerald",
  },
  {
    id: "new-life-maternity",
    name: "New Life Maternity Home",
    location: "Akwa Ibom · Uyo",
    type: "Maternity Home",
    cert: "State MoH Cert",
    submitted: "13 Aug 2026, 04:15 PM",
    timeAgo: "31h ago",
    sla: "Approaching SLA",
    slaVariant: "amber",
  },
  {
    id: "quickcare-lab",
    name: "QuickCare Diagnostic Lab",
    location: "Akwa Ibom · Abak",
    type: "Diagnostic Centre",
    cert: "NHIA Certificate",
    submitted: "12 Aug 2026, 09:00 AM",
    timeAgo: "51h ago",
    sla: "SLA Exceeded",
    slaVariant: "red",
  },
];

export default function PendingListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFacilities = PENDING_FACILITIES.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-md">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-body-lg font-bold text-text-primary">
            Pending Verifications
          </h1>
          <p className="font-body text-caption text-text-secondary">
            Review and verify pending facility registration applications.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-sm rounded-2xl border border-gray-100 bg-white p-sm shadow-2xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-sm top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search facility name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-1.5 pl-lg pr-sm font-body text-caption outline-none focus:border-emerald-700"
          />
        </div>
        <button
          type="button"
          className="flex items-center gap-2xs rounded-xl border border-gray-200 px-sm py-1.5 font-body text-caption font-bold text-text-secondary hover:bg-gray-50"
        >
          <Filter className="h-3.5 w-3.5" /> Filter
        </button>
      </div>

      {/* Facilities Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xs">
        <table className="w-full text-left font-body text-caption">
          <thead className="border-b border-gray-100 bg-gray-50/50 font-bold text-text-secondary">
            <tr>
              <th className="py-sm px-md">Facility</th>
              <th className="py-sm px-md">Type & Document</th>
              <th className="py-sm px-md">Submitted</th>
              <th className="py-sm px-md">SLA Status</th>
              <th className="py-sm px-md text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredFacilities.map((facility) => (
              <tr key={facility.id} className="hover:bg-gray-50/40">
                <td className="py-sm px-md">
                  <p className="font-bold text-text-primary">{facility.name}</p>
                  <p className="text-[11px] text-text-disabled">
                    {facility.location}
                  </p>
                </td>
                <td className="py-sm px-md">
                  <p className="text-text-secondary">{facility.type}</p>
                  <span className="inline-block rounded-md bg-blue-50 px-2xs py-[1px] text-[10px] font-bold text-blue-700">
                    {facility.cert}
                  </span>
                </td>
                <td className="py-sm px-md">
                  <p className="text-text-primary">{facility.timeAgo}</p>
                  <p className="text-[10px] text-text-disabled">
                    {facility.submitted}
                  </p>
                </td>
                <td className="py-sm px-md">
                  <span
                    className={`rounded-full px-2xs py-[2px] text-[10px] font-bold ${
                      facility.slaVariant === "emerald"
                        ? "bg-emerald-50 text-emerald-800"
                        : facility.slaVariant === "amber"
                          ? "bg-amber-50 text-amber-800"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {facility.sla}
                  </span>
                </td>
                <td className="py-sm px-md text-right">
                  <Link
                    href={`/admin/pending/${facility.id}`}
                    className="inline-block rounded-lg bg-emerald-800 px-sm py-1 font-bold text-white hover:bg-emerald-900"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
