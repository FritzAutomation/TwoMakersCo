"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/supabase/auth";

export default function UserMenu() {
  const { user, displayName, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    router.refresh();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-18 text-brown font-medium hover:opacity-80 transition-opacity"
        >
          <span>Hi, {name}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-brown/10 py-2 z-50">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-16 text-brown hover:bg-cream transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-16 text-brown hover:bg-cream transition-colors"
            >
              My Orders
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-16 text-brown hover:bg-cream transition-colors"
            >
              My Wishlist
            </Link>
            <hr className="my-2 border-brown/10" />
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-16 text-brown hover:bg-cream transition-colors"
            >
              Logout
            </button>
          </div>
        )}
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
