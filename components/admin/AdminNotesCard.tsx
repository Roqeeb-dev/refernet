"use client";

import { useState } from "react";

export default function AdminNotesCard() {
  const [note, setNote] = useState("");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-2xs">
      <p className="font-body text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
        ADMIN NOTES
      </p>

      {/* Note Log */}
      <div className="mt-sm rounded-xl bg-gray-50/70 p-sm">
        <p className="font-body text-caption font-bold text-text-primary">
          Amaka Osei{" "}
          <span className="font-normal text-text-disabled">
            · Verification Officer
          </span>
        </p>
        <p className="mt-2xs font-body text-caption text-text-secondary">
          Called facility to confirm address. Spoke with the director —
          confirmed operating clinic.
        </p>
        <p className="mt-xs font-body text-[10px] text-text-disabled">
          Today, 8:35 AM
        </p>
      </div>

      {/* Note Input */}
      <div className="mt-sm flex gap-xs">
        <input
          type="text"
          placeholder="Add an internal note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 px-sm py-1.5 font-body text-caption outline-none focus:border-emerald-700"
        />
        <button
          type="button"
          className="rounded-xl border border-emerald-800 px-sm py-1.5 font-body text-caption font-bold text-emerald-800 hover:bg-emerald-50"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
