"use client";

import Link from "next/link";
import { ClipboardList, FileText, ScanLine } from "lucide-react";

const PATHWAYS = [
  {
    key: "digital",
    icon: FileText,
    accent: "green",
    badge: "4 steps",
    title: "Digital Referral",
    description:
      "Fill a structured form with patient details, vital signs, and clinical information. Best for new cases without existing paperwork.",
    steps: [
      "Patient Information",
      "Clinical Information",
      "Select Receiving Facility",
      "Review & Submit",
    ],
    cta: "Select Digital Referral",
    href: null as string | null,
  },
  {
    key: "paper",
    icon: ScanLine,
    accent: "blue",
    badge: "3 steps",
    title: "Paper Referral Bridge",
    description:
      "Already have a completed paper referral form? Upload a photo or scan and select the facility. The receiving team sees your document before the patient arrives.",
    steps: [
      "Photo or scan of referral form",
      "Select Receiving Facility",
      "Review & Submit",
    ],
    cta: "Select Paper Referral Bridge",
    href: "/dashboard/new-referral/paper-bridge/upload" as string | null,
  },
] as const;

const ACCENT_STYLES = {
  green: {
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    buttonClass: "border border-green-200 bg-green-50 hover:bg-green-100",
    buttonTextStyle: { color: "#1E7A47" },
  },
  blue: {
    iconBg: "bg-info-light",
    iconColor: "text-info",
    buttonClass: "border border-info bg-white hover:bg-info-light",
    buttonTextStyle: { color: "#2563EB" },
  },
} as const;

export default function ChooseReferralTypePage() {
  return (
    <div>
      {/* Page header */}
      <div className="border-b border-gray-200 px-base py-xs bg-white">
        <p className="font-body text-caption text-text-secondary">
          New Referral
        </p>
        <h1 className="font-display text-heading-md font-bold text-text-primary">
          Choose Referral Type
        </h1>
      </div>

      <div className="mx-auto w-full max-w-[820px] px-base py-3xl">
        {/* Intro */}
        <div className="mx-auto mb-2xl max-w-[480px] text-center">
          <div className="mx-auto mb-base flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
            <ClipboardList size={22} className="text-green-700" />
          </div>
          <h2 className="mb-sm font-display text-heading-xl font-bold text-text-primary">
            How would you like to submit this referral?
          </h2>
          <p className="font-body text-body-sm text-text-secondary">
            Choose the pathway that best fits your situation. Both routes
            complete the referral process.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-lg">
          {PATHWAYS.map((pathway) => {
            const accent = ACCENT_STYLES[pathway.accent];
            const Icon = pathway.icon;

            return (
              <div
                key={pathway.key}
                className="flex flex-col rounded-lg border border-gray-100 bg-white p-lg"
              >
                <div className="mb-base flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent.iconBg}`}
                  >
                    <Icon size={18} className={accent.iconColor} />
                  </div>

                  <span className="rounded-full bg-info-light px-base py-xs font-body text-caption font-semibold text-info">
                    {pathway.badge}
                  </span>
                </div>

                <h3 className="mb-xs font-display text-heading-md font-bold text-text-primary">
                  {pathway.title}
                </h3>
                <p className="mb-base font-body text-body-sm text-text-secondary">
                  {pathway.description}
                </p>

                <ol className="mb-lg flex flex-col gap-xs">
                  {pathway.steps.map((step, index) => (
                    <li key={step} className="flex items-center gap-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-info-light font-body text-caption font-semibold text-info">
                        {index + 1}
                      </span>
                      <span className="font-body text-body-sm text-text-secondary">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-auto">
                  {pathway.href ? (
                    <Link
                      href={pathway.href}
                      style={accent.buttonTextStyle}
                      className={`flex min-h-[44px] w-full items-center justify-center rounded-md font-body text-body-md font-semibold transition-colors ${accent.buttonClass}`}
                    >
                      {pathway.cta}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      style={accent.buttonTextStyle}
                      className={`flex min-h-[44px] w-full cursor-not-allowed items-center justify-center rounded-md font-body text-body-md font-semibold opacity-90 transition-colors ${accent.buttonClass}`}
                    >
                      {pathway.cta}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
