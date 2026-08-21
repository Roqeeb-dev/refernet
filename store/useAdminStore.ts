import { create } from "zustand";
import { AdminProfile } from "@/types/admin";

interface AdminAuthState {
  admin: AdminProfile | null;
  isLoading: boolean;
  setAdmin: (admin: AdminProfile | null) => void;
  clearAdmin: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  admin: null,
  isLoading: true,
  setAdmin: (admin) => set({ admin, isLoading: false }),
  clearAdmin: () => set({ admin: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
