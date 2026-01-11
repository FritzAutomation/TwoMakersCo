import { Metadata } from "next";
import ShippingCalculator from "@/components/ShippingCalculator";

export const metadata: Metadata = {
  title: "Shipping Information",
  description: "Learn about Two Makers Co shipping options, costs, and delivery times.",
};

export default function ShippingPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="text-35 font-extrabold text-brown mb-4">
          Shipping Information
        </h1>
        <p className="text-19 text-brown/70 mb-12">
          Everything you need to know about shipping your order.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Shipping Calculator */}
          <div className="bg-white rounded-lg p-6 border border-brown/10">
            <h2 className="text-22 font-bold text-brown mb-6">
              Estimate Shipping Cost
            </h2>
            <ShippingCalculator />
          </div>

          {/* Shipping Times */}
          <div className="bg-white rounded-lg p-6 border border-brown/10">
            <h2 className="text-22 font-bold text-brown mb-6">
              Delivery Times
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brown/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brown">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-16 font-semibold text-brown">Production Time</h3>
                  <p className="text-14 text-brown/70">3-5 business days</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-16 font-semibold text-brown">Standard Shipping</h3>
                  <p className="text-14 text-brown/70">5-7 business days</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                    <polyline points="13 17 18 12 13 7"/>
                    <polyline points="6 17 11 12 6 7"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-16 font-semibold text-brown">Express Shipping</h3>
                  <p className="text-14 text-brown/70">2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="space-y-8">
          {/* Free Shipping */}
          <section className="bg-brown/5 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <h2 className="text-22 font-bold text-brown">Free Shipping</h2>
            </div>
            <p className="text-16 text-brown/80 leading-relaxed">
              Enjoy <strong>free standard shipping</strong> on all orders over $50!
              This offer applies to orders within the contiguous United States.
              No coupon code needed – the discount will be applied automatically at checkout.
            </p>
          </section>

          {/* Shipping Rates */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Shipping Rates</h2>
            <div className="bg-white rounded-lg border border-brown/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-cream">
                  <tr>
                    <th className="text-left px-6 py-3 text-14 font-semibold text-brown">Order Total</th>
                    <th className="text-left px-6 py-3 text-14 font-semibold text-brown">Standard</th>
                    <th className="text-left px-6 py-3 text-14 font-semibold text-brown">Express</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brown/10">
                  <tr>
                    <td className="px-6 py-4 text-16 text-brown">Under $25</td>
                    <td className="px-6 py-4 text-16 text-brown/70">$5.99</td>
                    <td className="px-6 py-4 text-16 text-brown/70">$12.99</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-16 text-brown">$25 - $49.99</td>
                    <td className="px-6 py-4 text-16 text-brown/70">$4.99</td>
                    <td className="px-6 py-4 text-16 text-brown/70">$10.99</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-16 text-brown">$50+</td>
                    <td className="px-6 py-4 text-16 text-green-600 font-semibold">FREE</td>
                    <td className="px-6 py-4 text-16 text-brown/70">$8.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Shipping Zones */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Where We Ship</h2>
            <div className="bg-white rounded-lg p-6 border border-brown/10">
              <p className="text-16 text-brown/80 leading-relaxed mb-4">
                We currently ship to all 50 U.S. states and territories. Shipping
                times and costs may vary for Alaska, Hawaii, and U.S. territories.
              </p>
              <p className="text-16 text-brown/80 leading-relaxed">
                <strong>International Shipping:</strong> We don&apos;t currently offer
                international shipping, but we&apos;re working on it! Sign up for our
                newsletter to be notified when we expand our shipping options.
              </p>
            </div>
          </section>

          {/* Order Tracking */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Order Tracking</h2>
            <div className="bg-white rounded-lg p-6 border border-brown/10">
              <p className="text-16 text-brown/80 leading-relaxed mb-4">
                Once your order ships, you&apos;ll receive an email with tracking
                information. You can also track your order status by logging into
                your account.
              </p>
              <p className="text-16 text-brown/70">
                Tracking updates may take up to 24 hours to appear after your
                package has been picked up by the carrier.
              </p>
            </div>
          </section>

          {/* Packaging */}
          <section>
            <h2 className="text-22 font-bold text-brown mb-4">Our Packaging</h2>
            <div className="bg-white rounded-lg p-6 border border-brown/10">
              <p className="text-16 text-brown/80 leading-relaxed">
                We take care in packaging every order to ensure your items arrive
                safely. All products are wrapped in protective materials and placed
                in sturdy shipping boxes. We use recycled and recyclable materials
                wherever possible to minimize our environmental impact.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
