"use client";

import { Download, FileText } from "lucide-react";
import { DetailedReferral } from "@/lib/referral-types";

export default function ClinicalDetailsSection({
  referral,
}: {
  referral: DetailedReferral;
}) {
  const { clinical, urgency, attachments } = referral;

  return (
    <div className="flex flex-col gap-lg rounded-2xl border border-gray-100 bg-white p-lg shadow-xs">
      <div>
        <h3 className="font-body text-primary font-semibold tracking-wider text-text-disabled uppercase">
          CLINICAL INFORMATION
        </h3>

        {/* Urgency Badge */}
        <div className="mt-sm">
          <span className="inline-flex items-center gap-xs rounded-full bg-red-50 px-sm py-[2px] font-body text-caption font-semibold text-red-700 border border-red-200">
            ● {urgency}
          </span>
        </div>

        {/* Text Fields */}
        <div className="mt-base grid grid-cols-[140px_1fr] gap-y-md font-body text-body-sm">
          <span className="text-text-disabled">Chief Complaint</span>
          <span className="font-medium text-text-primary">
            {clinical.chiefComplaint}
          </span>

          <span className="text-text-disabled">Diagnosis</span>
          <span className="font-medium text-text-primary">
            {clinical.diagnosis}
          </span>

          <span className="text-text-disabled">Clinical History</span>
          <span className="font-medium text-text-primary">
            {clinical.clinicalHistory}
          </span>
        </div>
      </div>

      {/* VITAL SIGNS CARDS */}
      <div>
        <h4 className="font-body text-caption font-bold tracking-wider text-emerald-600 uppercase">
          VITAL SIGNS
        </h4>
        <div className="mt-sm grid grid-cols-2 gap-sm sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-base">
            <span className="font-body text-caption text-text-disabled">
              BP
            </span>
            <p className="font-body text-body-md font-bold text-text-primary">
              {clinical.vitals.bp}{" "}
              <span className="text-caption font-normal text-text-disabled">
                mmHg
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-base">
            <span className="font-body text-caption text-text-disabled">
              Heart Rate
            </span>
            <p className="font-body text-body-md font-bold text-text-primary">
              {clinical.vitals.hr}{" "}
              <span className="text-caption font-normal text-text-disabled">
                bpm
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-base">
            <span className="font-body text-caption text-text-disabled">
              Temperature
            </span>
            <p className="font-body text-body-md font-bold text-text-primary">
              {clinical.vitals.temp}{" "}
              <span className="text-caption font-normal text-text-disabled">
                °C
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-base">
            <span className="font-body text-caption text-text-disabled">
              Resp Rate
            </span>
            <p className="font-body text-body-md font-bold text-text-primary">
              {clinical.vitals.rr}{" "}
              <span className="text-caption font-normal text-text-disabled">
                /min
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-base">
            <span className="font-body text-caption text-text-disabled">
              SpO₂
            </span>
            <p className="font-body text-body-md font-bold text-text-primary">
              {clinical.vitals.spO2}{" "}
              <span className="text-caption font-normal text-text-disabled">
                %
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* MEDICATIONS & REASON */}
      <div className="grid grid-cols-[140px_1fr] gap-y-md font-body text-body-sm">
        <span className="text-text-disabled">Current Meds</span>
        <span className="font-medium text-text-primary">
          {clinical.currentMeds}
        </span>

        <span className="text-text-disabled">Previous Meds</span>
        <span className="font-medium text-text-primary">
          {clinical.previousMeds}
        </span>

        <span className="text-text-disabled">Interventions</span>
        <span className="font-medium text-text-primary">
          {clinical.interventions}
        </span>

        <span className="text-text-disabled">Reason for Referral</span>
        <span className="font-medium text-text-primary">
          {clinical.reasonForReferral}
        </span>

        <span className="text-text-disabled">Additional Notes</span>
        <span className="font-medium text-text-primary">
          {clinical.additionalNotes}
        </span>
      </div>

      {/* ATTACHMENTS */}
      {attachments.length > 0 && (
        <div className="border-t border-gray-100 pt-base">
          <h4 className="font-body text-caption font-bold tracking-wider text-text-disabled uppercase">
            ATTACHMENTS
          </h4>
          <div className="mt-sm flex flex-col gap-xs">
            {attachments.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/30 p-base"
              >
                <div className="flex items-center gap-xs font-body text-body-sm text-text-primary">
                  <FileText size={18} className="text-text-disabled" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <a
                  href={file.url}
                  download
                  className="flex items-center gap-xs font-body text-caption font-semibold text-emerald-700 hover:underline"
                >
                  <Download size={14} /> Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
