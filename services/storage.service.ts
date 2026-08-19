import { supabase } from "@/lib/supabaseClient";

const DEFAULT_BUCKET = "facility-documents";
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
  bucket: string = DEFAULT_BUCKET,
) {
  return uploadToBucket(file, bucket, folder);
}

export async function deleteFacilityDocument(
  path: string,
  bucket: string = DEFAULT_BUCKET,
) {
  return deleteFromBucket(bucket, path);
}

/** Get a public URL for public buckets (e.g. paper-referrals) */
export function getPublicDocumentUrl(
  path: string,
  bucket: string = "paper-referrals",
): string | null {
  if (!path) return null;

  // Clean path to prevent double bucket prefixes or leading slashes
  const cleanPath = path
    .replace(new RegExp(`^${bucket}/`), "")
    .replace(/^\//, "");

  const { data } = supabase.storage.from(bucket).getPublicUrl(cleanPath);
  return data.publicUrl;
}

/** Short-lived signed URL for private buckets */
export async function getSignedDocumentUrl(
  path: string,
  bucket: string = DEFAULT_BUCKET,
  expiresInSeconds = 60 * 5,
): Promise<string | null> {
  if (!path) return null;

  const cleanPath = path
    .replace(new RegExp(`^${bucket}/`), "")
    .replace(/^\//, "");

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(cleanPath, expiresInSeconds);

  if (error || !data) return null;
  return data.signedUrl;
}
