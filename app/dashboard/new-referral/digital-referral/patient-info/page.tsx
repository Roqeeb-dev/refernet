"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useDigitalReferralDraftStore } from "@/store/useDigitalReferralStore";
import { useFacility } from "@/hooks/useFacility";

export default function PatientInfoPage() {
  const router = useRouter();
  const { facility } = useFacility();

  const patientInfo = useDigitalReferralDraftStore((s) => s.patientInfo);
  const setPatientInfo = useDigitalReferralDraftStore((s) => s.setPatientInfo);
  const ensureDraftId = useDigitalReferralDraftStore((s) => s.ensureDraftId);

  useEffect(() => {
    useDigitalReferralDraftStore.persist.rehydrate();
    ensureDraftId();
  }, []);

  const handleChange = (field: keyof typeof patientInfo, value: string) => {
    setPatientInfo({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/new-referral/digital-referral/clinical-info");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-base rounded-2xl border border-gray-100 bg-white p-lg shadow-xs"
    >
      {/* Patient Name */}
      <div className="flex flex-col gap-xs">
        <label className="font-body text-body-sm font-bold text-text-primary">
          Patient Name
        </label>
        <Input
          type="text"
          placeholder="Full name as on ID"
          value={patientInfo.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
      </div>

      {/* Age & Sex Grid */}
      <div className="grid grid-cols-1 gap-base sm:grid-cols-2">
        {/* Age */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Age
          </label>
          <div className="relative">
            <select
              value={patientInfo.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-base py-sm font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option value="" disabled>
                0–150
              </option>
              {Array.from({ length: 120 }, (_, i) => i + 1).map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Sex Selection */}
        <div className="flex flex-col gap-xs">
          <label className="font-body text-body-sm font-bold text-text-primary">
            Sex
          </label>
          <div className="grid grid-cols-3 gap-xs">
            {(["Male", "Female", "Other"] as const).map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center justify-center gap-xs rounded-lg border p-sm font-body text-body-sm transition-colors ${
                  patientInfo.sex === option
                    ? "border-green-500 bg-green-50/50 font-semibold text-green-700"
                    : "border-gray-200 text-text-secondary hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="sex"
                  value={option}
                  checked={patientInfo.sex === option}
                  onChange={() => handleChange("sex", option)}
                  className="accent-green-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-xs">
        <label className="font-body text-body-sm font-bold text-text-primary">
          Phone Number
        </label>
        <Input
          type="tel"
          placeholder="08012345678"
          value={patientInfo.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <span className="font-body text-caption text-text-disabled">
          11-digit Nigerian number
        </span>
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-xs">
        <label className="font-body text-body-sm font-bold text-text-primary">
          Email Address{" "}
          <span className="font-normal text-text-disabled">(optional)</span>
        </label>
        <Input
          type="email"
          placeholder="patient@email.com"
          value={patientInfo.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      {/* Insurance Status */}
      <div className="flex flex-col gap-xs">
        <label className="font-body text-body-sm font-bold text-text-primary">
          Insurance status{" "}
          <span className="font-normal text-text-disabled">(optional)</span>
        </label>
        <div className="relative">
          <select
            value={patientInfo.insuranceStatus}
            onChange={(e) => handleChange("insuranceStatus", e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-base py-sm font-body text-body-sm text-text-primary outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          >
            <option value="">State health insurance</option>
            <option value="nhis">NHIS / NHIA</option>
            <option value="private">Private HMO</option>
            <option value="none">None / Self-pay</option>
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-base top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        <span className="font-body text-caption text-text-disabled">
          Enables faster pre-authorisation
        </span>
      </div>

      {/* Enrollee Number */}
      <div className="flex flex-col gap-xs">
        <label className="font-body text-body-sm font-bold text-text-primary">
          Enrollee number{" "}
          <span className="font-normal text-text-disabled">(optional)</span>
        </label>
        <Input
          type="text"
          placeholder="Enrolle/policy number"
          value={patientInfo.enrolleeNumber}
          onChange={(e) => handleChange("enrolleeNumber", e.target.value)}
        />
      </div>

      <hr className="my-xs border-gray-100" />

      {/* Referring Facility Section -- pulled live from the signed-in
          facility, not stored in the draft (not user-editable). */}
      <div className="flex flex-col gap-xs">
        <span className="font-body text-caption font-bold tracking-wider text-green-600 uppercase">
          REFERRING FACILITY (AUTO-POPULATED)
        </span>
        <div className="grid grid-cols-1 gap-base sm:grid-cols-2">
          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Referring Facility
            </label>
            <Input
              type="text"
              readOnly
              disabled
              value={facility?.facility_name ?? ""}
              className="bg-gray-50 text-text-secondary"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-body text-body-sm font-bold text-text-primary">
              Facility Contact
            </label>
            <Input
              type="text"
              readOnly
              disabled
              value={facility?.phone_number ?? ""}
              className="bg-gray-50 text-text-secondary"
            />
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="mt-base flex flex-wrap items-center justify-between gap-md">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/new-referral")}
        >
          Change Type
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
