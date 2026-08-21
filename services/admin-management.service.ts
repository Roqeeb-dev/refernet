import { supabase } from "@/lib/supabaseClient";
import { AdminProfile, AdminRole, AdminStatus } from "@/types/admin";
import { logAdminAction } from "./admin-audit.service";

export async function fetchAllAdminProfiles(): Promise<{
  admins: AdminProfile[];
  error: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from("admin_profiles")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;

    const admins: AdminProfile[] = (data || []).map((row: any) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      role: row.role,
      status: row.status,
      twoFactorEnabled: row.two_factor_enabled,
      suspensionReason: row.suspension_reason,
      lastLoginAt: row.last_login_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return { admins, error: null };
  } catch (err: any) {
    return {
      admins: [],
      error: err.message || "Failed to load admin profiles.",
    };
  }
}

export async function updateAdminProfile({
  adminId,
  fullName,
  role,
  status,
}: {
  adminId: string;
  fullName: string;
  role: AdminRole;
  status: AdminStatus;
}): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from("admin_profiles")
      .update({
        full_name: fullName,
        role,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", adminId);

    if (error) throw error;

    await logAdminAction({
      action: "Account Updated",
      description: `Updated profile details for admin (${fullName}). Role: ${role}, Status: ${status}`,
    });

    return { success: true, error: null };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to update profile.",
    };
  }
}

export async function toggleAdminSuspension(
  admin: AdminProfile,
): Promise<{ success: boolean; error: string | null }> {
  const newStatus: AdminStatus =
    admin.status === "active" ? "suspended" : "active";
  const actionType =
    newStatus === "suspended" ? "Suspension" : "Account Updated";

  try {
    const { error } = await supabase
      .from("admin_profiles")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", admin.id);

    if (error) throw error;

    await logAdminAction({
      action: actionType,
      description: `${newStatus === "suspended" ? "Suspended" : "Reactivated"} admin account for ${admin.fullName}.`,
    });

    return { success: true, error: null };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to toggle suspension.",
    };
  }
}
