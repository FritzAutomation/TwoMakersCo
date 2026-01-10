export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Handcrafted with Love
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Discover unique, handmade goods crafted by passionate makers.
            Every piece tells a story.
          </p>
          <div className="mt-8">
            <a
              href="/products"
              className="inline-block rounded-md bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="aspect-square rounded-md bg-gray-100" />
                <h3 className="mt-4 text-sm font-medium text-gray-900">
                  Product Name
                </h3>
                <p className="mt-1 text-sm text-gray-500">$XX.XX</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Two Makers Co was born from a shared passion for craftsmanship
              and creativity. We believe in quality over quantity, and every
              product we make is a labor of love.
            </p>
            <a
              href="/about"
              className="mt-6 inline-block text-gray-900 underline hover:text-gray-600"
            >
              Learn more about us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
