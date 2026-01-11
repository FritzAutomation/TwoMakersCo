"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/supabase/auth";

export default function UserMenu() {
  const { user, displayName, isAdmin, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  if (loading) {
    return (
      <span className="text-22 text-brown/50 font-medium">
        ...
      </span>
    );
  }

  if (user) {
    const name = displayName || user.email?.split("@")[0] || "User";
    return (
      <div className="flex items-center gap-4">
        <span className="text-18 text-brown font-medium">
          Hi, {name}
        </span>
        {isAdmin && (
          <Link
            href="/admin"
            className="text-18 text-brown font-medium hover:opacity-80 transition-opacity"
          >
            Admin
          </Link>
        )}
        <button
          onClick={handleSignOut}
          className="text-18 text-brown font-medium hover:opacity-80 transition-opacity"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-22 text-brown font-medium hover:opacity-80 transition-opacity"
    >
      Login
    </Link>
  );
}
