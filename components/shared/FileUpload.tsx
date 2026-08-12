"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileCheck2, X, Loader2, AlertCircle } from "lucide-react";
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
          if (status !== "uploading") setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (status === "uploading") return;
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`group flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-sm rounded-lg border-2 border-dashed px-base py-2xl text-center transition-all duration-150 ${
          status === "error"
            ? "border-emergency bg-emergency-light hover:border-emergency"
            : status === "success"
              ? "border-green-500 bg-green-50 shadow-sm hover:border-green-600 hover:shadow"
              : isDragging
                ? "scale-[1.01] border-green-500 bg-green-50 shadow-md"
                : status === "uploading"
                  ? "cursor-wait border-green-300 bg-green-50/50"
                  : "border-gray-200 bg-white hover:border-green-400 hover:bg-green-50/40 hover:shadow-sm active:scale-[0.99]"
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
            <Loader2 size={28} className="animate-spin text-green-700" />
            <p className="font-body text-body-md text-text-secondary">
              Uploading {fileName}…
            </p>
          </>
        )}

        {status === "success" && (
          <div className="flex w-full items-center justify-between gap-sm px-sm">
            <div className="flex min-w-0 items-center gap-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                <FileCheck2 size={20} className="text-green-700" />
              </div>
              <div className="min-w-0 text-left">
                <p className="truncate font-body text-body-md font-semibold text-text-primary">
                  {fileName}
                </p>
                <p className="font-body text-caption text-green-700">
                  Uploaded successfully
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove file"
              className="shrink-0 rounded-full p-xs text-text-secondary transition-colors hover:bg-white hover:text-emergency"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {status === "error" && (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <AlertCircle size={22} className="text-emergency" />
            </div>
            <p className="font-body text-body-md font-medium text-text-primary">
              Click to try again or drag &amp; drop
            </p>
            <p className="font-body text-body-sm text-text-secondary">
              PDF, JPG, PNG — max 10MB
            </p>
          </>
        )}

        {status === "idle" && (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-green-100">
              <UploadCloud
                size={22}
                className="text-text-secondary transition-colors group-hover:text-green-700"
              />
            </div>
            <p className="font-body text-body-md text-text-primary">
              <span className="font-semibold text-green-700 group-hover:underline">
                Click to browse
              </span>{" "}
              or drag &amp; drop
            </p>
            <p className="font-body text-body-sm text-text-secondary">
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
