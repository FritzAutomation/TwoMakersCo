import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "Read our return and refund policy for Two Makers Co products. We want you to be completely satisfied with your purchase.",
};

export default function PoliciesPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="text-35 font-extrabold text-brown mb-4">
          Return & Refund Policy
        </h1>
        <p className="text-16 text-brown/60 mb-12">
          Last updated: January 2026
        </p>

        <div className="space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Overview</h2>
            <p className="text-16 text-brown/80 leading-relaxed">
              At Two Makers Co, we want you to be completely satisfied with your purchase.
              If you&apos;re not happy with your order for any reason, we offer a 30-day
              return policy for most items. Please read the following policy carefully
              to understand your options.
            </p>
          </section>

          {/* Return Eligibility */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Return Eligibility</h2>
            <div className="bg-white rounded-lg p-6 border border-brown/10 mb-4">
              <h3 className="text-18 font-semibold text-brown mb-3">Eligible for Return</h3>
              <ul className="space-y-2 text-16 text-brown/80">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-green-600">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Items in original, unused condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-green-600">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Items with original packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-green-600">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Returns initiated within 30 days of delivery</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-brown/10">
              <h3 className="text-18 font-semibold text-brown mb-3">Not Eligible for Return</h3>
              <ul className="space-y-2 text-16 text-brown/80">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-red-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>Custom or personalized orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-red-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>Items marked as final sale</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-red-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>Items damaged due to misuse</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-red-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>Items without original packaging</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How to Return */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">How to Initiate a Return</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brown text-cream rounded-full flex items-center justify-center text-14 font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-16 font-semibold text-brown mb-1">Contact Us</h3>
                  <p className="text-16 text-brown/70">
                    Email us or use our contact form with your order number and reason for return.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brown text-cream rounded-full flex items-center justify-center text-14 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-16 font-semibold text-brown mb-1">Receive Authorization</h3>
                  <p className="text-16 text-brown/70">
                    We&apos;ll review your request and provide return authorization and instructions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brown text-cream rounded-full flex items-center justify-center text-14 font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-16 font-semibold text-brown mb-1">Ship Your Return</h3>
                  <p className="text-16 text-brown/70">
                    Pack the item securely and ship it using the provided label (if applicable).
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brown text-cream rounded-full flex items-center justify-center text-14 font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-16 font-semibold text-brown mb-1">Receive Refund</h3>
                  <p className="text-16 text-brown/70">
                    Once we receive and inspect the item, we&apos;ll process your refund within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Information */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Refund Information</h2>
            <div className="bg-white rounded-lg p-6 border border-brown/10 space-y-4">
              <p className="text-16 text-brown/80 leading-relaxed">
                <strong>Refund Method:</strong> Refunds will be credited to your original
                payment method within 5-7 business days after we receive your return.
              </p>
              <p className="text-16 text-brown/80 leading-relaxed">
                <strong>Shipping Costs:</strong> Original shipping costs are non-refundable
                unless the return is due to our error or a defective product.
              </p>
              <p className="text-16 text-brown/80 leading-relaxed">
                <strong>Return Shipping:</strong> For standard returns, customers are
                responsible for return shipping costs. We provide prepaid labels for
                defective or incorrectly shipped items.
              </p>
            </div>
          </section>

          {/* Damaged Items */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Damaged or Defective Items</h2>
            <p className="text-16 text-brown/80 leading-relaxed mb-4">
              If you receive a damaged or defective item, please contact us within 48 hours
              of delivery. Include photos of the damage and your order number. We&apos;ll
              arrange for a replacement or full refund at no cost to you.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-16 text-yellow-800">
                <strong>Important:</strong> Please keep all packaging materials until your
                return is processed, as they may be needed for shipping claims.
              </p>
            </div>
          </section>

          {/* Exchanges */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Exchanges</h2>
            <p className="text-16 text-brown/80 leading-relaxed">
              We currently don&apos;t offer direct exchanges. If you&apos;d like a different
              item, please initiate a return for the original purchase and place a new
              order for the item you prefer.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-lg p-6 border border-brown/10 text-center">
            <h2 className="text-22 font-semibold text-brown mb-4">Questions?</h2>
            <p className="text-16 text-brown/70 mb-6">
              If you have any questions about our return policy, we&apos;re here to help.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-brown text-cream px-8 py-3 rounded-lg font-semibold hover:bg-brown/90 transition-colors"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
