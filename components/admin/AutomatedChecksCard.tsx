"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function AutomatedChecksCard() {
  const checks = [
    {
      title: "Phone Number Check",
      desc: "Phone number is unique — not registered to another facility.",
      status: "success",
    },
    {
      title: "Facility Name Check",
      desc: "Similar facility name found: Grace Clinic, Eket LGA. Verify this is a different facility.",
      status: "warning",
    },
    {
      title: "NHIA Accreditation",
      desc: "NHIA number could not be automatically verified. Manual confirmation recommended.",
      status: "warning",
    },
    {
      title: "Document Expiry Check",
      desc: "Document does not show an expiry date.",
      status: "success",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
      <p className="font-body text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
        AUTOMATED CHECKS
      </p>

      <div className="mt-sm flex flex-col gap-xs">
        {checks.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-xs rounded-xl p-xs ${
              item.status === "success" ? "bg-emerald-50/60" : "bg-amber-50/60"
            }`}
          >
            {item.status === "success" ? (
              <CheckCircle2 className="mt-[2px] h-4 w-4 text-emerald-700 shrink-0" />
            ) : (
              <AlertTriangle className="mt-[2px] h-4 w-4 text-amber-700 shrink-0" />
            )}
            <div>
              <p className="font-body text-caption font-bold text-text-primary">
                {item.title}
              </p>
              <p className="font-body text-[11px] text-text-secondary">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
