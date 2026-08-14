"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import FileUpload from "@/components/shared/FileUpload";

export type UrgencyLevel = "Emergency" | "Critical" | "Urgent" | "Routine" | "";

export interface ClinicalInfoFormData {
  urgencyLevel: UrgencyLevel;
  chiefComplaint: string;
  provisionalDiagnosis: string;
  clinicalHistory: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    respiratoryRate: string;
    spO2: string;
    bloodSugar: string;
  };
  management: {
    currentMedications: string;
    previouslyAdministeredMedications: string;
    previousInterventions: string;
  };
  referralReason: {
    reasonForReferral: string;
    additionalNotes: string;
  };
  supportingDocumentPath: string;
}

const INITIAL_FORM_DATA: ClinicalInfoFormData = {
  urgencyLevel: "Emergency",
  chiefComplaint: "",
  provisionalDiagnosis: "",
  clinicalHistory: "",
  vitals: {
    bloodPressure: "120/80",
    heartRate: "72",
    temperature: "37.0",
    respiratoryRate: "16",
    spO2: "98",
    bloodSugar: "5.5",
  },
  management: {
    currentMedications: "",
    previouslyAdministeredMedications: "",
    previousInterventions: "",
  },
  referralReason: {
    reasonForReferral: "",
    additionalNotes: "",
  },
  supportingDocumentPath: "",
};

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
  const [formData, setFormData] =
    useState<ClinicalInfoFormData>(INITIAL_FORM_DATA);

  // Helper for updating nested object fields
  const handleNestedChange = (
    section: "vitals" | "management" | "referralReason",
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Clinical Info:", formData);
    router.push("/new-referral/digital/select-facility");
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
              const isSelected = formData.urgencyLevel === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, urgencyLevel: label }))
                  }
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
            value={formData.chiefComplaint}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                chiefComplaint: e.target.value,
              }))
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
            value={formData.provisionalDiagnosis}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                provisionalDiagnosis: e.target.value,
              }))
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
            value={formData.clinicalHistory}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                clinicalHistory: e.target.value,
              }))
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
          {/* Blood Pressure */}
          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Blood Pressure
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="120/80"
                value={formData.vitals.bloodPressure}
                onChange={(e) =>
                  handleNestedChange("vitals", "bloodPressure", e.target.value)
                }
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                mmHg
              </span>
            </div>
          </div>

          {/* Heart Rate */}
          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Heart Rate
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="72"
                value={formData.vitals.heartRate}
                onChange={(e) =>
                  handleNestedChange("vitals", "heartRate", e.target.value)
                }
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                bpm
              </span>
            </div>
          </div>

          {/* Temperature */}
          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Temperature
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="37.0"
                value={formData.vitals.temperature}
                onChange={(e) =>
                  handleNestedChange("vitals", "temperature", e.target.value)
                }
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                °C
              </span>
            </div>
          </div>

          {/* Respiratory Rate */}
          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Respiratory Rate
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="16"
                value={formData.vitals.respiratoryRate}
                onChange={(e) =>
                  handleNestedChange(
                    "vitals",
                    "respiratoryRate",
                    e.target.value,
                  )
                }
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                /min
              </span>
            </div>
          </div>

          {/* SpO2 (opt) */}
          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              SpO₂ <span className="font-normal text-text-disabled">(opt)</span>
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="98"
                value={formData.vitals.spO2}
                onChange={(e) =>
                  handleNestedChange("vitals", "spO2", e.target.value)
                }
              />
              <span className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 font-body text-caption text-text-disabled">
                %
              </span>
            </div>
          </div>

          {/* Blood Sugar (opt) */}
          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Blood Sugar{" "}
              <span className="font-normal text-text-disabled">(opt)</span>
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="5.5"
                value={formData.vitals.bloodSugar}
                onChange={(e) =>
                  handleNestedChange("vitals", "bloodSugar", e.target.value)
                }
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

        {/* Current Medications */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Current Medications
          </label>
          <textarea
            rows={2}
            placeholder="List medications, doses, and frequencies..."
            value={formData.management.currentMedications}
            onChange={(e) =>
              handleNestedChange(
                "management",
                "currentMedications",
                e.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>

        {/* Previously Administered Medications */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Previously Administered Medications
          </label>
          <textarea
            rows={2}
            placeholder="Medications given prior to this referral..."
            value={formData.management.previouslyAdministeredMedications}
            onChange={(e) =>
              handleNestedChange(
                "management",
                "previouslyAdministeredMedications",
                e.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>

        {/* Previous Interventions */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Previous Interventions
          </label>
          <textarea
            rows={2}
            placeholder="Procedures or treatments already performed..."
            value={formData.management.previousInterventions}
            onChange={(e) =>
              handleNestedChange(
                "management",
                "previousInterventions",
                e.target.value,
              )
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

        {/* Reason for Referral */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Reason for Referral
          </label>
          <textarea
            rows={3}
            placeholder="Why is this patient being referred and what does the receiving facility need to provide?"
            value={formData.referralReason.reasonForReferral}
            onChange={(e) =>
              handleNestedChange(
                "referralReason",
                "reasonForReferral",
                e.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-200 p-base font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-text-disabled"
          />
        </div>

        {/* Additional Notes (optional) */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Additional Notes{" "}
            <span className="font-normal text-text-disabled">(optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="Any other relevant clinical information..."
            value={formData.referralReason.additionalNotes}
            onChange={(e) =>
              handleNestedChange(
                "referralReason",
                "additionalNotes",
                e.target.value,
              )
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
          value={formData.supportingDocumentPath}
          onUploadComplete={(path) =>
            setFormData((prev) => ({ ...prev, supportingDocumentPath: path }))
          }
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-base flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/new-referral/digital/patient-info")}
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
