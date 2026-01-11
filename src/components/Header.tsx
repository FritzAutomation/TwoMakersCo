import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="bg-cream pt-4 lg:pt-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6 h-24 lg:h-40 relative">
        {/* Left nav - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-22 text-brown font-medium hover:opacity-80 transition-opacity"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-22 text-brown font-medium hover:opacity-80 transition-opacity"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-22 text-brown font-medium hover:opacity-80 transition-opacity"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-22 text-brown font-medium hover:opacity-80 transition-opacity"
          >
            Contact
          </Link>
        </div>

        {/* Logo - left on mobile, center on desktop */}
        <Link
          href="/"
          className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2"
        >
          <Image
            src="/logo.png"
            alt="Two Makers Co"
            width={200}
            height={200}
            priority
            className="h-auto w-[120px] lg:w-[200px]"
          />
        </Link>

        {/* Right nav - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6">
          <UserMenu />
          <a
            href="https://www.instagram.com/twomakersco"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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
          <CartIcon />
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <CartIcon />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
