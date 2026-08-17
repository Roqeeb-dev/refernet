"use client";

import { Check } from "lucide-react";

export default function AccountHolderCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
      <p className="font-body text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
        ACCOUNT HOLDER
      </p>
      <div className="mt-sm grid grid-cols-2 gap-md font-body text-caption">
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            NAME
          </p>
          <p className="font-bold text-text-primary">Dr. Emeka Okafor</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            ROLE AT FACILITY
          </p>
          <p className="font-bold text-text-primary">Medical Director</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            PHONE (LOGIN)
          </p>
          <p className="font-bold text-text-primary">08099001234</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase">
            REGISTRATION DATE
          </p>
          <p className="font-bold text-text-primary">14 Aug 2026, 11:32 AM</p>
        </div>
      </div>

      <div className="mt-sm border-t border-gray-100 pt-xs">
        <p className="text-[10px] font-bold text-text-disabled uppercase">
          PHONE VERIFIED
        </p>
        <span className="mt-2xs inline-flex items-center gap-2xs rounded-md bg-emerald-50 px-xs py-[2px] text-[11px] font-bold text-emerald-800">
          <Check className="h-3 w-3" /> OTP Verified
        </span>
      </div>
    </div>
  );
}
