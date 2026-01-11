"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-[80px] mb-4">
          <span role="img" aria-label="confused face">
            &#128533;
          </span>
        </div>
        <h1 className="text-27 font-bold text-brown mb-4">
          Something Went Wrong
        </h1>
        <p className="text-16 text-brown/70 mb-8 max-w-md mx-auto">
          We hit an unexpected snag. Our 3D printer might be acting up.
          Let's try that again!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-brown text-cream px-6 py-3 rounded font-semibold hover:bg-brown/90 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="border-2 border-brown text-brown px-6 py-3 rounded font-semibold hover:bg-brown hover:text-cream transition-colors"
          >
            Back to Home
          </a>
        </div>
        {error.digest && (
          <p className="text-12 text-brown/40 mt-8">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
