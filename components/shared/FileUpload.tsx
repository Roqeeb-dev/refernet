"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileCheck2, X, Loader2 } from "lucide-react";
import {
  uploadFacilityDocument,
  deleteFacilityDocument,
} from "@/services/storage.service";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface FileUploadProps {
  label: string;
  required?: boolean;
  folder: string;
  value?: string;
  onUploadComplete: (path: string) => void;
}

export default function FileUpload({
  label,
  required = false,
  folder,
  value,
  onUploadComplete,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>(
    value ? "success" : "idle",
  );
  const [fileName, setFileName] = useState<string>(
    value ? value.split("-").slice(1).join("-") : "",
  );
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  async function handleFile(file: File) {
    setError(null);
    setStatus("uploading");
    setFileName(file.name);

    if (value) {
      await deleteFacilityDocument(value);
    }

    const { path, error: uploadError } = await uploadFacilityDocument(
      file,
      folder,
    );

    if (uploadError || !path) {
      setStatus("error");
      setError(uploadError ?? "Upload failed. Please try again.");
      return;
    }

    setStatus("success");
    onUploadComplete(path);
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    if (value) deleteFacilityDocument(value);
    setStatus("idle");
    setFileName("");
    setError(null);
    onUploadComplete("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-xs">
      <label className="font-body text-body-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-emergency"> *</span>}
      </label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => status !== "uploading" && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-xs rounded-md border border-dashed px-base py-lg text-center transition-colors ${
          status === "error"
            ? "border-emergency bg-emergency-light"
            : status === "success"
              ? "border-green-500 bg-green-50"
              : isDragging
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-green-100"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {status === "uploading" && (
          <>
            <Loader2 size={20} className="animate-spin text-green-700" />
            <p className="font-body text-body-sm text-text-secondary">
              Uploading {fileName}…
            </p>
          </>
        )}

        {status === "success" && (
          <div className="flex w-full items-center justify-between gap-sm">
            <div className="flex items-center gap-sm">
              <FileCheck2 size={18} className="shrink-0 text-green-700" />
              <span className="truncate font-body text-body-sm text-text-primary">
                {fileName}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove file"
              className="shrink-0 rounded-full p-xs text-text-secondary hover:bg-gray-100 hover:text-emergency"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {(status === "idle" || status === "error") && (
          <>
            <UploadCloud size={20} className="text-text-secondary" />
            <p className="font-body text-body-sm text-text-primary">
              Click to browse or drag &amp; drop
            </p>
            <p className="font-body text-caption text-text-secondary">
              PDF, JPG, PNG — max 10MB
            </p>
          </>
        )}
      </div>

      {error && (
        <span className="font-body text-body-sm text-emergency">{error}</span>
      )}
    </div>
  );
}
