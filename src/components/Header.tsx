import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-cream">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left nav */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-brown font-medium hover:opacity-80 transition-opacity"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-brown font-medium hover:opacity-80 transition-opacity"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-brown font-medium hover:opacity-80 transition-opacity"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-brown font-medium hover:opacity-80 transition-opacity"
          >
            Contact
          </Link>
        </div>

        {/* Center logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/logo.svg"
            alt="Two Makers Co"
            width={120}
            height={60}
            priority
          />
        </Link>

        {/* Right nav */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-brown font-medium hover:opacity-80 transition-opacity"
          >
            Login
          </Link>
          <a
            href="https://www.instagram.com/twomakersco"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          </a>
          <Link
            href="/cart"
            className="text-brown hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="text-sm">0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
