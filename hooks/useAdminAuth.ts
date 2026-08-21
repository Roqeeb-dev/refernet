"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/useAdminStore";
import {
  getCurrentAdminProfile,
  logoutAdmin,
} from "@/services/admin-auth.service";

export function useAdminAuth() {
  const router = useRouter();
  const { admin, isLoading, setAdmin, clearAdmin, setLoading } =
    useAdminAuthStore();

  useEffect(() => {
    let isMounted = true;

    async function loadAdmin() {
      if (!admin) {
        setLoading(true);
        const profile = await getCurrentAdminProfile();
        if (isMounted) {
          if (profile) {
            setAdmin(profile);
          } else {
            clearAdmin();
          }
        }
      }
    }

    loadAdmin();

    return () => {
      isMounted = false;
    };
  }, [admin, setAdmin, clearAdmin, setLoading]);

  async function handleLogout() {
    setLoading(true);
    await logoutAdmin();
    clearAdmin();
    router.replace("/admin/login");
  }

  return {
    admin,
    isLoading,
    isSuperAdmin: admin?.role === "super_admin",
    isVerificationOfficer: admin?.role === "verification_officer",
    isSupportOfficer: admin?.role === "support_officer",
    logout: handleLogout,
  };
}
