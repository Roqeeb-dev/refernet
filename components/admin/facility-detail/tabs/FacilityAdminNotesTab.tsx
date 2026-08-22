"use client";

import { useEffect, useState } from "react";
import { StickyNote } from "lucide-react";

interface FacilityAdminNotesTabProps {
  facilityId: string;
}

// TODO: needs an `admin_notes` table (facility_id, admin_id, note,
// created_at) — none exists in the current schema yet.
async function fetchAdminNotes(facilityId: string) {
  return {
    notes: [] as { id: string; author: string; note: string }[],
    error: null,
  };
}

export default function FacilityAdminNotesTab({
  facilityId,
}: FacilityAdminNotesTabProps) {
  const [notes, setNotes] = useState<
    { id: string; author: string; note: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchAdminNotes(facilityId).then(({ notes }) => {
      setNotes(notes);
      setIsLoading(false);
    });
  }, [facilityId]);

  function handleAddNote() {
    if (!draft.trim()) return;
    // TODO: persist via a real service call once admin_notes exists.
    alert("Admin notes aren't wired to the database yet.");
    setDraft("");
  }

  return (
    <div className="rounded-xl border border-gray-100 p-base">
      <div className="mb-sm flex gap-xs">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add an internal note about this facility..."
          className="h-9 flex-1 rounded-lg border border-gray-200 px-sm text-body-sm outline-none focus:border-emerald-600"
        />
        <button
          type="button"
          onClick={handleAddNote}
          className="h-9 rounded-lg bg-emerald-800 px-sm font-body text-body-sm font-semibold text-white hover:bg-emerald-900"
        >
          Add
        </button>
      </div>

      {isLoading ? (
        <p className="py-md text-center font-body text-body-sm text-text-secondary">
          Loading notes...
        </p>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-xl text-center">
          <StickyNote className="h-8 w-8 text-text-disabled" />
          <p className="mt-sm font-body text-body-sm font-semibold text-text-primary">
            No notes yet
          </p>
          <p className="mt-1 font-body text-caption text-text-disabled">
            Internal notes visible only to admins will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {notes.map((n) => (
            <li key={n.id} className="py-sm">
              <p className="font-body text-body-sm text-text-primary">
                {n.note}
              </p>
              <p className="mt-0.5 font-body text-caption text-text-disabled">
                — {n.author}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
