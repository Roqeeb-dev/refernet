"use client";

import Link from "next/link";
import { Check, Paperclip, Bell, Hourglass, Eye } from "lucide-react";
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
      icon: Paperclip,
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
      icon: Hourglass,
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
      icon: Hourglass,
    },
  ];

  const steps = isPaper ? paperSteps : digitalSteps;

  return (
    <div className="mx-auto my-[40px] flex w-full max-w-[480px] flex-col items-center rounded-[16px] border border-[#E5E7EB] bg-white p-[32px] text-center shadow-sm">
      {/* Top Check Icon Badge */}
      <div className="mb-[20px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#E6F4EA]">
        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#34A853]">
          <Check className="h-[20px] w-[20px] text-white stroke-[3]" />
        </div>
      </div>

      {/* Dynamic Header */}
      <h1 className="text-[24px] font-bold text-[#111827]">
        {isPaper ? "Paper Referral Sent!" : "Referral Submitted!"}
      </h1>
      <p className="mt-[8px] text-[13px] leading-[18px] text-[#6B7280]">
        {isPaper
          ? "Your paper form has been digitised and attached. The receiving facility can view the document now."
          : "The receiving facility has been notified and will respond shortly."}
      </p>

      {/* Blue Reference Card */}
      <div className="mt-[24px] w-full rounded-[12px] border border-[#DBEAFE] bg-[#F0F7FF] p-[16px] text-left">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider text-[#2563EB] uppercase">
            REFERENCE NUMBER
          </span>
          <span className="rounded-[4px] bg-[#E0EDFF] px-[8px] py-[2px] text-[11px] font-semibold text-[#1D4ED8]">
            Sent
          </span>
        </div>

        <p className="mt-[6px] text-[18px] font-bold text-[#1E3A8A]">
          {data.referenceNumber}
        </p>

        {/* Details Grid */}
        <div className="mt-[12px] flex flex-col gap-[6px] text-[13px]">
          <div className="flex items-center">
            <span className="w-[90px] shrink-0 text-[#6B7280]">Patient:</span>
            <span className="font-semibold text-[#111827]">
              {isPaper ? "See uploaded form" : data.patientName}
            </span>
          </div>

          <div className="flex items-center">
            <span className="w-[90px] shrink-0 text-[#6B7280]">Facility:</span>
            <span className="font-semibold text-[#111827]">
              {data.facilityName}
            </span>
          </div>

          <div className="flex items-center">
            <span className="w-[90px] shrink-0 text-[#6B7280]">
              Submitted at:
            </span>
            <span className="font-semibold text-[#111827]">
              {data.submittedAt}
            </span>
          </div>
        </div>

        {/* Attached File Bar */}
        {isPaper && data.fileName && (
          <div className="mt-[14px] flex items-center justify-between rounded-[8px] border border-[#BFDBFE] bg-white px-[12px] py-[8px]">
            <div className="flex items-center gap-[6px] truncate pr-[8px]">
              <Paperclip className="h-[14px] w-[14px] shrink-0 text-[#2563EB]" />
              <span className="truncate text-[12px] font-medium text-[#2563EB]">
                {data.fileName}
              </span>
            </div>
            <span className="shrink-0 text-[11px] font-bold text-[#059669]">
              Attached ✓
            </span>
          </div>
        )}
      </div>

      {/* Green Eye Banner */}
      {isPaper && (
        <div className="mt-[16px] flex w-full items-start gap-[10px] rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] p-[12px] text-left text-[12px] leading-[18px] text-[#374151]">
          <Eye className="mt-[2px] h-[16px] w-[16px] shrink-0 text-[#059669]" />
          <div>
            <strong className="font-bold text-[#111827]">
              {data.facilityName}
            </strong>{" "}
            can now view your uploaded referral document before the patient
            arrives — no need to send a physical copy in advance.
          </div>
        </div>
      )}

      {/* Timeline Steps */}
      <div className="mt-[24px] w-full text-left">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isCompleted = step.status === "completed";

          return (
            <div
              key={idx}
              className="relative flex gap-[12px] pb-[20px] last:pb-0"
            >
              {/* Vertical Connector Line */}
              {idx < steps.length - 1 && (
                <span className="absolute left-[11px] top-[22px] h-[calc(100%-14px)] w-[2px] bg-[#E5E7EB]" />
              )}

              {/* Icon Container */}
              <div
                className={`relative z-10 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full text-[12px] ${
                  isCompleted
                    ? "bg-[#10B981] text-white"
                    : "bg-[#F3F4F6] text-[#9CA3AF]"
                }`}
              >
                <StepIcon className="h-[13px] w-[13px] stroke-[2.5]" />
              </div>

              {/* Text */}
              <div className="flex flex-col pt-[1px]">
                <p
                  className={`text-[13px] font-bold ${
                    isCompleted ? "text-[#111827]" : "text-[#9CA3AF]"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[12px] text-[#6B7280]">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-[28px] flex w-full flex-col gap-[10px]">
        <Link
          href={`/dashboard/referrals/${data.referralId}`}
          className="w-full"
        >
          <Button
            variant="primary"
            className="w-full rounded-[8px] bg-[#059669] py-[10px] text-[14px] font-semibold text-white hover:bg-[#047857]"
          >
            View Referral Details
          </Button>
        </Link>
        <Link href="/dashboard" className="w-full">
          <Button
            variant="outline"
            className="w-full rounded-[8px] border border-[#E5E7EB] bg-white py-[10px] text-[14px] font-semibold text-[#374151] hover:bg-[#F9FAFB]"
          >
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
