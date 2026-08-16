"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface RequestDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilityName?: string;
}

export default function RequestDocumentsModal({
  isOpen,
  onClose,
  facilityName = "Grace Medical Clinic",
}: RequestDocumentsModalProps) {
  const [selectedRequests, setSelectedRequests] = useState<{
    [key: string]: boolean;
  }>({});
  const [deadline, setDeadline] = useState("3 days");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const requestOptions = [
    {
      id: "clearer_image",
      label: "A clearer or higher-quality image of their document.",
    },
    {
      id: "different_doc",
      label: "A different document type (specify below).",
    },
    { id: "nhia_confirm", label: "Confirmation of their NHIA number." },
    { id: "ownership_confirm", label: "Confirmation of facility ownership." },
    {
      id: "operational_evidence",
      label: "Evidence that the facility is currently operational.",
    },
    { id: "other", label: "Other" },
  ];

  const toggleOption = (id: string) => {
    setSelectedRequests((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-sm backdrop-blur-xs">
      <div className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-md shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-xs border-b border-gray-100">
          <h2 className="font-heading text-body-md font-bold text-text-primary">
            Request Additional Documents from {facilityName}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="mt-sm rounded-xl bg-blue-50/70 p-xs text-[11px] leading-snug text-blue-900 border border-blue-100">
          The facility will receive an SMS and in-app notification explaining
          what additional information is needed. Their application will remain
          pending and their Tier 1 access will continue while they respond.
        </div>

        <form onSubmit={handleSubmit} className="mt-sm flex flex-col gap-sm">
          {/* Checkboxes List */}
          <div>
            <label className="block font-body text-[11px] font-bold text-text-primary mb-2xs">
              What are you requesting?
            </label>
            <div className="flex flex-col gap-[6px]">
              {requestOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-xs rounded-xl border border-gray-200 px-sm py-1.5 font-body text-[11px] text-text-secondary hover:bg-gray-50/80 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={!!selectedRequests[option.id]}
                    onChange={() => toggleOption(option.id)}
                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-3.5 w-3.5"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Response Deadline */}
          <div>
            <label className="block font-body text-[11px] font-bold text-text-primary mb-2xs">
              Response deadline
            </label>
            <select
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-sm py-1.5 font-body text-[11px] text-text-primary outline-none focus:border-emerald-700 bg-white"
            >
              <option value="1 day">1 day</option>
              <option value="3 days">3 days</option>
              <option value="7 days">7 days</option>
              <option value="14 days">14 days</option>
            </select>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block font-body text-[11px] font-bold text-text-primary mb-2xs">
              Message to facility (editable, required)
            </label>
            <textarea
              rows={2.5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide specific details or instructions for the facility..."
              required
              className="w-full rounded-xl border border-gray-200 p-xs font-body text-[11px] text-text-primary outline-none focus:border-emerald-700 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-xs pt-2xs">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-md py-1.5 font-body text-[11px] font-bold text-text-secondary hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-md py-1.5 font-body text-[11px] font-bold text-white hover:bg-amber-600 transition-colors"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
