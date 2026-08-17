"use client";

import { Check } from "lucide-react";

export default function FacilityDetailsCard() {
  const services = [
    "General Outpatient",
    "Inpatient",
    "Emergency",
    "Laboratory",
    "Pharmacy",
    "Antenatal Care",
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
      <p className="font-body text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
        FACILITY DETAILS
      </p>

      {/* Grid Information */}
      <div className="mt-sm grid grid-cols-2 gap-y-sm gap-x-md font-body text-[12px]">
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            FACILITY NAME
          </p>
          <p className="font-bold text-text-primary">Grace Medical Clinic</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            TYPE
          </p>
          <p className="font-bold text-text-primary">Private Clinic</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            OWNERSHIP
          </p>
          <p className="font-bold text-text-primary">Private</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            STATE
          </p>
          <p className="font-bold text-text-primary">Akwa Ibom</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            LGA
          </p>
          <p className="font-bold text-text-primary">Eket</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            TOWN/AREA
          </p>
          <p className="font-bold text-text-primary">Eket Town</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            STREET ADDRESS
          </p>
          <p className="font-bold text-text-primary">12 Hospital Road, Eket</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            LANDMARK
          </p>
          <p className="font-bold text-text-primary">Grace Medical Clinic</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            PRIMARY PHONE
          </p>
          <p className="font-bold text-text-primary">08099001234</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            SECONDARY PHONE
          </p>
          <p className="font-bold text-text-secondary">Not provided</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            WHATSAPP
          </p>
          <p className="font-bold text-text-primary">08099001234</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            EMAIL
          </p>
          <p className="font-bold text-text-primary">
            info@gracemedicalclinic.ng
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            NHIA ACCREDITATION
          </p>
          <p className="font-bold text-text-primary">Yes — NHIA/AKI/20847</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            OPERATING HOURS
          </p>
          <p className="font-bold text-text-primary">
            8:00 AM – 8:00 PM, Mon–Sat
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            EMERGENCY OUTSIDE HOURS
          </p>
          <p className="font-bold text-text-primary">Yes</p>
        </div>
      </div>

      {/* Services Offered Badges */}
      <div className="mt-md border-t border-gray-100 pt-sm">
        <p className="font-body text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
          SERVICES OFFERED
        </p>
        <div className="mt-xs flex flex-wrap gap-xs">
          {services.map((service, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2xs rounded-full bg-emerald-50 px-xs py-1 font-body text-[11px] font-semibold text-emerald-800"
            >
              <Check className="h-3 w-3 text-emerald-700" /> {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
