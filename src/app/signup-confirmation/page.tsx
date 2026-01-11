import Link from "next/link";

export default function SignupConfirmationPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        {/* Fun 3D printer icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-brown/10 rounded-full">
            <svg
              className="w-12 h-12 text-brown"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-35 font-extrabold text-brown mb-4">
          You're Almost In!
        </h1>

        <p className="text-19 text-brown/80 mb-6">
          We just sent a confirmation email your way.
        </p>

        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <p className="text-16 text-brown leading-relaxed">
            Click the link in your email to activate your account and join the Two Makers family.
            Then you'll be all set to explore our handcrafted 3D prints and more!
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-14 text-brown/60">
            Didn't get the email? Check your spam folder, or head back to try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-brown text-cream font-semibold rounded hover:bg-brown/90 transition-colors"
            >
              Back to Login
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-brown text-brown font-semibold rounded hover:bg-brown/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>

        {/* Fun decorative element */}
        <div className="mt-12 pt-8 border-t border-brown/10">
          <p className="text-14 text-brown/50 italic">
            We make things. And we're excited to make you part of it.
          </p>
        </div>
      </div>
    </div>
  );
}
