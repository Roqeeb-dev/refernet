import { supabase } from "@/lib/supabaseClient";
import {
  AdminAuditLog,
  AuditLogFilters,
  LogActionParams,
} from "@/types/admin-audit";

async function fetchClientIp(): Promise<string | null> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || null;
  } catch {
    return null;
  }
}

export async function logAdminAction({
  action,
  description,
  facilityId,
  facilityName,
  metadata = {},
}: LogActionParams): Promise<{ success: boolean; error: string | null }> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "No authenticated admin session found." };
    }

    const ipAddress = await fetchClientIp();

    const { error } = await supabase.from("admin_audit_logs").insert({
      admin_id: user.id,
      action,
      description,
      facility_id: facilityId || null,
      facility_name: facilityName || null,
      ip_address: ipAddress,
      metadata,
    });

    if (error) throw error;
    return { success: true, error: null };
  } catch (err: any) {
    console.error("Failed to write audit log:", err);
    return { success: false, error: err.message || "Failed to record log" };
  }
}

export async function getAuditLogs(
  filters?: AuditLogFilters,
): Promise<{ logs: AdminAuditLog[]; error: string | null }> {
  try {
    let query = supabase
      .from("admin_audit_logs")
      .select(
        `
        *,
        admin_profiles (
          full_name,
          role
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (filters?.adminId && filters.adminId !== "all") {
      query = query.eq("admin_id", filters.adminId);
    }

    if (filters?.action && filters.action !== "all") {
      query = query.eq("action", filters.action);
    }

    if (filters?.facilityQuery) {
      query = query.ilike("facility_name", `%${filters.facilityQuery}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    const logs: AdminAuditLog[] = (data || []).map((row: any) => ({
      id: row.id,
      adminId: row.admin_id,
      action: row.action,
      facilityId: row.facility_id,
      facilityName: row.facility_name,
      description: row.description,
      ipAddress: row.ip_address,
      metadata: row.metadata || {},
      createdAt: row.created_at,
      adminProfile: row.admin_profiles
        ? {
            fullName: row.admin_profiles.full_name,
            role: row.admin_profiles.role,
          }
        : undefined,
    }));

    return { logs, error: null };
  } catch (err: any) {
    return { logs: [], error: err.message || "Failed to fetch audit logs" };
  }
}
