import { supabase } from "@/lib/supabaseClient";

const BUCKET = "facility-documents";
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export interface UploadResult {
  path: string | null;
  error: string | null;
}

export function validateDocumentFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only PDF, JPG, or PNG files are accepted.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "File is too large — max 10MB.";
  }
  return null;
}

export async function uploadFacilityDocument(
  file: File,
  folder: string,
): Promise<UploadResult> {
  const validationError = validateDocumentFile(file);
  if (validationError) {
    return { path: null, error: validationError };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `${folder}/${crypto.randomUUID()}-${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { path: null, error: error.message };
  }

  return { path, error: null };
}

/** cleanup when a document is replaced or a step is abandoned. */
export async function deleteFacilityDocument(path: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([path]);
}

/** Short-lived signed URL for viewing a document */
export async function getSignedDocumentUrl(
  path: string,
  expiresInSeconds = 60 * 5,
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error || !data) return null;
  return data.signedUrl;
}
