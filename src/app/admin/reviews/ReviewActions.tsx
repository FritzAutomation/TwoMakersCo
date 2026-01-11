"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReviewActionsProps {
  reviewId: string;
  isApproved: boolean;
}

export default function ReviewActions({ reviewId, isApproved }: ReviewActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}/approve`, {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to approve review:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (loading) return;
    if (!confirm("Are you sure you want to delete this review?")) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!isApproved && (
        <button
          onClick={handleApprove}
          disabled={loading}
          className="text-14 text-green-600 hover:underline disabled:opacity-50"
        >
          Approve
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-14 text-red-600 hover:underline disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
