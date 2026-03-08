"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isConfigured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If Supabase isn't configured, allow access for demo purposes
    if (!loading && !user && isConfigured) {
      router.push("/login");
    }
  }, [user, loading, router, isConfigured]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-stone-500 font-sans">Loading...</div>
      </div>
    );
  }

  // Allow access if not configured (demo mode) or if user is logged in
  if (!isConfigured || user) {
    return <>{children}</>;
  }

  return null;
}