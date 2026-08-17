"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  const pendingItems = [
    {
      name: "Grace Medical Clinic",
      location: "Akwa Ibom · Eket",
      type: "Private Clinic",
      cert: "CAC Certificate",
      time: "6h ago",
      sla: "Within Target",
      slaVariant: "emerald",
    },
    {
      name: "New Life Maternity Home",
      location: "Akwa Ibom · Uyo",
      type: "Maternity Home",
      cert: "State MoH Cert",
      time: "31h ago",
      sla: "Approaching SLA",
      slaVariant: "amber",
    },
    {
      name: "QuickCare Diagnostic Lab",
      location: "Akwa Ibom · Abak",
      type: "Diagnostic Centre",
      cert: "NHIA Certificate",
      time: "51h ago",
      sla: "SLA Exceeded",
      slaVariant: "red",
    },
    {
      name: "Favour Hospital",
      location: "Akwa Ibom · Ikot Ekpene",
      type: "Private Hospital",
      cert: "MDCN Certificate",
      time: "14h ago",
      sla: "Within Target",
      slaVariant: "emerald",
    },
    {
      name: "Community Health Plus",
      location: "Akwa Ibom · Oron",
      type: "Private Clinic",
      cert: "CAC Certificate",
      time: "2h ago",
      sla: "Within Target",
      slaVariant: "emerald",
    },
  ];

  return (
    <div className="flex flex-col gap-lg">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="font-body text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              PENDING VERIFICATION
            </p>
          </div>
          <div className="mt-xs flex items-baseline gap-xs">
            <span className="font-heading text-heading-lg font-bold text-text-primary">
              7
            </span>
            <span className="rounded-md bg-amber-100 px-xs py-[2px] font-body text-[10px] font-bold text-amber-800">
              Action needed
            </span>
          </div>
          <p className="mt-2xs font-body text-caption text-text-secondary">
            Facilities awaiting document review
          </p>
          <Link
            href="/admin/pending"
            className="mt-sm inline-flex items-center gap-2xs font-body text-caption font-bold text-emerald-800 hover:text-emerald-900"
          >
            Review Now <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
          <p className="font-body text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            APPROVED THIS MONTH
          </p>
          <p className="mt-xs font-heading text-heading-lg font-bold text-text-primary">
            14
          </p>
          <p className="mt-2xs font-body text-caption text-text-secondary">
            Facilities verified and upgraded to Tier 2
          </p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
          <p className="font-body text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            REJECTED THIS MONTH
          </p>
          <p className="mt-xs font-heading text-heading-lg font-bold text-text-primary">
            3
          </p>
          <p className="mt-2xs font-body text-caption text-text-secondary">
            Applications rejected or returned for more information
          </p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
          <p className="font-body text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            TOTAL REGISTERED FACILITIES
          </p>
          <p className="mt-xs font-heading text-heading-lg font-bold text-text-primary">
            48
          </p>
          <p className="mt-2xs font-body text-caption text-text-secondary">
            Across all tiers and states
          </p>
        </div>
      </div>

      {/* Pending Verification Table Section */}
      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
        <div className="mb-md flex items-center justify-between">
          <div className="flex items-center gap-xs">
            <h2 className="font-heading text-body-md font-bold text-text-primary">
              Pending Verification
            </h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 font-mono text-[11px] font-bold text-amber-800">
              7
            </span>
          </div>
          <Link
            href="/admin/pending"
            className="font-body text-caption font-bold text-emerald-800 hover:text-emerald-900"
          >
            View All →
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-gray-100">
          {pendingItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-wrap items-center justify-between gap-sm py-sm first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-body text-body-xs font-bold text-text-primary">
                  {item.name}
                </p>
                <p className="font-body text-caption text-text-disabled">
                  {item.location}
                </p>
              </div>

              <div className="flex items-center gap-xs">
                <span className="font-body text-caption text-text-disabled hidden md:inline">
                  {item.type}
                </span>
                <span className="rounded-md bg-blue-50 px-xs py-[2px] font-body text-[11px] font-semibold text-blue-700">
                  {item.cert}
                </span>
                <span className="font-body text-caption text-text-disabled ml-xs">
                  {item.time}
                </span>

                {/* SLA Badge */}
                <span
                  className={`rounded-full px-xs py-[2px] font-body text-[10px] font-bold ${
                    item.slaVariant === "emerald"
                      ? "bg-emerald-50 text-emerald-800"
                      : item.slaVariant === "amber"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-red-50 text-red-700"
                  }`}
                >
                  {item.sla}
                </span>

                <button
                  type="button"
                  className="ml-xs rounded-lg bg-emerald-800 px-sm py-xs font-body text-caption font-bold text-white hover:bg-emerald-900"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Split Section: Recent Activity & Needs Attention */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs lg:col-span-2">
          <h2 className="mb-md font-heading text-body-md font-bold text-text-primary">
            Recent Activity
          </h2>
          <div className="flex flex-col gap-sm">
            <div className="flex items-start gap-xs">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-800 font-mono text-[10px] font-bold text-white">
                AO
              </div>
              <div>
                <p className="font-body text-caption text-text-primary">
                  <span className="font-bold">Amaka Osei</span> approved
                  verification for{" "}
                  <span className="font-bold text-emerald-800">
                    Grace Medical Clinic
                  </span>
                  .
                </p>
                <p className="font-body text-[10px] text-text-disabled">
                  14 minutes ago
                </p>
              </div>
            </div>

            <div className="flex items-start gap-xs">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-800 font-mono text-[10px] font-bold text-white">
                ZB
              </div>
              <div>
                <p className="font-body text-caption text-text-primary">
                  <span className="font-bold">Zainab Babalola</span> suspended
                  facility{" "}
                  <span className="font-bold text-emerald-800">
                    Private Clinic Eket
                  </span>
                  .
                </p>
                <p className="font-body text-[10px] text-text-disabled">
                  2 hours ago
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Needs Attention */}
        <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
          <div className="mb-md flex items-center gap-xs">
            <h2 className="font-heading text-body-md font-bold text-text-primary">
              Needs Attention
            </h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 font-mono text-[11px] font-bold text-red-700">
              2
            </span>
          </div>

          <div className="flex flex-col gap-sm">
            <div className="rounded-xl bg-amber-50/60 p-sm border-l-4 border-amber-500">
              <p className="font-body text-caption font-bold text-text-primary">
                PHC Ukanafun
              </p>
              <p className="mt-2xs font-body text-[11px] text-text-secondary">
                Facility has not updated availability status in 72+ hours.
              </p>
              <button
                type="button"
                className="mt-xs rounded-md bg-amber-500 px-xs py-[2px] font-body text-[11px] font-bold text-white hover:bg-amber-600"
              >
                Review
              </button>
            </div>

            <div className="rounded-xl bg-red-50/60 p-sm border-l-4 border-red-500">
              <p className="font-body text-caption font-bold text-text-primary">
                Private Clinic Eket
              </p>
              <p className="mt-2xs font-body text-[11px] text-text-secondary">
                Possible duplicate registration detected — same phone number
                used.
              </p>
              <button
                type="button"
                className="mt-xs rounded-md bg-red-600 px-xs py-[2px] font-body text-[11px] font-bold text-white hover:bg-red-700"
              >
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
