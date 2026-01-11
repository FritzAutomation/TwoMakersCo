export default function ContactPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-35 font-extrabold text-brown mb-8">Contact Us</h1>
        <div className="max-w-xl">
          <p className="text-19 text-brown font-normal mb-6">
            Have a question or want to say hello? We&apos;d love to hear from
            you!
          </p>

          <div className="space-y-4">
            <div>
              <h2 className="text-22 font-semibold text-brown">Email</h2>
              <a
                href="mailto:twomakerscompany@gmail.com"
                className="text-19 text-brown font-normal hover:underline"
              >
                twomakerscompany@gmail.com
              </a>
            </div>

            <div>
              <h2 className="text-22 font-semibold text-brown">Instagram</h2>
              <a
                href="https://www.instagram.com/twomakersco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-19 text-brown font-normal hover:underline"
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
