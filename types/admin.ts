export type AdminRole =
  | "super_admin"
  | "verification_officer"
  | "support_officer";
export type AdminStatus = "active" | "suspended" | "deactivated";

export interface AdminProfile {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  twoFactorEnabled: boolean;
  suspensionReason: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}
