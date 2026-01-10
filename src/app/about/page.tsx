export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-extrabold text-brown mb-8">About Us</h1>
        <div className="prose prose-brown max-w-3xl">
          <p className="text-brown/80 text-lg leading-relaxed">
            Two Makers Co was born from a shared passion for craftsmanship and
            creativity. We believe in quality over quantity, and every product
            we make is a labor of love.
          </p>
          <p className="text-brown/80 text-lg leading-relaxed mt-4">
            We make things. 3D prints and more. Each piece is carefully designed
            and crafted to bring joy to your everyday life.
          </p>
        </div>
      </div>
    </div>
  );
}
