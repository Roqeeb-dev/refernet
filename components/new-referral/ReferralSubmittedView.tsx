"use client";

import Link from "next/link";
import { Check, FileText, Bell, Clock, ArrowRightLeft } from "lucide-react";
import Button from "@/components/shared/Button";

export interface ReferralSubmittedData {
  type: "paper" | "digital";
  referenceNumber: string;
  patientName?: string;
  facilityName: string;
  submittedAt: string;
  fileName?: string;
  fileUrl?: string;
  referralId: string;
}

interface ReferralSubmittedProps {
  data: ReferralSubmittedData;
}

export default function ReferralSubmittedView({
  data,
}: ReferralSubmittedProps) {
  const isPaper = data.type === "paper";

  // Timeline Steps configuration based on type
  const paperSteps = [
    {
      title: "Referral submitted",
      description: "Paper form uploaded and transmitted",
      status: "completed",
      icon: Check,
    },
    {
      title: "Document attached to record",
      description: "Form is now part of the digital referral record",
      status: "completed",
      icon: FileText,
    },
    {
      title: "Receiving facility notified",
      description: `${data.facilityName} can view your document now`,
      status: "completed",
      icon: Bell,
    },
    {
      title: "Awaiting patient arrival",
      description: "Confirm when the patient reaches the facility",
      status: "pending",
      icon: Clock,
    },
  ];

  const digitalSteps = [
    {
      title: "Referral sent",
      description: "Transmitted successfully",
      status: "completed",
      icon: Check,
    },
    {
      title: "Facility notified",
      description: "Receiving facility is reviewing your referral",
      status: "completed",
      icon: Bell,
    },
    {
      title: "Awaiting acceptance",
      description: "You will be notified of the decision",
      status: "pending",
      icon: Clock,
    },
    {
      title: "Patient transfer",
      description: "Coordination begins once accepted",
      status: "upcoming",
      icon: ArrowRightLeft,
    },
  ];

  const steps = isPaper ? paperSteps : digitalSteps;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-gray-100 bg-white p-lg shadow-xs text-center">
      {/* Icon Badge */}
      <div className="mb-md flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-6 w-6 stroke-[3]" />
        </div>
      </div>

      {/* Dynamic Header */}
      <h1 className="font-heading text-heading-md font-bold text-text-primary">
        {isPaper ? "Paper Referral Sent!" : "Referral Submitted!"}
      </h1>
      <p className="mt-xs font-body text-body-sm text-text-secondary">
        {isPaper
          ? "Your paper form has been digitised and attached. The receiving facility can view the document now."
          : "The receiving facility has been notified and will respond shortly."}
      </p>

      {/* Reference Card */}
      <div className="mt-base w-full rounded-xl bg-emerald-50/60 p-base text-left">
        <div className="flex items-center justify-between">
          <span className="font-body text-caption font-bold tracking-wider text-emerald-800 uppercase">
            REFERENCE NUMBER
          </span>
          <span className="rounded bg-emerald-100 px-xs py-[2px] font-body text-caption font-semibold text-emerald-700">
            Sent
          </span>
        </div>

        <p className="mt-xs font-body text-heading-xs font-bold text-emerald-900">
          {data.referenceNumber}
        </p>

        <div className="mt-sm grid grid-cols-[80px_1fr] gap-y-xs font-body text-body-xs">
          <span className="text-text-disabled">Patient:</span>
          <span className="font-medium text-text-primary">
            {isPaper ? "See uploaded form" : data.patientName}
          </span>

          <span className="text-text-disabled">Facility:</span>
          <span className="font-medium text-text-primary">
            {data.facilityName}
          </span>

          <span className="text-text-disabled">Submitted at:</span>
          <span className="font-medium text-text-primary">
            {data.submittedAt}
          </span>
        </div>

        {/* Uploaded File Link (For Paper Flow) */}
        {isPaper && data.fileName && (
          <div className="mt-sm flex items-center justify-between border-t border-emerald-100/60 pt-sm">
            <span className="font-body text-body-xs text-emerald-700 underline">
              {data.fileName}
            </span>
            <span className="font-body text-caption font-semibold text-emerald-600">
              Attached ✓
            </span>
          </div>
        )}
      </div>

      {/* Extra Notice Banner (For Paper Flow) */}
      {isPaper && (
        <div className="mt-base w-full rounded-lg border border-emerald-100 bg-emerald-50/30 p-sm text-left font-body text-caption text-text-secondary">
          <strong className="font-semibold text-text-primary">
            {data.facilityName}
          </strong>{" "}
          can now view your uploaded referral document before the patient
          arrives — no need to send a physical copy in advance.
        </div>
      )}

      {/* Dynamic Timeline */}
      <div className="mt-lg w-full space-y-md text-left">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isCompleted = step.status === "completed";
          const isPending = step.status === "pending";

          return (
            <div key={idx} className="flex gap-base">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-caption ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isPending
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <StepIcon size={14} />
                </div>
                {idx < steps.length - 1 && (
                  <div className="h-full w-[2px] bg-gray-100" />
                )}
              </div>

              <div className="pb-xs">
                <p className="font-body text-body-sm font-bold text-text-primary">
                  {step.title}
                </p>
                <p className="font-body text-caption text-text-disabled">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-lg flex w-full flex-col gap-sm">
        <Link
          href={`/dashboard/referrals/${data.referralId}`}
          className="w-full"
        >
          <Button
            variant="primary"
            className="w-full bg-emerald-700 hover:bg-emerald-800"
          >
            View Referral Details
          </Button>
        </Link>
        <Link href="/dashboard" className="w-full">
          <Button variant="outline" className="w-full">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
