"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import FileUpload from "@/components/shared/FileUpload";
import {
  useDigitalReferralDraftStore,
  type UrgencyLevel,
} from "@/store/useDigitalReferralStore";

const URGENCY_OPTIONS: {
  label: UrgencyLevel;
  color: string;
  dotColor: string;
}[] = [
  {
    label: "Emergency",
    color: "border-red-200 bg-red-50/30 text-red-700",
    dotColor: "bg-red-600",
  },
  {
    label: "Critical",
    color: "border-orange-200 bg-orange-50/30 text-orange-700",
    dotColor: "bg-orange-600",
  },
  {
    label: "Urgent",
    color: "border-yellow-200 bg-yellow-50/30 text-yellow-700",
    dotColor: "bg-yellow-600",
  },
  {
    label: "Routine",
    color: "border-green-200 bg-green-50/30 text-green-700",
    dotColor: "bg-green-600",
  },
];

export default function ClinicalInfoPage() {
  const router = useRouter();

  const clinicalInfo = useDigitalReferralDraftStore((s) => s.clinicalInfo);
  const setClinicalInfoField = useDigitalReferralDraftStore(
    (s) => s.setClinicalInfoField,
  );
  const setVitals = useDigitalReferralDraftStore((s) => s.setVitals);
  const setManagement = useDigitalReferralDraftStore((s) => s.setManagement);
  const setReferralReason = useDigitalReferralDraftStore(
    (s) => s.setReferralReason,
  );
  const setSupportingDocumentPath = useDigitalReferralDraftStore(
    (s) => s.setSupportingDocumentPath,
  );

  useEffect(() => {
    useDigitalReferralDraftStore.persist.rehydrate();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/new-referral/digital-referral/select-facility");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-lg rounded-2xl border border-gray-100 bg-white p-lg shadow-xs"
    >
      {/* SECTION 1: CLINICAL ASSESSMENT */}
      <div className="flex flex-col gap-base">
        <span className="font-body text-caption font-bold tracking-wider text-green-600 uppercase">
          CLINICAL ASSESSMENT
        </span>

        {/* Urgency Level */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Urgency Level
          </label>
          <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
            {URGENCY_OPTIONS.map(({ label, dotColor }) => {
              const isSelected = clinicalInfo.urgencyLevel === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setClinicalInfoField({ urgencyLevel: label })}
                  className={`flex h-12 items-center justify-center gap-xs rounded-lg border font-body text-body-sm font-medium transition-all ${
                    isSelected
                      ? "border-green-600 bg-white shadow-xs ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-text-secondary hover:border-gray-300"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chief Complaint */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Chief Complaint
          </label>
          <Input
            type="text"
            placeholder="Primary reason for visit or referral"
            value={clinicalInfo.chiefComplaint}
            onChange={(e) =>
              setClinicalInfoField({ chiefComplaint: e.target.value })
            }
          />
        </div>

        {/* Provisional Diagnosis */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Provisional Diagnosis
          </label>
          <Input
            type="text"
            placeholder="e.g. Acute Myocardial Infarction..."
            value={clinicalInfo.provisionalDiagnosis}
            onChange={(e) =>
              setClinicalInfoField({ provisionalDiagnosis: e.target.value })
            }
          />
        </div>

        {/* Clinical History */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Clinical History
          </label>
          <textarea
            rows={3}
            placeholder="Relevant past medical history, onset, duration..."
            value={clinicalInfo.clinicalHistory}
            onChange={(e) =>
              setClinicalInfoField({ clinicalHistory: e.target.value })
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>
      </div>

      {/* SECTION 2: VITAL SIGNS */}
      <div className="flex flex-col gap-base">
        <span className="font-body text-caption font-bold tracking-wider text-green-600 uppercase">
          VITAL SIGNS
        </span>

        <div className="grid grid-cols-1 gap-base sm:grid-cols-2">
          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Blood Pressure
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="120/80"
                value={clinicalInfo.vitals.bloodPressure}
                onChange={(e) => setVitals({ bloodPressure: e.target.value })}
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                mmHg
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Heart Rate
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="72"
                value={clinicalInfo.vitals.heartRate}
                onChange={(e) => setVitals({ heartRate: e.target.value })}
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                bpm
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Temperature
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="37.0"
                value={clinicalInfo.vitals.temperature}
                onChange={(e) => setVitals({ temperature: e.target.value })}
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                °C
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Respiratory Rate
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="16"
                value={clinicalInfo.vitals.respiratoryRate}
                onChange={(e) => setVitals({ respiratoryRate: e.target.value })}
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                /min
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              SpO₂ <span className="font-normal text-text-disabled">(opt)</span>
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="98"
                value={clinicalInfo.vitals.spO2}
                onChange={(e) => setVitals({ spO2: e.target.value })}
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Blood Sugar{" "}
              <span className="font-normal text-text-disabled">(opt)</span>
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="5.5"
                value={clinicalInfo.vitals.bloodSugar}
                onChange={(e) => setVitals({ bloodSugar: e.target.value })}
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                mmol/L
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: MANAGEMENT */}
      <div className="flex flex-col gap-base">
        <span className="font-body text-caption font-bold tracking-wider text-green-600 uppercase">
          MANAGEMENT
        </span>

        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Current Medications
          </label>
          <textarea
            rows={2}
            placeholder="List medications, doses, and frequencies..."
            value={clinicalInfo.management.currentMedications}
            onChange={(e) =>
              setManagement({ currentMedications: e.target.value })
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Previously Administered Medications
          </label>
          <textarea
            rows={2}
            placeholder="Medications given prior to this referral..."
            value={clinicalInfo.management.previouslyAdministeredMedications}
            onChange={(e) =>
              setManagement({
                previouslyAdministeredMedications: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Previous Interventions
          </label>
          <textarea
            rows={2}
            placeholder="Procedures or treatments already performed..."
            value={clinicalInfo.management.previousInterventions}
            onChange={(e) =>
              setManagement({ previousInterventions: e.target.value })
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>
      </div>

      {/* SECTION 4: REFERRAL REASON */}
      <div className="flex flex-col gap-base">
        <span className="font-body text-caption font-bold tracking-wider text-green-600 uppercase">
          REFERRAL REASON
        </span>

        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Reason for Referral
          </label>
          <textarea
            rows={3}
            placeholder="Why is this patient being referred and what does the receiving facility need to provide?"
            value={clinicalInfo.referralReason.reasonForReferral}
            onChange={(e) =>
              setReferralReason({ reasonForReferral: e.target.value })
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Additional Notes{" "}
            <span className="font-normal text-text-disabled">(optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="Any other relevant clinical information..."
            value={clinicalInfo.referralReason.additionalNotes}
            onChange={(e) =>
              setReferralReason({ additionalNotes: e.target.value })
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>
      </div>

      {/* SECTION 5: SUPPORTING DOCUMENTS */}
      <div className="flex flex-col gap-xs">
        <span className="font-body text-caption font-bold tracking-wider text-green-600 uppercase">
          SUPPORTING DOCUMENTS
        </span>
        <p className="font-body text-caption font-bold text-text-secondary uppercase">
          INCLUDE LAB RESULTS, IMAGING REPORTS, ECGS, REFERRAL LETTER, OR
          CLINICAL PHOTOGRAPHS
        </p>

        <FileUpload
          label=""
          folder="clinical-documents"
          value={clinicalInfo.supportingDocumentPath}
          onUploadComplete={(path) => setSupportingDocumentPath(path)}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-base flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            router.push("/dashboard/new-referral/digital-referral/patient-info")
          }
        >
          Back
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="bg-green-700 hover:bg-green-800"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
}
