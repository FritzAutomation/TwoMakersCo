import Link from "next/link";
import { Metadata } from "next";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Two Makers Co products, shipping, returns, and more.",
};

const faqs = [
  {
    category: "Products",
    questions: [
      {
        question: "What materials do you use for your 3D printed products?",
        answer: "We primarily use PLA (Polylactic Acid), a biodegradable thermoplastic made from renewable resources like corn starch. Some specialty products may use PETG or other materials for specific properties. All materials are food-safe and eco-friendly where applicable."
      },
      {
        question: "Are your products waterproof?",
        answer: "Our planters and vases are water-resistant but not fully waterproof. We recommend using a liner or placing a small container inside for plants that need watering. For outdoor use, we suggest placing items under covered areas to extend their lifespan."
      },
      {
        question: "Can I request custom colors or sizes?",
        answer: "Yes! We offer custom orders for most of our products. Please contact us through our contact form with your specifications, and we'll let you know if we can accommodate your request along with pricing and timeline."
      },
      {
        question: "How durable are 3D printed products?",
        answer: "Our products are designed for everyday use and are quite durable. However, like any household item, they should be handled with care. Avoid dropping them on hard surfaces or exposing them to extreme temperatures (above 60°C/140°F)."
      },
    ]
  },
  {
    category: "Ordering & Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) through our secure payment processor. We also support Apple Pay and Google Pay for faster checkout."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or cancelled within 2 hours of placement. After that, production may have already begun. Please contact us immediately if you need to make changes."
      },
      {
        question: "Do you offer gift wrapping?",
        answer: "Yes! During checkout, you can add gift wrapping for a small additional fee. We'll include a handwritten note with your message and wrap the item in eco-friendly packaging."
      },
    ]
  },
  {
    category: "Shipping",
    questions: [
      {
        question: "Where do you ship to?",
        answer: "We currently ship within the United States. International shipping may be available for select countries - please contact us to inquire about shipping to your location."
      },
      {
        question: "How long does shipping take?",
        answer: "Production typically takes 3-5 business days. Once shipped, standard delivery takes 5-7 business days. Express shipping (2-3 business days) is available at checkout for an additional fee."
      },
      {
        question: "How much does shipping cost?",
        answer: "Shipping costs are calculated based on your location and order size. Free standard shipping is available on orders over $50. You can see the exact shipping cost at checkout before completing your purchase."
      },
      {
        question: "How will my order be packaged?",
        answer: "All orders are carefully packaged with recycled materials and cushioning to ensure safe delivery. Fragile items receive extra protection. We try to minimize packaging waste while keeping your items secure."
      },
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of delivery for items in original condition. Custom orders are non-refundable unless there's a defect. Please see our full Return Policy for more details."
      },
      {
        question: "What if my item arrives damaged?",
        answer: "If your item arrives damaged, please contact us within 48 hours with photos of the damage. We'll arrange for a replacement or full refund at no extra cost to you."
      },
      {
        question: "How do I start a return?",
        answer: "To initiate a return, please contact us through our contact form or email with your order number. We'll provide you with return instructions and a prepaid shipping label if applicable."
      },
    ]
  },
  {
    category: "Care & Maintenance",
    questions: [
      {
        question: "How do I clean my 3D printed items?",
        answer: "Clean with a soft, damp cloth and mild soap if needed. Avoid abrasive cleaners or scrubbing pads. Do not put in the dishwasher or use hot water, as this may warp the material."
      },
      {
        question: "Can I leave products outdoors?",
        answer: "Our products are designed for indoor use. While they can be placed in covered outdoor areas, prolonged sun exposure may cause fading, and extreme temperatures may affect the material. Bring items inside during harsh weather."
      },
    ]
  },
];

export default function FAQPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="text-35 font-extrabold text-brown mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-19 text-brown/70 mb-12">
          Find answers to common questions about our products and services.
        </p>

        <div className="space-y-12">
          {faqs.map((category) => (
            <section key={category.category}>
              <h2 className="text-22 font-bold text-brown mb-6 pb-2 border-b border-brown/10">
                {category.category}
              </h2>
              <FAQAccordion questions={category.questions} />
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 border border-brown/10">
          <h2 className="text-22 font-semibold text-brown mb-4">
            Still have questions?
          </h2>
          <p className="text-16 text-brown/70 mb-6">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brown text-cream px-8 py-3 rounded-lg font-semibold hover:bg-brown/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
