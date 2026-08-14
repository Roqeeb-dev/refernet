"use client";

import { DetailedReferral } from "@/lib/referral-types";

export default function PatientAndFacilityInfo({
  referral,
}: {
  referral: DetailedReferral;
}) {
  const { patient, referringFacility } = referral;

  return (
    <div className="flex flex-col gap-base rounded-2xl border border-gray-100 bg-white p-lg shadow-xs">
      {/* PATIENT INFORMATION */}
      <div>
        <h3 className="font-body text-caption font-bold tracking-wider text-text-disabled uppercase">
          PATIENT INFORMATION
        </h3>
        <div className="mt-base grid grid-cols-[140px_1fr] gap-y-xs font-body text-body-sm">
          <span className="text-text-disabled">Full Name</span>
          <span className="font-medium text-text-primary">
            {patient.fullName}
          </span>

          <span className="text-text-disabled">Age</span>
          <span className="font-medium text-text-primary">{patient.age}</span>

          <span className="text-text-disabled">Sex</span>
          <span className="font-medium text-text-primary">{patient.sex}</span>

          <span className="text-text-disabled">Phone</span>
          <span className="font-medium text-text-primary">{patient.phone}</span>

          <span className="text-text-disabled">NHIA Number</span>
          <span className="font-medium text-text-primary">
            {patient.nhiaNumber}
          </span>

          <span className="text-text-disabled">Referring Facility</span>
          <span className="font-medium text-text-primary">
            {referringFacility.name}
          </span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* REFERRING FACILITY INFORMATION */}
      <div>
        <h3 className="font-body text-caption font-bold tracking-wider text-text-disabled uppercase">
          REFERRING FACILITY INFORMATION
        </h3>
        <div className="mt-base grid grid-cols-[140px_1fr] gap-y-xs font-body text-body-sm">
          <span className="text-text-disabled">Full Name</span>
          <span className="font-medium text-text-primary">
            {referringFacility.name}
          </span>

          <span className="text-text-disabled">Phone</span>
          <span className="font-medium text-text-primary">
            {referringFacility.phone}
          </span>
        </div>
      </div>
    </div>
  );
}
