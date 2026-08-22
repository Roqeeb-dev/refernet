"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

interface FacilityDocumentsTabProps {
  facilityId: string;
}

// TODO: replace with a real fetch once the documents source is known
// (likely the cac_certificate_path / operation_license_path /
// practice_certificate_path columns already on facility_registrations,
// or a dedicated documents table if you're tracking more than three).
async function fetchDocuments(facilityId: string) {
  return { documents: [] as { name: string; url: string }[], error: null };
}

export default function FacilityDocumentsTab({
  facilityId,
}: FacilityDocumentsTabProps) {
  const [documents, setDocuments] = useState<{ name: string; url: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchDocuments(facilityId).then(({ documents }) => {
      setDocuments(documents);
      setIsLoading(false);
    });
  }, [facilityId]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 p-lg text-center font-body text-body-sm text-text-secondary">
        Loading documents...
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 p-xl text-center">
        <FileText className="h-8 w-8 text-text-disabled" />
        <p className="mt-sm font-body text-body-sm font-semibold text-text-primary">
          No documents on file
        </p>
        <p className="mt-1 font-body text-caption text-text-disabled">
          Uploaded registration documents will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 p-base">
      <ul className="divide-y divide-gray-100">
        {documents.map((doc) => (
          <li key={doc.url} className="flex items-center justify-between py-sm">
            <span className="font-body text-body-sm text-text-primary">
              {doc.name}
            </span>
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="font-body text-caption font-semibold text-green-700 hover:underline"
            >
              View →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
