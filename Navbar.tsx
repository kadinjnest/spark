"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b border-stone-100 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-serif text-stone-800">
          Memora
        </Link>
        <div className="flex items-center gap-6 font-sans text-sm text-stone-500">
          {user && (
            <Link href="/dashboard" className="hover:text-stone-800 transition-colors">
              Memories
            </Link>
          )}
          <button
            onClick={signOut}
            className="hover:text-stone-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}