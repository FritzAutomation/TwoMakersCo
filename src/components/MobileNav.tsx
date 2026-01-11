"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { signOut } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, displayName, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    router.refresh();
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-brown p-2 hover:opacity-80 transition-opacity"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-cream z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-brown p-2 hover:opacity-80"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Nav Links */}
          <nav className="mt-12 space-y-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-22 text-brown font-medium block hover:opacity-80"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={closeMenu}
              className="text-22 text-brown font-medium block hover:opacity-80"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="text-22 text-brown font-medium block hover:opacity-80"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="text-22 text-brown font-medium block hover:opacity-80"
            >
              Contact
            </Link>

            <div className="border-t border-brown/20 pt-6 space-y-4">
              {user && (
                <Link
                  href="/orders"
                  onClick={closeMenu}
                  className="text-22 text-brown font-medium flex items-center gap-2 hover:opacity-80"
                >
                  My Orders
                </Link>
              )}
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="text-22 text-brown font-medium flex items-center gap-2 hover:opacity-80"
              >
                Wishlist
              </Link>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="text-22 text-brown font-medium flex items-center gap-2 hover:opacity-80"
              >
                Cart
                {itemCount > 0 && (
                  <span className="bg-brown text-cream text-14 px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="border-t border-brown/20 pt-6">
              {user ? (
                <div className="space-y-4">
                  <p className="text-16 text-brown/70">
                    Hi, {displayName || user.email?.split("@")[0]}
                  </p>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={closeMenu}
                      className="text-22 text-brown font-medium block hover:opacity-80"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-22 text-brown font-medium hover:opacity-80"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="text-22 text-brown font-medium hover:opacity-80"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="pt-6">
              <a
                href="https://www.instagram.com/twomakersco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown hover:opacity-80 inline-flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="text-18 font-medium">@twomakersco</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
