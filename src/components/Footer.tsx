import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brown text-cream">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left section */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="font-extrabold text-lg">Two Makers Company</h3>
            <a
              href="mailto:twomakerscompany@gmail.com"
              className="hover:underline"
            >
              twomakerscompany@gmail.com
            </a>
            <a
              href="https://www.instagram.com/twomakersco"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity mt-2"
              aria-label="Instagram"
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
            </a>
          </div>

          {/* Right section - Logo placeholder (needs cream/white logo export) */}
          <div className="flex items-center">
            <Link href="/" className="text-cream hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full border-2 border-cream flex items-center justify-center">
                <span className="text-xs text-center font-semibold leading-tight">TWO<br/>MAKERS</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
