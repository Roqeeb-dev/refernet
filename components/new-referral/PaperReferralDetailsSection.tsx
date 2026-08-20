"use client";

import { Download, FileText } from "lucide-react";
import { DetailedReferral } from "@/lib/referral-types";

export default function PaperReferralDetailsSection({
  referral,
}: {
  referral: DetailedReferral;
}) {
  const attachment = referral.attachments?.[0];
  const fileUrl = referral.attachments[0].url || attachment?.url;
  const fileName = attachment?.name || "Uploaded Paper Referral Document";

  return (
    <div className="flex flex-col gap-[24px] p-[24px]">
      <div className="flex items-center justify-between border-b border-gray-100 pb-[16px]">
        <div>
          <h3 className="font-heading text-[16px] font-bold text-slate-900">
            Paper Referral Attachment
          </h3>
          <p className="font-body text-[13px] text-slate-500">
            View or download the physical referral slip uploaded by the
            referring facility.
          </p>
        </div>

        {fileUrl && (
          <a
            href={fileUrl}
            download={fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px] rounded-[8px] border border-gray-200 bg-white px-[12px] py-[8px] font-body text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Download className="h-[14px] w-[14px]" />
            Download File
          </a>
        )}
      </div>

      {/* Facility Quick Info Cards */}
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
        <div className="rounded-[8px] border border-slate-100 bg-slate-50/50 p-[16px]">
          <span className="font-body text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Referring Facility
          </span>
          <p className="mt-[4px] font-body text-[14px] font-bold text-slate-800">
            {referral.referringFacility?.name}
          </p>
          <p className="font-body text-[13px] text-slate-500">
            {referral.referringFacility?.phone || "No phone provided"}
          </p>
        </div>

        <div className="rounded-[8px] border border-slate-100 bg-slate-50/50 p-[16px]">
          <span className="font-body text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Receiving Facility
          </span>
          <p className="mt-[4px] font-body text-[14px] font-bold text-slate-800">
            {referral.receivingFacility?.name}
          </p>
          <p className="font-body text-[13px] text-slate-500">
            {referral.receivingFacility?.phone || "No phone provided"}
          </p>
        </div>
      </div>

      {/* Embedded Document Viewer */}
      {fileUrl ? (
        <div className="overflow-hidden rounded-[8px] border border-gray-200 bg-slate-900">
          <iframe
            src={fileUrl}
            className="h-[680px] w-full bg-white"
            title={fileName}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[8px] border border-dashed border-gray-200 bg-slate-50/50 py-[48px] text-center">
          <FileText className="h-[32px] w-[32px] text-slate-400" />
          <p className="mt-[8px] font-body text-[14px] font-medium text-slate-600">
            No document file found
          </p>
          <p className="font-body text-[12px] text-slate-400">
            The paper referral record was created without an attached file.
          </p>
        </div>
      )}
    </div>
  );
}
