import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-cream min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-[120px] font-extrabold text-brown/20 leading-none">
          404
        </h1>
        <h2 className="text-27 font-bold text-brown mb-4 -mt-4">
          Page Not Found
        </h2>
        <p className="text-16 text-brown/70 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off.
          Maybe it's out exploring new 3D printing ideas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-brown text-cream px-6 py-3 rounded font-semibold hover:bg-brown/90 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="border-2 border-brown text-brown px-6 py-3 rounded font-semibold hover:bg-brown hover:text-cream transition-colors"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
