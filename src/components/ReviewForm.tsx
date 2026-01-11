"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ReviewStars from "./ReviewStars";

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export default function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    rating: 0,
    title: "",
    content: "",
    authorName: user?.user_metadata?.name || "",
    authorEmail: user?.email || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.rating === 0) {
      setError("Please select a rating");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating: form.rating,
          title: form.title,
          content: form.content,
          authorName: form.authorName,
          authorEmail: form.authorEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccess(true);
      setForm({ ...form, rating: 0, title: "", content: "" });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mx-auto text-green-600 mb-3"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 className="text-18 font-semibold text-green-800 mb-2">
          Thank you for your review!
        </h3>
        <p className="text-16 text-green-700">
          Your review has been submitted and is pending approval.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-16 font-medium text-brown mb-2">
          Your Rating *
        </label>
        <ReviewStars
          rating={form.rating}
          size="lg"
          interactive
          onChange={(rating) => setForm({ ...form, rating })}
        />
      </div>

      {!user && (
        <>
          <div>
            <label htmlFor="authorName" className="block text-16 font-medium text-brown mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="authorName"
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:border-brown"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="authorEmail" className="block text-16 font-medium text-brown mb-2">
              Your Email *
            </label>
            <input
              type="email"
              id="authorEmail"
              value={form.authorEmail}
              onChange={(e) => setForm({ ...form, authorEmail: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:border-brown"
              placeholder="john@example.com"
            />
            <p className="text-14 text-brown/60 mt-1">
              Your email will not be published
            </p>
          </div>
        </>
      )}

      <div>
        <label htmlFor="title" className="block text-16 font-medium text-brown mb-2">
          Review Title
        </label>
        <input
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:border-brown"
          placeholder="Great product!"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-16 font-medium text-brown mb-2">
          Your Review
        </label>
        <textarea
          id="content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:border-brown resize-none"
          placeholder="Share your experience with this product..."
        />
      </div>

      {error && (
        <p className="text-14 text-red-600 font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || form.rating === 0}
        className="w-full bg-brown text-cream px-6 py-3 rounded-lg font-semibold hover:bg-brown/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
