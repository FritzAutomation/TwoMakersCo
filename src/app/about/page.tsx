import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Two Makers Co - our story, our passion for 3D printing, and our commitment to quality handcrafted products.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 bg-brown/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-35 md:text-48 font-extrabold text-brown text-center px-6">
            Our Story
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        {/* Introduction */}
        <section className="mb-16">
          <p className="text-22 text-brown font-medium leading-relaxed mb-6">
            Two Makers Co was born from a shared passion for craftsmanship, creativity,
            and the magic of bringing ideas to life.
          </p>
          <p className="text-19 text-brown/80 leading-relaxed">
            We are two makers with a dream: to create beautiful, functional products
            that bring joy to everyday life. What started as a hobby in a small garage
            has grown into a labor of love that we&apos;re thrilled to share with you.
          </p>
        </section>

        {/* Our Philosophy */}
        <section className="mb-16">
          <h2 className="text-27 font-bold text-brown mb-6">Our Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 border border-brown/10">
              <div className="w-12 h-12 bg-brown/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brown">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <h3 className="text-19 font-semibold text-brown mb-2">Quality First</h3>
              <p className="text-16 text-brown/70 leading-relaxed">
                Every product we create is carefully designed, printed, and finished by hand.
                We never compromise on quality.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-brown/10">
              <div className="w-12 h-12 bg-brown/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brown">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3 className="text-19 font-semibold text-brown mb-2">Made with Love</h3>
              <p className="text-16 text-brown/70 leading-relaxed">
                Each piece carries a part of our passion. We put care and attention
                into every detail of the making process.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-brown/10">
              <div className="w-12 h-12 bg-brown/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brown">
                  <path d="M12 3v18"/>
                  <rect x="3" y="8" width="18" height="4" rx="1"/>
                </svg>
              </div>
              <h3 className="text-19 font-semibold text-brown mb-2">Sustainable Design</h3>
              <p className="text-16 text-brown/70 leading-relaxed">
                We use eco-friendly materials where possible and minimize waste
                in our production process.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-brown/10">
              <div className="w-12 h-12 bg-brown/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brown">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="text-19 font-semibold text-brown mb-2">Community Focused</h3>
              <p className="text-16 text-brown/70 leading-relaxed">
                We love connecting with our customers and fellow makers.
                Your feedback shapes what we create next.
              </p>
            </div>
          </div>
        </section>

        {/* What We Make */}
        <section className="mb-16">
          <h2 className="text-27 font-bold text-brown mb-6">What We Make</h2>
          <p className="text-19 text-brown/80 leading-relaxed mb-6">
            Using state-of-the-art 3D printing technology combined with traditional
            finishing techniques, we create unique products that you won&apos;t find anywhere else:
          </p>
          <ul className="space-y-3 text-19 text-brown/80">
            <li className="flex items-start gap-3">
              <span className="text-brown mt-1.5">•</span>
              <span>Geometric planters and vases for your home or office</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brown mt-1.5">•</span>
              <span>Desk organizers and home decor pieces</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brown mt-1.5">•</span>
              <span>Custom gifts for special occasions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brown mt-1.5">•</span>
              <span>Seasonal and holiday-themed items</span>
            </li>
          </ul>
        </section>

        {/* Our Process */}
        <section className="mb-16">
          <h2 className="text-27 font-bold text-brown mb-6">Our Process</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brown text-cream rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-19 font-semibold text-brown mb-1">Design</h3>
                <p className="text-16 text-brown/70">
                  Every product starts as a digital design, carefully crafted for both
                  aesthetics and functionality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brown text-cream rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-19 font-semibold text-brown mb-1">Print</h3>
                <p className="text-16 text-brown/70">
                  Using high-quality materials and precision printers, we bring our
                  designs to life layer by layer.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brown text-cream rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-19 font-semibold text-brown mb-1">Finish</h3>
                <p className="text-16 text-brown/70">
                  Each piece is hand-finished, cleaned, and inspected to ensure
                  it meets our quality standards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brown text-cream rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-19 font-semibold text-brown mb-1">Ship</h3>
                <p className="text-16 text-brown/70">
                  We carefully package your order and send it on its way to bring
                  joy to your home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-white rounded-lg p-8 border border-brown/10">
          <h2 className="text-22 font-semibold text-brown mb-4">
            Ready to explore our collection?
          </h2>
          <p className="text-16 text-brown/70 mb-6">
            Browse our shop to find the perfect piece for your space.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-brown text-cream px-8 py-3 rounded-lg font-semibold hover:bg-brown/90 transition-colors"
          >
            Shop Now
          </Link>
        </section>
      </div>
    </div>
  );
}
