import { AdminRole } from "./admin";

export type AuditActionType =
  | "Approval"
  | "Suspension"
  | "Rejection"
  | "Document Request"
  | "Login Event"
  | "Account Created"
  | "Account Updated";

export interface AdminAuditLog {
  id: string;
  adminId: string;
  action: AuditActionType;
  facilityId: string | null;
  facilityName: string | null;
  description: string;
  ipAddress: string | null;
  metadata: Record<string, any>;
  createdAt: string;

  adminProfile?: {
    fullName: string;
    role: AdminRole;
  };
}

export interface LogActionParams {
  action: AuditActionType;
  description: string;
  facilityId?: string;
  facilityName?: string;
  metadata?: Record<string, any>;
}

export interface AuditLogFilters {
  adminId?: string;
  action?: string;
  facilityQuery?: string;
  startDate?: string;
  endDate?: string;
}
