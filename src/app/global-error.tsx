"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{
        backgroundColor: "#fbf7f0",
        fontFamily: "system-ui, sans-serif",
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>
            &#128533;
          </div>
          <h1 style={{
            fontSize: "27px",
            fontWeight: "bold",
            color: "#4f3c32",
            marginBottom: "16px"
          }}>
            Something Went Wrong
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#4f3c32",
            opacity: 0.7,
            marginBottom: "32px",
            maxWidth: "400px"
          }}>
            We encountered a critical error. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              backgroundColor: "#4f3c32",
              color: "#fbf7f0",
              padding: "12px 24px",
              borderRadius: "6px",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Try Again
          </button>
          {error.digest && (
            <p style={{
              fontSize: "12px",
              color: "#4f3c32",
              opacity: 0.4,
              marginTop: "32px"
            }}>
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
