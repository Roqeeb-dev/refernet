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

export async function uploadToBucket(
  file: File,
  bucketName: string,
  folderPath: string,
) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const filePath = `${folderPath}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, { upsert: true });

  if (error) return { path: null, error: error.message };
  return { path: data.path, error: null };
}

export async function deleteFromBucket(bucketName: string, path: string) {
  const { error } = await supabase.storage.from(bucketName).remove([path]);
  if (error) console.error("Failed to delete file:", error.message);
}

export async function uploadFacilityDocument(
  file: File,
  folder: string,
  bucket: string = "facility-documents",
) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true });

  if (error) return { path: null, error: error.message };
  return { path: data.path, error: null };
}

export async function deleteFacilityDocument(
  path: string,
  bucket: string = "facility-documents",
) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) console.error("Failed to delete file:", error.message);
}

/** Short-lived signed URL for actually viewing a document */
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
