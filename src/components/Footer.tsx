import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brown text-cream">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="Two Makers Co"
                width={120}
                height={120}
              />
            </Link>
            <p className="text-16 text-cream/80 mt-4 leading-relaxed">
              Handcrafted 3D printed products made with love.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-18 font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=planters" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  Planters
                </Link>
              </li>
              <li>
                <Link href="/shop?category=home-decor" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gifts" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-18 font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-18 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-16 text-cream/80 hover:text-cream transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:twomakerscompany@gmail.com"
                  className="text-16 text-cream/80 hover:text-cream transition-colors"
                >
                  twomakerscompany@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/twomakersco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-16 text-cream/80 hover:text-cream transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                  @twomakersco
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-cream/20 text-center">
          <p className="text-14 text-cream/60">
            © {new Date().getFullYear()} Two Makers Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
