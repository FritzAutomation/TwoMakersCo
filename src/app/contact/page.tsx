export default function ContactPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-extrabold text-brown mb-8">Contact Us</h1>
        <div className="max-w-xl">
          <p className="text-brown/80 text-lg mb-6">
            Have a question or want to say hello? We&apos;d love to hear from
            you!
          </p>

          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-brown">Email</h2>
              <a
                href="mailto:twomakerscompany@gmail.com"
                className="text-brown hover:underline"
              >
                twomakerscompany@gmail.com
              </a>
            </div>

            <div>
              <h2 className="font-semibold text-brown">Instagram</h2>
              <a
                href="https://www.instagram.com/twomakersco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown hover:underline"
              >
                @twomakersco
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
