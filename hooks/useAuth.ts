"use client";

import { useState, useEffect, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { authService } from "@/services/auth.service";

interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authService.getSession().then((s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const subscription = authService.onAuthStateChange((s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setError(null);
    const { error: err } = await authService.signUp(email, password);
    if (err) {
      setError(err);
      return false;
    }
    return true;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const { error: err } = await authService.signIn(email, password);
    if (err) {
      setError(err);
      return false;
    }
    return true;
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    await authService.signOut();
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setError(null);
    const { error: err } = await authService.resetPassword(email);
    if (err) {
      setError(err);
      return false;
    }
    return true;
  }, []);

  return {
    user,
    session,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };
}
