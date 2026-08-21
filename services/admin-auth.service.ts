import { supabase } from "@/lib/supabaseClient";
import { AdminProfile } from "@/types/admin";

export async function loginAdmin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ profile: AdminProfile | null; error: string | null }> {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError || !authData.user) {
    return {
      profile: null,
      error: authError?.message || "Invalid credentials.",
    };
  }

  const { data: profileData, error: profileError } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !profileData) {
    await supabase.auth.signOut();
    return {
      profile: null,
      error: "Access denied. User is not registered as an administrator.",
    };
  }

  if (profileData.status !== "active") {
    await supabase.auth.signOut();
    return {
      profile: null,
      error: `Account is ${profileData.status}. Contact system support.`,
    };
  }

  await supabase
    .from("admin_profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", profileData.id);

  const profile: AdminProfile = {
    id: profileData.id,
    fullName: profileData.full_name,
    email: profileData.email,
    role: profileData.role,
    status: profileData.status,
    twoFactorEnabled: profileData.two_factor_enabled,
    suspensionReason: profileData.suspension_reason,
    lastLoginAt: profileData.last_login_at,
    createdAt: profileData.created_at,
    updatedAt: profileData.updated_at,
  };

  return { profile, error: null };
}

export async function getCurrentAdminProfile(): Promise<AdminProfile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profileData, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profileData || profileData.status !== "active") {
    return null;
  }

  return {
    id: profileData.id,
    fullName: profileData.full_name,
    email: profileData.email,
    role: profileData.role,
    status: profileData.status,
    twoFactorEnabled: profileData.two_factor_enabled,
    suspensionReason: profileData.suspension_reason,
    lastLoginAt: profileData.last_login_at,
    createdAt: profileData.created_at,
    updatedAt: profileData.updated_at,
  };
}

export async function logoutAdmin(): Promise<{ error: string | null }> {
  const { error } = await supabase.auth.signOut();
  return { error: error ? error.message : null };
}
